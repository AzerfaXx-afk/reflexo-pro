/**
 * MODULE SUPABASE POUR STÉPHANIE PRO
 * Gestion de la synchronisation cloud en temps réel pour clients, RDV, soins et indisponibilités.
 */

const SUPABASE_URL = 'https://lydfqknveaifbqqyqbts.supabase.co';
const SUPABASE_KEY = 'sb_publishable_u5x6RfeNOb37KkcNeVGXfA_t36pxZjC';

class SupabaseService {
    constructor() {
        this.client = null;
        this.isConnected = false;
        this.init();
    }

    init() {
        if (window.supabase && window.supabase.createClient) {
            try {
                this.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            } catch (err) {
                console.warn('Erreur initialisation Supabase Client:', err);
            }
        }
    }

    /* VÉRIFICATION DE DISPONIBILITÉ DES TABLES */
    async testConnection() {
        if (!this.client) this.init();
        if (!this.client) return false;

        try {
            const { data, error } = await this.client
                .from('clients')
                .select('id')
                .limit(1);

            if (error) {
                console.warn('Supabase: tables non prêtes ou erreur:', error.message);
                this.isConnected = false;
                return false;
            }
            this.isConnected = true;
            return true;
        } catch (err) {
            this.isConnected = false;
            return false;
        }
    }

    /* CHARGEMENT COMPLET DEPUIS LE CLOUD */
    async loadFullState() {
        if (!this.client) return null;

        try {
            const [clientsRes, servicesRes, apptsRes, blockedRes, settingsRes] = await Promise.all([
                this.client.from('clients').select('*').order('created_at', { ascending: true }),
                this.client.from('services').select('*').order('created_at', { ascending: true }),
                this.client.from('appointments').select('*').order('date', { ascending: true }),
                this.client.from('blocked_slots').select('*').order('date', { ascending: true }),
                this.client.from('cabinet_settings').select('*').maybeSingle()
            ]);

            // Formater les données pour l'état local
            const clients = (clientsRes.data || []).map(c => ({
                id: c.id,
                name: c.name,
                phone: c.phone || '',
                email: c.email || '',
                notes: c.notes || '',
                fidelity: c.fidelity || 1,
                createdAt: c.created_at
            }));

            const services = (servicesRes.data || []).map(s => ({
                id: s.id,
                name: s.name,
                category: s.category || 'Massages',
                duration: s.duration || 60,
                price: Number(s.price) || 80,
                description: s.description || '',
                image: s.image || '',
                colorBg: s.color_bg || '#E8EAF6',
                colorBorder: s.color_border || '#5F9EA0',
                colorText: s.color_text || '#1F383E'
            }));

            const appointments = (apptsRes.data || []).map(a => ({
                id: a.id,
                clientId: a.client_id,
                clientName: a.client_name,
                clientPhone: a.client_phone || '',
                clientEmail: a.client_email || '',
                serviceId: a.service_id,
                serviceName: a.service_name,
                duration: a.duration,
                price: Number(a.price),
                date: a.date,
                time: a.time,
                notes: a.notes || '',
                colorBg: a.color_bg,
                colorBorder: a.color_border,
                colorText: a.color_text,
                paymentMethod: a.payment_method || 'sur_place',
                paymentStatus: a.payment_status || 'A régler',
                source: a.source || 'manual',
                createdAt: a.created_at
            }));

            const blockedSlots = (blockedRes.data || []).map(b => ({
                id: b.id,
                date: b.date,
                time: b.time,
                duration: b.duration,
                reason: b.reason
            }));

            let schedule = null;
            let bufferTime = 15;
            let profilePhoto = '';
            let practitionerName = '';
            let cabinetInfo = null;
            let icalUrl = '';
            if (settingsRes.data) {
                if (settingsRes.data.schedule) schedule = settingsRes.data.schedule;
                if (settingsRes.data.buffer_time !== undefined) bufferTime = settingsRes.data.buffer_time;
                if (settingsRes.data.profile_photo) profilePhoto = settingsRes.data.profile_photo;
                if (settingsRes.data.practitioner_name) practitionerName = settingsRes.data.practitioner_name;
                if (settingsRes.data.ical_url) icalUrl = settingsRes.data.ical_url;
                cabinetInfo = {
                    address: settingsRes.data.address || '',
                    phone: settingsRes.data.phone || '',
                    email: settingsRes.data.email || ''
                };
            }

            return {
                clients,
                services,
                appointments,
                blockedSlots,
                schedule,
                bufferTime,
                profilePhoto,
                practitionerName,
                cabinetInfo,
                icalUrl
            };
        } catch (err) {
            console.error('Erreur lors du chargement Supabase:', err);
            return null;
        }
    }

    /* CLIENTS */
    async upsertClient(client) {
        if (!this.client) return;
        try {
            const user = (await this.client.auth.getUser())?.data?.user;
            if (!user) return;

            await this.client.from('clients').upsert({
                id: client.id,
                user_id: user.id,
                name: client.name,
                phone: client.phone || '',
                email: client.email || '',
                notes: client.notes || ''
            });
        } catch (e) {
            console.warn('Sync client failed:', e);
        }
    }

    /* SERVICES (SOINS) */
    async upsertService(service) {
        if (!this.client) return;
        try {
            const user = (await this.client.auth.getUser())?.data?.user;
            const targetUserId = user?.id || '5de24ee0-82f0-495a-b452-ad993e0476dd';

            await this.client.from('services').upsert({
                id: service.id,
                user_id: targetUserId,
                name: service.name,
                category: service.category || 'Massages',
                duration: service.duration,
                price: service.price,
                description: service.description || '',
                image: service.image || '',
                color_bg: service.colorBg || '#E8EAF6',
                color_border: service.colorBorder || '#5F9EA0',
                color_text: service.colorText || '#1F383E'
            });
            console.log('⚡ Prestation synchronisée sur Supabase :', service.name);
        } catch (e) {
            console.warn('Sync service failed:', e);
        }
    }

    async deleteService(serviceId) {
        if (!this.client) return;
        try {
            await this.client.from('services').delete().eq('id', serviceId);
        } catch (e) {
            console.warn('Delete service failed:', e);
        }
    }

    /* RENDEZ-VOUS */
    async upsertAppointment(appt) {
        if (!this.client) return;
        try {
            const user = (await this.client.auth.getUser())?.data?.user;
            if (!user) return;

            await this.client.from('appointments').upsert({
                id: appt.id,
                user_id: user.id,
                client_id: appt.clientId || null,
                client_name: appt.clientName,
                client_phone: appt.clientPhone || '',
                client_email: appt.clientEmail || '',
                service_id: appt.serviceId || null,
                service_name: appt.serviceName,
                duration: appt.duration,
                price: appt.price,
                date: appt.date,
                time: appt.time,
                notes: appt.notes || '',
                color_bg: appt.colorBg || '#E8EAF6',
                color_border: appt.colorBorder || '#5F9EA0',
                color_text: appt.colorText || '#1F383E'
            });
        } catch (e) {
            console.warn('Sync appointment failed:', e);
        }
    }

    async deleteAppointment(apptId) {
        if (!this.client) return;
        try {
            await this.client.from('appointments').delete().eq('id', apptId);
        } catch (e) {
            console.warn('Delete appointment failed:', e);
        }
    }

    /* PAUSES / CRÉNEAUX BLOQUÉS */
    async upsertBlockedSlot(slot) {
        if (!this.client) return;
        try {
            const user = (await this.client.auth.getUser())?.data?.user;
            if (!user) return;

            await this.client.from('blocked_slots').upsert({
                id: slot.id,
                user_id: user.id,
                date: slot.date,
                time: slot.time,
                duration: slot.duration,
                reason: slot.reason || 'Indisponible'
            });
        } catch (e) {
            console.warn('Sync blocked slot failed:', e);
        }
    }

    async deleteBlockedSlot(slotId) {
        if (!this.client) return;
        try {
            await this.client.from('blocked_slots').delete().eq('id', slotId);
        } catch (e) {
            console.warn('Delete blocked slot failed:', e);
        }
    }

    /* PARAMÈTRES ET PROFIL */
    async saveSettings({ address, phone, email, bufferTime, schedule, profilePhoto, practitionerName, icalUrl }) {
        if (!this.client) return;
        try {
            const user = (await this.client.auth.getUser())?.data?.user;
            if (!user) return;

            const updatePayload = {
                id: user.id,
                user_id: user.id,
                updated_at: new Date().toISOString()
            };
            if (address !== undefined) updatePayload.address = address;
            if (phone !== undefined) updatePayload.phone = phone;
            if (email !== undefined) updatePayload.email = email;
            if (bufferTime !== undefined) updatePayload.buffer_time = bufferTime;
            if (schedule !== undefined) updatePayload.schedule = schedule;
            if (profilePhoto !== undefined && profilePhoto !== null) updatePayload.profile_photo = profilePhoto;
            if (practitionerName !== undefined && practitionerName !== null) updatePayload.practitioner_name = practitionerName;
            if (icalUrl !== undefined && icalUrl !== null) updatePayload.ical_url = icalUrl;

            const { error } = await this.client.from('cabinet_settings').upsert(updatePayload, { onConflict: 'user_id' });
            if (error) {
                console.warn('Upsert cabinet_settings error:', error);
            }
        } catch (e) {
            console.warn('Sync settings failed:', e);
        }
    }

    /* AUTHENTIFICATION */
    async getCurrentUser() {
        if (!this.client) return null;
        try {
            const { data: { user }, error } = await this.client.auth.getUser();
            if (error) return null;
            return user;
        } catch (e) {
            return null;
        }
    }

    async getSession() {
        if (!this.client) return null;
        try {
            const { data: { session } } = await this.client.auth.getSession();
            return session;
        } catch (e) {
            return null;
        }
    }

    async signInWithPassword(email, password) {
        if (!this.client) throw new Error('Supabase non initialisé');
        const { data, error } = await this.client.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data;
    }

    async signUp(email, password) {
        if (!this.client) throw new Error('Supabase non initialisé');
        const redirectUrl = window.location.origin.includes('localhost')
            ? 'http://localhost:8086/'
            : 'https://reflexo-pro.vercel.app/';
        const { data, error } = await this.client.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: redirectUrl
            }
        });
        if (error) throw error;
        return data;
    }

    async signInWithOtp(email) {
        if (!this.client) throw new Error('Supabase non initialisé');
        const redirectUrl = window.location.origin.includes('localhost')
            ? 'http://localhost:8086/'
            : 'https://reflexo-pro.vercel.app/';
        const { data, error } = await this.client.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: redirectUrl
            }
        });
        if (error) throw error;
        return data;
    }

    async signOut() {
        if (!this.client) return;
        await this.client.auth.signOut();
    }

    onAuthStateChange(callback) {
        if (!this.client) return { data: { subscription: { unsubscribe: () => {} } } };
        return this.client.auth.onAuthStateChange(callback);
    }

    subscribeToChanges(userId, callback) {
        if (!this.client) return;
        const targetUserId = userId || '5de24ee0-82f0-495a-b452-ad993e0476dd';
        if (this.realtimeChannel) {
            try { this.client.removeChannel(this.realtimeChannel); } catch (e) {}
        }

        this.realtimeChannel = this.client
            .channel('cabinet-realtime-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, (payload) => {
                console.log('⚡ RDV changé en direct :', payload);
                callback('appointments', payload);
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, (payload) => callback('clients', payload))
            .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, (payload) => callback('services', payload))
            .on('postgres_changes', { event: '*', schema: 'public', table: 'cabinet_settings' }, (payload) => callback('cabinet_settings', payload))
            .on('postgres_changes', { event: '*', schema: 'public', table: 'blocked_slots' }, (payload) => callback('blocked_slots', payload))
            .subscribe();
    }
}

window.supabaseService = new SupabaseService();

