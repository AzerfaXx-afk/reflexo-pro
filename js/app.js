/**
 * STÉPHANIE PRO - LOGIQUE PRINCIPALE DE L'APPLICATION
 * Gestion de l'état, stockage local, modals, catalogue, agenda & clients
 */

// Données Cfixe de secours (disponibles au clic si besoin)
const CFIXE_PRESET_SERVICES = [
    {
        id: 'srv_1',
        name: 'Massage myofacial',
        category: 'Massages',
        duration: 45,
        price: 80,
        colorBg: '#E8EAF6',
        colorBorder: '#5C6BC0',
        colorText: '#1A237E',
        description: 'Travail profond sur les fascias pour libérer les tensions musculaires chroniques et restaurer la souplesse.',
        image: 'assets/img/mass1.webp'
    },
    {
        id: 'srv_2',
        name: 'Chi Nei Tsang',
        category: 'Massages',
        duration: 60,
        price: 65,
        colorBg: '#E0F2F1',
        colorBorder: '#26A69A',
        colorText: '#004D40',
        description: 'Massage énergétique du ventre, centre de nos émotions, favorisant la détoxification et l’harmonie digestive.',
        image: 'assets/img/mass3.webp'
    },
    {
        id: 'srv_3',
        name: 'Massage suédois 1h',
        category: 'Massages',
        duration: 60,
        price: 80,
        colorBg: '#E8EAF6',
        colorBorder: '#3949AB',
        colorText: '#1A237E',
        description: 'Massage tonifiant et relaxant à l’huile, détendant les muscles en profondeur et stimulant la circulation.',
        image: 'assets/img/mass2.webp'
    },
    {
        id: 'srv_4',
        name: 'Massage suédois 1h30',
        category: 'Massages',
        duration: 90,
        price: 100,
        colorBg: '#E8EAF6',
        colorBorder: '#283593',
        colorText: '#1A237E',
        description: 'Format étendu pour une détente musculaire globale et une sensation de relâchement absolu.',
        image: 'assets/img/mass4.webp'
    },
    {
        id: 'srv_5',
        name: 'Massage combiné : réflexologie et suédois 1h',
        category: 'Soins Combinés',
        duration: 60,
        price: 85,
        colorBg: '#F3E5F5',
        colorBorder: '#AB47BC',
        colorText: '#4A148C',
        description: 'L’alliance parfaite entre la réflexologie plantaire ciblée et la détente musculaire du dos et des jambes.',
        image: 'assets/img/ref4.webp'
    },
    {
        id: 'srv_6',
        name: 'Massage combiné : réflexologie et suédois 1h30',
        category: 'Soins Combinés',
        duration: 90,
        price: 100,
        colorBg: '#F3E5F5',
        colorBorder: '#8E24AA',
        colorText: '#4A148C',
        description: 'Soin complet sur-mesure réunissant réflexologie approfondie et massage suédois enveloppant.',
        image: 'assets/img/ref3.webp'
    },
    {
        id: 'srv_7',
        name: 'Massage Kobido',
        category: 'Soins Visage',
        duration: 60,
        price: 85,
        colorBg: '#FFF8E1',
        colorBorder: '#FFB300',
        colorText: '#E65100',
        description: 'Art ancestral japonais de lifting naturel du visage, stimulant l’éclat, le collagène et le tonus facial.',
        image: 'assets/img/ko1.webp'
    },
    {
        id: 'srv_8',
        name: 'Réflexologie plantaire',
        category: 'Réflexologie',
        duration: 60,
        price: 70,
        colorBg: '#FCE4EC',
        colorBorder: '#EC407A',
        colorText: '#880E4F',
        description: 'Stimulation précise des zones réflexes du pied pour réguler le système nerveux et relancer l’énergie vitale.',
        image: 'assets/img/ref1.webp'
    },
    {
        id: 'srv_9',
        name: 'Réflexologie palmaire-faciale',
        category: 'Réflexologie',
        duration: 60,
        price: 70,
        colorBg: '#FCE4EC',
        colorBorder: '#D81B60',
        colorText: '#880E4F',
        description: 'Soin apaisant des mains et du visage, idéal pour évacuer le stress mental et relâcher les tensions crâniennes.',
        image: 'assets/img/ref2.webp'
    },
    {
        id: 'srv_10',
        name: 'Évasion amoureuse',
        category: 'Massages',
        duration: 90,
        price: 120,
        colorBg: '#FBE9E7',
        colorBorder: '#FF7043',
        colorText: '#BF360C',
        description: 'Soin d’exception aux huiles chaudes précieuses pour une déconnexion sensorielle intense.',
        image: 'assets/img/mass1.webp'
    }
];

// Presets d'images disponibles du site
const PRESET_IMAGES = [
    'assets/img/mass1.webp',
    'assets/img/mass2.webp',
    'assets/img/mass3.webp',
    'assets/img/mass4.webp',
    'assets/img/ko1.webp',
    'assets/img/ko2.webp',
    'assets/img/ref1.webp',
    'assets/img/ref3.webp',
    'assets/img/ref4.webp',
    'assets/img/r3.webp',
    'assets/img/ta1.webp',
    'assets/img/tech2.webp'
];

// Palette de 12 couleurs de luxe pour les soins (harmonies bien-être & spa)
const PRESET_COLORS = [
    { bg: '#E0F2F1', border: '#26A69A', text: '#004D40', label: 'Turquoise Lagon' },
    { bg: '#E8F5E9', border: '#43A047', text: '#1B5E20', label: 'Sauge Nature' },
    { bg: '#FCE4EC', border: '#EC407A', text: '#880E4F', label: 'Rose Poudré' },
    { bg: '#FBE9E7', border: '#FF7043', text: '#BF360C', label: 'Terracotta' },
    { bg: '#EDE7F6', border: '#7E57C2', text: '#311B92', label: 'Lavande Douce' },
    { bg: '#E1F5FE', border: '#039BE5', text: '#01579B', label: 'Bleu Céleste' },
    { bg: '#FFF8E1', border: '#FFB300', text: '#B57900', label: 'Ambre Doré' },
    { bg: '#E8EAF6', border: '#3949AB', text: '#1A237E', label: 'Indigo Nuit' },
    { bg: '#F3E5F5', border: '#8E24AA', text: '#4A148C', label: 'Prune Royale' },
    { bg: '#E0F7FA', border: '#00ACC1', text: '#006064', label: 'Eucalyptus' },
    { bg: '#FFF3E0', border: '#FB8C00', text: '#E65100', label: 'Corail Pêche' },
    { bg: '#EFEBE9', border: '#8D6E63', text: '#3E2723', label: 'Sable Chaud' }
];

class StephanieProApp {
    constructor() {
        this.storageKey = 'stephanie_pro_data_v2';
        this.currentView = 'dashboard';
        this.data = this.loadData();
        this.selectedImage = PRESET_IMAGES[0];
        this.selectedColor = PRESET_COLORS[0];
        this.editingServiceId = null;
        this.editingBlockedSlotId = null;

        this.calendar = null;

        this.init();
    }

    loadData() {
        let data = {
            services: [],
            appointments: [],
            blockedSlots: [],
            clients: [],
            notifications: [],
            categories: ['Massages', 'Réflexologie', 'Kobido / Visage', 'Soins Combinés']
        };

        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                data = { ...data, ...parsed };
                if (!data.categories || data.categories.length === 0) {
                    data.categories = ['Massages', 'Réflexologie', 'Kobido / Visage', 'Soins Combinés'];
                }
            } catch (e) {
                console.error('Error loading data', e);
            }
        }
        
        return data;
    }

    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    init() {
        this.setupNavigation();
        this.setupCalendar();
        this.renderAll();
        this.setupModals();
        this.updateHeaderDate();
        this.updateCabinetLiveStatus();
        this.setupAuth();

        // Rafraîchir le statut en direct toutes les 30 secondes
        setInterval(() => this.updateCabinetLiveStatus(), 30000);

        // Synchronisation Cloud Supabase
        this.syncWithSupabase();

        // Enregistrer Service Worker pour PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW fail', err));
        }
    }

    openAuthModal(preferredMode = 'register') {
        const overlay = document.getElementById('authOverlay');
        if (!overlay) return;
        overlay.style.display = 'flex';
        setTimeout(() => overlay.classList.remove('hidden'), 10);

        if (preferredMode === 'register') {
            document.getElementById('tabRegisterBtn')?.click();
        } else {
            document.getElementById('tabLoginBtn')?.click();
        }
    }

    closeAuthModal() {
        const overlay = document.getElementById('authOverlay');
        if (!overlay) return;
        overlay.classList.add('hidden');
        setTimeout(() => overlay.style.display = 'none', 400);
    }

    async setupAuth() {
        const overlay = document.getElementById('authOverlay');
        const form = document.getElementById('authForm');
        const alertBox = document.getElementById('authAlert');
        const tabLogin = document.getElementById('tabLoginBtn');
        const tabRegister = document.getElementById('tabRegisterBtn');
        const submitText = document.getElementById('btnAuthText');
        const accountTrigger = document.getElementById('sidebarAccountTrigger');
        const userCard = document.getElementById('sidebarUserCard');
        const userEmailEl = document.getElementById('userAccountEmail');
        const userNameEl = document.getElementById('userAccountName');
        const userAvatarEl = document.getElementById('userAvatarInitials');
        const btnLogout = document.getElementById('btnLogout');
        const btnTogglePass = document.getElementById('btnTogglePassword');
        const passInput = document.getElementById('authPassword');
        const passGroup = document.getElementById('authPasswordGroup');
        const btnMagicOption = document.getElementById('btnMagicLinkOption');
        const btnMagicSubmit = document.getElementById('btnMagicSubmit');
        const mobileAccountText = document.getElementById('mobileAccountText');

        let authMode = 'register';
        let magicLinkMode = false;

        // Toggle Password visibility
        btnTogglePass?.addEventListener('click', () => {
            const isPassword = passInput.type === 'password';
            passInput.type = isPassword ? 'text' : 'password';
            const icon = document.getElementById('eyeIcon');
            if (icon) icon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
        });

        // Toggle Magic Link mode
        btnMagicOption?.addEventListener('click', () => {
            magicLinkMode = !magicLinkMode;
            if (magicLinkMode) {
                if (passGroup) passGroup.style.display = 'none';
                document.getElementById('btnAuthSubmit').style.display = 'none';
                if (btnMagicSubmit) btnMagicSubmit.style.display = 'flex';
                btnMagicOption.textContent = 'Utiliser un mot de passe';
            } else {
                if (passGroup) passGroup.style.display = 'block';
                document.getElementById('btnAuthSubmit').style.display = 'flex';
                if (btnMagicSubmit) btnMagicSubmit.style.display = 'none';
                btnMagicOption.textContent = 'Connexion sans mot de passe ?';
            }
        });

        // Tabs
        tabRegister?.addEventListener('click', () => {
            authMode = 'register';
            tabRegister.classList.add('active');
            tabLogin?.classList.remove('active');
            if (submitText) submitText.textContent = 'Créer mon compte cabinet';
            if (alertBox) alertBox.style.display = 'none';
        });

        tabLogin?.addEventListener('click', () => {
            authMode = 'login';
            tabLogin.classList.add('active');
            tabRegister?.classList.remove('active');
            if (submitText) submitText.textContent = 'Se connecter au cabinet';
            if (alertBox) alertBox.style.display = 'none';
        });

        // Check active session
        const checkSession = async () => {
            let user = null;
            if (window.supabaseService) {
                user = await window.supabaseService.getCurrentUser();
            }
            if (!user) {
                const local = localStorage.getItem('stephanie_auth_user');
                if (local) {
                    try { user = JSON.parse(local); } catch(e) {}
                }
            }

            const avatarIcon = document.getElementById('userAvatarIcon');
            const avatarInitials = document.getElementById('userAvatarInitials');
            const btnLogin = document.getElementById('btnFooterLogin');
            const btnLogout = document.getElementById('btnLogout');

            if (user) {
                this.currentUser = user;
                if (overlay) {
                    overlay.classList.add('hidden');
                    setTimeout(() => overlay.style.display = 'none', 400);
                }
                if (avatarIcon) avatarIcon.style.display = 'none';
                if (avatarInitials) {
                    avatarInitials.style.display = 'inline';
                    const email = user.email || 'S';
                    avatarInitials.textContent = (email[0] || 'S').toUpperCase();
                }
                if (btnLogin) btnLogin.style.display = 'none';
                if (btnLogout) btnLogout.style.display = 'flex';
                if (mobileAccountText) mobileAccountText.textContent = 'Cabinet';
            } else {
                this.currentUser = null;
                if (avatarIcon) avatarIcon.style.display = 'inline';
                if (avatarInitials) avatarInitials.style.display = 'none';
                if (btnLogin) btnLogin.style.display = 'flex';
                if (btnLogout) btnLogout.style.display = 'none';
                if (mobileAccountText) mobileAccountText.textContent = 'Connexion';
            }
            this.renderDashboard();
        };

        await checkSession();

        // Listen for auth state changes
        window.supabaseService?.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                this.currentUser = session.user;
                localStorage.setItem('stephanie_auth_user', JSON.stringify(session.user));
                checkSession();
                this.syncWithSupabase();
            } else if (event === 'SIGNED_OUT') {
                this.currentUser = null;
                localStorage.removeItem('stephanie_auth_user');
                checkSession();
            }
        });

        // Magic Link Submit
        btnMagicSubmit?.addEventListener('click', async () => {
            const email = document.getElementById('authEmail')?.value.trim();
            if (!email) {
                if (alertBox) {
                    alertBox.className = 'auth-alert error';
                    alertBox.textContent = 'Veuillez renseigner votre adresse e-mail.';
                    alertBox.style.display = 'flex';
                }
                return;
            }
            try {
                btnMagicSubmit.disabled = true;
                btnMagicSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';
                await window.supabaseService.signInWithOtp(email);
                if (alertBox) {
                    alertBox.className = 'auth-alert success';
                    alertBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Lien magique envoyé ! Vérifiez votre boîte mail pour vous connecter.';
                    alertBox.style.display = 'flex';
                }
            } catch (err) {
                if (alertBox) {
                    alertBox.className = 'auth-alert error';
                    alertBox.textContent = err.message || 'Erreur lors de l’envoi du lien.';
                    alertBox.style.display = 'flex';
                }
            } finally {
                btnMagicSubmit.disabled = false;
                btnMagicSubmit.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> <span>Envoyer un lien magique par mail</span>';
            }
        });

        // Form Submit
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('authEmail')?.value.trim();
            const password = document.getElementById('authPassword')?.value;
            const submitBtn = document.getElementById('btnAuthSubmit');

            if (!email || !password) return;

            try {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Traitement...';
                }
                if (alertBox) alertBox.style.display = 'none';

                if (authMode === 'register') {
                    const res = await window.supabaseService.signUp(email, password);
                    // Check if confirmation email was sent or session was created immediately
                    if (res?.user && !res?.session) {
                        alertBox.className = 'auth-alert success';
                        alertBox.innerHTML = `<i class="fa-solid fa-envelope-circle-check"></i> <div><strong>Compte créé !</strong><br>Un email de validation a été envoyé à <strong>${email}</strong>.<br>Cliquez sur le lien reçu dans votre boîte de réception pour valider votre compte, puis connectez-vous.</div>`;
                        alertBox.style.display = 'flex';
                        setTimeout(() => {
                            tabLogin?.click();
                        }, 2500);
                        return;
                    } else if (res?.user) {
                        this.currentUser = res.user;
                        localStorage.setItem('stephanie_auth_user', JSON.stringify(this.currentUser));
                        this.showToast('Compte créé et connecté !', 'success');
                        this.closeAuthModal();
                        await checkSession();
                        this.syncWithSupabase();
                    }
                } else {
                    const res = await window.supabaseService.signInWithPassword(email, password);
                    this.currentUser = res.user || { email };
                    localStorage.setItem('stephanie_auth_user', JSON.stringify(this.currentUser));
                    this.showToast(`Connecté avec succès (${email})`, 'success');
                    this.closeAuthModal();
                    await checkSession();
                    this.syncWithSupabase();
                }
            } catch (err) {
                console.error('Auth error:', err);
                if (alertBox) {
                    alertBox.className = 'auth-alert error';
                    const msg = err.message || '';
                    if (msg.toLowerCase().includes('email not confirmed')) {
                        alertBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <div><strong>Email non confirmé</strong><br>Veuillez cliquer sur le lien envoyé dans votre boîte de réception pour activer votre compte.</div>`;
                    } else if (msg.toLowerCase().includes('invalid login credentials')) {
                        alertBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <div>Identifiants incorrects ou compte inexistant.<br>Avez-vous d'abord cliqué sur <strong>Créer un compte</strong> ?</div>`;
                    } else {
                        alertBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <div>${msg || 'Identifiants incorrects.'}</div>`;
                    }
                    alertBox.style.display = 'flex';
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span id="btnAuthText">${authMode === 'register' ? 'Créer mon compte cabinet' : 'Se connecter au cabinet'}</span><i class="fa-solid fa-arrow-right"></i>`;
                }
            }
        });

        // Logout
        btnLogout?.addEventListener('click', async () => {
            this.logout();
        });
    }

    async logout() {
        if (confirm('Voulez-vous vous déconnecter de votre espace cabinet ?')) {
            await window.supabaseService?.signOut();
            this.currentUser = null;
            localStorage.removeItem('stephanie_auth_user');
            this.data = {
                services: [],
                appointments: [],
                blockedSlots: [],
                clients: [],
                notifications: [],
                categories: ['Massages', 'Réflexologie', 'Kobido / Visage', 'Soins Combinés']
            };
            this.saveData();
            this.renderAll();
            await this.setupAuth();
            this.showToast('Déconnexion effectuée', 'danger');
        }
    }

    async syncWithSupabase() {
        if (!window.supabaseService) return;
        // Mode Test : si non connectée, on n'altère pas la base cloud Supabase
        if (!this.currentUser) {
            console.log('🧪 Mode Test actif : données locales uniquement, aucune écriture Cloud');
            return;
        }
        try {
            const connected = await window.supabaseService.testConnection();
            if (connected) {
                console.log('⚡ Supabase Cloud connecté pour', this.currentUser.email);
                const cloudState = await window.supabaseService.loadFullState();
                if (cloudState) {
                    if (Array.isArray(cloudState.services)) this.data.services = cloudState.services;
                    if (Array.isArray(cloudState.appointments)) this.data.appointments = cloudState.appointments;
                    if (Array.isArray(cloudState.blockedSlots)) this.data.blockedSlots = cloudState.blockedSlots;
                    if (Array.isArray(cloudState.clients)) this.data.clients = cloudState.clients;
                    if (cloudState.settings) {
                        this.applyLoadedSettings(cloudState.settings);
                    }
                    this.saveData();
                    this.renderAll();
                    if (this.calendar) this.calendar.render(this.data.appointments, this.data.blockedSlots);
                }
            }
        } catch (e) {
            console.warn('Supabase sync check:', e);
        }
    }

    updateHeaderDate() {
        const now = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const dateStr = now.toLocaleDateString('fr-FR', options);
        const el = document.getElementById('headerDate');
        if (el) el.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    }

    /* STATUT DU CABINET EN DIRECT (HORAIRES RÉELS) */
    updateCabinetLiveStatus() {
        const badge = document.getElementById('liveStatusBadge');
        const label = document.getElementById('liveStatusLabel');
        const detail = document.getElementById('liveHoursText');
        if (!badge || !label || !detail) return;

        const now = new Date();
        const dayIndex = now.getDay(); // 0 = Dimanche, 1 = Lundi...
        const dayMap = [6, 0, 1, 2, 3, 4, 5]; // [Lun, Mar, Mer, Jeu, Ven, Sam, Dim]
        const schedIndex = dayMap[dayIndex];

        const schedule = this.data.schedule || [
            { day: 'Lundi', open: true, start: '08:30', end: '19:00' },
            { day: 'Mardi', open: true, start: '08:30', end: '19:00' },
            { day: 'Mercredi', open: true, start: '08:30', end: '19:00' },
            { day: 'Jeudi', open: true, start: '08:30', end: '19:00' },
            { day: 'Vendredi', open: true, start: '08:30', end: '19:00' },
            { day: 'Samedi', open: true, start: '09:00', end: '18:00' },
            { day: 'Dimanche', open: false, start: '09:00', end: '18:00' }
        ];

        const todaySched = schedule[schedIndex];
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const parseMinutes = (timeStr) => {
            const [h, m] = timeStr.split(':').map(Number);
            return h * 60 + m;
        };

        let isOpen = false;
        let statusText = 'Cabinet fermé';
        let detailText = '';

        if (todaySched && todaySched.open) {
            const startMin = parseMinutes(todaySched.start);
            const endMin = parseMinutes(todaySched.end);

            if (currentMinutes >= startMin && currentMinutes < endMin) {
                isOpen = true;
                statusText = 'Cabinet ouvert';
                detailText = `Ferme à ${todaySched.end.replace(':', 'h')}`;
            } else if (currentMinutes < startMin) {
                statusText = 'Cabinet fermé';
                detailText = `Ouvre à ${todaySched.start.replace(':', 'h')}`;
            } else {
                statusText = 'Cabinet fermé';
                detailText = 'Fermé pour la journée';
            }
        } else {
            statusText = 'Cabinet fermé';
            detailText = 'Fermé aujourd\'hui';
        }

        if (isOpen) {
            badge.className = 'live-status-pill open';
            label.textContent = statusText;
            detail.textContent = detailText;
        } else {
            badge.className = 'live-status-pill closed';
            label.textContent = statusText;
            detail.textContent = detailText;
        }
    }

    /* ========================================================================= 
       NAVIGATION
       ========================================================================= */
    setupNavigation() {
        // Logo de marque en haut à gauche -> Retour Dashboard
        const brandLink = document.getElementById('sidebarBrandLink');
        brandLink?.addEventListener('click', () => {
            this.switchView('dashboard');
        });
        brandLink?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.switchView('dashboard');
            }
        });

        const navLinks = document.querySelectorAll('[data-view]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetView = link.getAttribute('data-view');
                this.switchView(targetView);
            });
        });
    }

    switchView(viewName) {
        this.currentView = viewName;

        // Nav items active state
        document.querySelectorAll('[data-view]').forEach(link => {
            if (link.getAttribute('data-view') === viewName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // View panels
        document.querySelectorAll('.view-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        const activePanel = document.getElementById(`view-${viewName}`);
        if (activePanel) {
            activePanel.classList.add('active');
        }

        if (viewName === 'agenda' && this.calendar) {
            this.calendar.render(this.data.appointments, this.data.blockedSlots);
        } else if (viewName === 'dashboard') {
            this.renderDashboard();
        } else if (viewName === 'catalogue') {
            this.renderCatalogue();
        } else if (viewName === 'clients') {
            this.renderClients();
        }
    }

    /* ========================================================================= 
       CALENDRIER
       ========================================================================= */
    setupCalendar() {
        const container = document.getElementById('calendarContainer');
        if (!container) return;

        this.calendar = new ProCalendar('calendarContainer', {
            onEventClick: (id, isBlocked) => {
                if (isBlocked) {
                    this.openBlockedDetails(id);
                } else {
                    this.openAppointmentDetails(id);
                }
            },
            onEventDrop: (id, newDate, newTime) => {
                this.handleEventDrop(id, newDate, newTime);
            },
            onSlotClick: ({ date, time }) => {
                this.openNewAppointmentModal(date, time);
            }
        });

        // Calendar controls
        document.getElementById('calPrevBtn')?.addEventListener('click', () => {
            this.calendar.prevWeek();
            this.calendar.render(this.data.appointments, this.data.blockedSlots);
        });

        document.getElementById('calNextBtn')?.addEventListener('click', () => {
            this.calendar.nextWeek();
            this.calendar.render(this.data.appointments, this.data.blockedSlots);
        });

        document.getElementById('calTodayBtn')?.addEventListener('click', () => {
            this.calendar.today();
            this.calendar.render(this.data.appointments, this.data.blockedSlots);
        });

        // Zoom in & Zoom out controls
        document.getElementById('calZoomInBtn')?.addEventListener('click', () => {
            if (this.calendar) this.calendar.zoomIn();
        });

        document.getElementById('calZoomOutBtn')?.addEventListener('click', () => {
            if (this.calendar) this.calendar.zoomOut();
        });
    }

    handleEventDrop(id, newDate, newTime) {
        const appt = this.data.appointments.find(a => a.id === id);
        if (appt) {
            appt.date = newDate;
            appt.time = newTime;
            this.saveData();
            this.calendar.render(this.data.appointments, this.data.blockedSlots);
            this.showToast(`RDV de ${appt.clientName} déplacé au ${newDate} à ${newTime}`, 'success');
            this.addNotification(`RDV déplacé : ${appt.clientName} le ${newDate} à ${newTime}`);
        }
    }

    /* ========================================================================= 
       RENDU DU TABLEAU DE BORD (DASHBOARD)
       ========================================================================= */
    renderDashboard() {
        const todayIso = new Date().toISOString().split('T')[0];
        const todayAppointments = this.data.appointments
            .filter(a => a.date === todayIso)
            .sort((a, b) => a.time.localeCompare(b.time));

        // Greeting dynamique selon l'utilisateur
        const greetingEl = document.getElementById('dashboardGreeting');
        const greetingSubEl = document.getElementById('dashboardGreetingSub');
        if (this.currentUser) {
            const email = this.currentUser.email || '';
            const name = this.currentUser.user_metadata?.full_name || email.split('@')[0];
            const cleanName = name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Stéphanie';
            if (greetingEl) greetingEl.textContent = `Bonjour ${cleanName}`;
            if (greetingSubEl) greetingSubEl.textContent = 'Voici votre récapitulatif.';
        } else {
            if (greetingEl) greetingEl.textContent = 'Bienvenue';
            if (greetingSubEl) greetingSubEl.textContent = 'Connectez-vous pour synchroniser votre planning.';
        }

        // Stats
        const countEl = document.getElementById('statTodayCount');
        if (countEl) countEl.textContent = todayAppointments.length;

        // Total CA semaine
        const weekMonday = this.calendar ? this.calendar.currentWeekStart : new Date();
        const weekDaysIso = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(weekMonday);
            d.setDate(d.getDate() + i);
            weekDaysIso.push(d.toISOString().split('T')[0]);
        }
        const weekAppointments = this.data.appointments.filter(a => weekDaysIso.includes(a.date));
        const weekRevenue = weekAppointments.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
        
        const revEl = document.getElementById('statWeekRevenue');
        if (revEl) revEl.textContent = `${weekRevenue} €`;

        const totalClientsEl = document.getElementById('statTotalClients');
        if (totalClientsEl) totalClientsEl.textContent = this.data.clients.length;

        // Liste du jour
        const listEl = document.getElementById('todayAppointmentsList');
        if (listEl) {
            if (todayAppointments.length === 0) {
                listEl.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon"><i class="fa-regular fa-calendar-check"></i></div>
                        <h4>Aucun rendez-vous aujourd'hui</h4>
                        <p>Profitez de votre journée ou notez un rendez-vous si une cliente vous contacte.</p>
                        <button class="btn btn-outline btn-sm" onclick="app.openNewAppointmentModal('${todayIso}', '10:00')">
                            <i class="fa-solid fa-plus"></i> Ajouter un RDV
                        </button>
                    </div>
                `;
            } else {
                listEl.innerHTML = todayAppointments.map(a => `
                    <div class="today-item" onclick="app.openAppointmentDetails('${a.id}')">
                        <div class="today-time-col">
                            <span class="today-time">${a.time}</span>
                            <span class="today-duration">${a.duration} min</span>
                        </div>
                        <div class="today-info-col">
                            <div class="today-client-name">${a.clientName}</div>
                            <div class="today-service-name">
                                <i class="fa-solid fa-spa" style="font-size: 0.75rem;"></i>
                                ${a.serviceName} (${a.price} €)
                            </div>
                        </div>
                        <div class="today-actions-col" onclick="event.stopPropagation()">
                            ${a.clientPhone ? `
                                <a href="tel:${a.clientPhone}" class="btn-icon-circle" title="Appeler">
                                    <i class="fa-solid fa-phone"></i>
                                </a>
                                <a href="sms:${a.clientPhone}" class="btn-icon-circle" title="Envoyer SMS">
                                    <i class="fa-solid fa-comment-sms"></i>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                `).join('');
            }
        }

        // Fil des notifications (Cfixe style)
        const notifFeedEl = document.getElementById('notificationsFeed');
        if (notifFeedEl) {
            if (this.data.notifications.length === 0) {
                notifFeedEl.innerHTML = `
                    <p style="color: var(--text-muted); font-size: 0.88rem; text-align: center; padding: 20px 0;">
                        Toutes les nouvelles réservations apparaîtront ici.
                    </p>
                `;
            } else {
                notifFeedEl.innerHTML = this.data.notifications.slice(0, 8).map(n => `
                    <div class="notif-item">
                        <div class="notif-icon-bubble"><i class="fa-solid fa-bell"></i></div>
                        <div class="notif-body">
                            <div class="notif-text">${n.text}</div>
                            <div class="notif-time">${n.time}</div>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    addNotification(text) {
        const now = new Date();
        const timeFormatted = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + ' - ' + now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
        this.data.notifications.unshift({
            id: 'notif_' + Date.now(),
            text: text,
            time: timeFormatted
        });
        if (this.data.notifications.length > 30) {
            this.data.notifications.pop();
        }
        this.saveData();
    }

    /* ========================================================================= 
       RENDU DU CATALOGUE (PRESTATIONS)
       ========================================================================= */
    renderCatalogue() {
        const container = document.getElementById('servicesCardsGrid');
        if (!container) return;

        if (this.data.services.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; padding: 60px 20px;">
                    <div class="empty-state-icon" style="font-size: 3.5rem;"><i class="fa-solid fa-spa"></i></div>
                    <h3 style="font-size: 1.4rem; margin-bottom: 8px;">Votre catalogue de soins est vide</h3>
                    <p style="margin-bottom: 24px; max-width: 440px;">
                        Ajoutez vous-même vos massages, réflexologies et soins avec vos tarifs, photos et descriptions sur-mesure.
                    </p>
                    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                        <button class="btn btn-primary" onclick="app.openNewServiceModal()">
                            <i class="fa-solid fa-plus"></i> Ajouter une prestation
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.services.map(s => `
            <div class="service-card">
                <div class="service-img-wrapper">
                    <img src="${s.image || '../assets/img/mass1.webp'}" alt="${s.name}" class="service-img" onerror="this.src='../assets/img/mass1.webp'">
                    <span class="service-cat-badge">${s.category || 'Soin'}</span>
                    <span class="service-price-pill">${s.price} €</span>
                </div>
                <div class="service-card-body">
                    <div>
                        <h4 class="service-title">${s.name}</h4>
                        <div class="service-duration-tag">
                            <i class="fa-regular fa-clock"></i> ${s.duration} minutes
                        </div>
                        <p class="service-description">${s.description || 'Soin bien-être relaxant et thérapeutique.'}</p>
                    </div>
                    <div class="service-card-footer">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: ${s.colorBorder || '#5F9EA0'};"></span>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">Agenda</span>
                        </div>
                        <div style="display: flex; gap: 6px;">
                            <button class="btn btn-outline btn-sm" onclick="app.editService('${s.id}')" title="Modifier">
                                <i class="fa-regular fa-pen-to-square"></i> Modifier
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="app.deleteService('${s.id}')" title="Supprimer">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /* ========================================================================= 
       RENDU DES CLIENTS
       ========================================================================= */
    renderClients(filterQuery = '') {
        const tbody = document.getElementById('clientsTableBody');
        if (!tbody) return;

        let filtered = this.data.clients;
        if (filterQuery) {
            const q = filterQuery.toLowerCase();
            filtered = filtered.filter(c => 
                (c.name && c.name.toLowerCase().includes(q)) ||
                (c.phone && c.phone.includes(q)) ||
                (c.email && c.email.toLowerCase().includes(q))
            );
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
                        ${filterQuery ? 'Aucun client ne correspond à votre recherche.' : 'Aucun client enregistré pour l’instant. Vos clientes s’ajouteront automatiquement à chaque prise de rendez-vous.'}
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map(c => {
            const clientAppts = this.data.appointments.filter(a => a.clientName && a.clientName.toLowerCase() === c.name.toLowerCase());
            const totalSpent = clientAppts.reduce((sum, a) => sum + (Number(a.price) || 0), 0);

            return `
                <tr>
                    <td><strong>${c.name}</strong></td>
                    <td>
                        <a href="tel:${c.phone}" style="color: var(--primary-dark); font-weight: 500;">
                            ${c.phone || '-'}
                        </a>
                    </td>
                    <td>${c.email || '-'}</td>
                    <td>${clientAppts.length} rendez-vous (${totalSpent} €)</td>
                    <td>
                        <button class="btn btn-outline btn-sm" onclick="app.openNewAppointmentForClient('${c.name}', '${c.phone}')">
                            <i class="fa-regular fa-calendar-plus"></i> Nouveau RDV
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    /* ========================================================================= 
       MODALS & GESTION DES RDV ET SOINS
       ========================================================================= */
    setupModals() {
        // Close modal buttons
        document.querySelectorAll('.modal-backdrop').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('open');
                }
            });
        });

        document.querySelectorAll('.modal-close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal-backdrop');
                if (modal) modal.classList.remove('open');
            });
        });

        // Fermer avec la touche Echap
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
            }
        });

        // Bouton "+ Nouveau RDV" dans le header
        document.getElementById('btnOpenNewAppointment')?.addEventListener('click', () => {
            const todayIso = new Date().toISOString().split('T')[0];
            this.openNewAppointmentModal(todayIso, '10:00');
        });

        // Bouton "+ Ajouter une prestation" dans le catalogue
        document.getElementById('btnOpenNewService')?.addEventListener('click', () => {
            this.openNewServiceModal();
        });

        // Bouton "Bloquer un créneau"
        document.getElementById('btnOpenBlockSlot')?.addEventListener('click', () => {
            this.openBlockSlotModal();
        });

        // Soumission Formulaire RDV
        document.getElementById('formNewAppointment')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveNewAppointment();
        });

        // Soumission Formulaire Prestation
        document.getElementById('formNewService')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveService();
        });

        // Soumission Bloquer Créneau
        document.getElementById('formBlockSlot')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveBlockedSlot();
        });

        // Recherche Clients
        document.getElementById('clientSearchInput')?.addEventListener('input', (e) => {
            this.renderClients(e.target.value);
        });

        // Catégorie dynamique : Toggle formulaire d'ajout
        document.getElementById('btnToggleNewCategory')?.addEventListener('click', () => {
            const box = document.getElementById('newCategoryBox');
            if (box) {
                box.style.display = box.style.display === 'none' ? 'flex' : 'none';
                if (box.style.display === 'flex') document.getElementById('newCategoryInput')?.focus();
            }
        });

        // Confirmer l'ajout de catégorie
        document.getElementById('btnConfirmNewCategory')?.addEventListener('click', () => {
            const val = document.getElementById('newCategoryInput')?.value;
            if (val) this.addNewCategory(val);
        });

        document.getElementById('newCategoryInput')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const val = e.target.value;
                if (val) this.addNewCategory(val);
            }
        });

        // Durée de séance pour les prestations (Quick pills + Custom input)
        document.querySelectorAll('#durationPillsGroup .pill-option').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('#durationPillsGroup .pill-option').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                const val = pill.getAttribute('data-value');
                const customWrapper = document.getElementById('customDurationWrapper');
                const customInput = document.getElementById('customDurationInput');

                if (val === 'custom') {
                    if (customWrapper) customWrapper.style.display = 'flex';
                    if (customInput) {
                        customInput.focus();
                        if (customInput.value) document.getElementById('serviceDuration').value = customInput.value;
                    }
                } else {
                    if (customWrapper) customWrapper.style.display = 'none';
                    document.getElementById('serviceDuration').value = val;
                }
            });
        });

        document.getElementById('customDurationInput')?.addEventListener('input', (e) => {
            const val = Number(e.target.value);
            if (val > 0) {
                document.getElementById('serviceDuration').value = val;
            }
        });

        // Durée pour bloquer un créneau (Quick pills + Custom input)
        document.querySelectorAll('#blockDurationPillsGroup .pill-option').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('#blockDurationPillsGroup .pill-option').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                const val = pill.getAttribute('data-value');
                const customWrapper = document.getElementById('customBlockDurationWrapper');
                const customInput = document.getElementById('customBlockDurationInput');

                if (val === 'custom') {
                    if (customWrapper) customWrapper.style.display = 'flex';
                    if (customInput) {
                        customInput.focus();
                        if (customInput.value) document.getElementById('blockDuration').value = customInput.value;
                    }
                } else {
                    if (customWrapper) customWrapper.style.display = 'none';
                    document.getElementById('blockDuration').value = val;
                }
            });
        });

        document.getElementById('customBlockDurationInput')?.addEventListener('input', (e) => {
            const val = Number(e.target.value);
            if (val > 0) {
                document.getElementById('blockDuration').value = val;
            }
        });

        // Bouton supprimer l'indisponibilité (pause)
        document.getElementById('btnDeleteBlockSlot')?.addEventListener('click', () => {
            if (this.editingBlockedSlotId) {
                this.deleteBlockedSlot(this.editingBlockedSlotId);
            }
        });

        // Custom Select Dropdown pour Prestation
        const customSelectTrigger = document.getElementById('customServiceSelectTrigger');
        const customSelectWrapper = document.getElementById('customServiceSelectWrapper');
        customSelectTrigger?.addEventListener('click', (e) => {
            e.stopPropagation();
            customSelectWrapper?.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('#customServiceSelectWrapper')) {
                customSelectWrapper?.classList.remove('open');
            }
        });

        // Buffer Pills
        document.querySelectorAll('#bufferPillsGroup .pill-option').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('#bufferPillsGroup .pill-option').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                this.data.bufferTime = Number(pill.getAttribute('data-value'));
                this.saveData();
                this.showToast('Temps de pause mis à jour : ' + pill.textContent.trim(), 'success');
            });
        });

        // Dropzone file change
        const customFile = document.getElementById('serviceCustomImageFile');
        customFile?.addEventListener('change', () => {
            if (customFile.files && customFile.files[0]) {
                const name = customFile.files[0].name;
                const txt = document.getElementById('dropzoneText');
                if (txt) txt.textContent = 'Photo choisie : ' + name;
                document.querySelectorAll('.image-preset-item').forEach(el => el.classList.remove('selected'));
            }
        });

        // Init Preset Images & Colors selectors
        this.renderImagePickerPresets();
        this.renderColorPickerPresets();
        this.renderSettingsSchedule();
        this.renderCategoryPills();
    }

    /* GESTION DYNAMIQUE DES CATÉGORIES */
    renderCategoryPills(selectedCategory = 'Massages') {
        const container = document.getElementById('categoryPillsGroup');
        if (!container) return;

        const categories = this.data.categories || ['Massages', 'Réflexologie', 'Kobido / Visage', 'Soins Combinés'];
        this.data.categories = categories;

        container.innerHTML = categories.map(cat => `
            <span class="pill-option ${cat === selectedCategory ? 'active' : ''}" data-value="${cat}" onclick="app.selectCategory('${cat.replace(/'/g, "\\'")}')">
                ${cat}
            </span>
        `).join('');

        const hiddenInput = document.getElementById('serviceCategory');
        if (hiddenInput) hiddenInput.value = selectedCategory;
    }

    selectCategory(cat) {
        document.querySelectorAll('#categoryPillsGroup .pill-option').forEach(p => {
            if (p.getAttribute('data-value') === cat) p.classList.add('active');
            else p.classList.remove('active');
        });
        const hiddenInput = document.getElementById('serviceCategory');
        if (hiddenInput) hiddenInput.value = cat;
    }

    addNewCategory(catName) {
        const trimmed = catName.trim();
        if (!trimmed) return;
        if (!this.data.categories.includes(trimmed)) {
            this.data.categories.push(trimmed);
            this.saveData();
        }
        this.renderCategoryPills(trimmed);
        const box = document.getElementById('newCategoryBox');
        if (box) box.style.display = 'none';
        const input = document.getElementById('newCategoryInput');
        if (input) input.value = '';
        this.showToast(`Nouvelle catégorie "${trimmed}" ajoutée !`, 'success');
    }

    renderImagePickerPresets() {
        const container = document.getElementById('imagePresetsContainer');
        if (!container) return;

        container.innerHTML = PRESET_IMAGES.map((imgSrc, idx) => `
            <div class="image-preset-item ${idx === 0 ? 'selected' : ''}" onclick="app.selectPresetImage('${imgSrc}', this)">
                <img src="${imgSrc}" alt="Preset">
            </div>
        `).join('');
    }

    selectPresetImage(src, element) {
        this.selectedImage = src;
        document.querySelectorAll('.image-preset-item').forEach(el => el.classList.remove('selected'));
        if (element) element.classList.add('selected');
    }

    renderColorPickerPresets(selectedIdx = 0) {
        const container = document.getElementById('colorPickerContainer');
        if (!container) return;

        container.innerHTML = PRESET_COLORS.map((c, idx) => `
            <div class="color-option-radio ${idx === selectedIdx ? 'selected' : ''}" 
                 style="background-color: ${c.border};" 
                 title="${c.label}"
                 onclick="app.selectColorPreset(${idx}, this)">
            </div>
        `).join('');

        this.selectedColor = PRESET_COLORS[selectedIdx];
    }

    selectColorPreset(idx, element) {
        this.selectedColor = PRESET_COLORS[idx];
        document.querySelectorAll('.color-option-radio').forEach(el => el.classList.remove('selected'));
        if (element) element.classList.add('selected');
    }

    /* MENU DÉROULANT HAUT DE GAMME POUR LES SOINS */
    populateServiceDropdown() {
        this.renderCustomServiceDropdown();
    }

    renderCustomServiceDropdown() {
        const dropdown = document.getElementById('customServiceDropdown');
        const triggerContent = document.getElementById('triggerSelectedService');
        const hiddenInput = document.getElementById('appointmentServiceSelect');
        if (!dropdown || !triggerContent || !hiddenInput) return;

        if (this.data.services.length === 0) {
            dropdown.innerHTML = `<div class="custom-select-option" style="cursor: default; color: var(--text-muted);">Aucune prestation dans le catalogue</div>`;
            triggerContent.innerHTML = `<span class="placeholder">Aucun soin disponible</span>`;
            hiddenInput.value = '';
            return;
        }

        dropdown.innerHTML = this.data.services.map(s => {
            const isSelected = hiddenInput.value === s.id;
            return `
                <div class="custom-select-option ${isSelected ? 'selected' : ''}" data-id="${s.id}" onclick="app.selectCustomService('${s.id}')">
                    <div class="option-left">
                        <span class="option-color-dot" style="background-color: ${s.colorBorder || '#5F9EA0'};"></span>
                        <div>
                            <div class="option-title">${s.name}</div>
                            <div class="option-meta">${s.category || 'Soin'}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="option-badge">${s.duration} min • ${s.price} €</span>
                        ${isSelected ? '<i class="fa-solid fa-check option-check"></i>' : ''}
                    </div>
                </div>
            `;
        }).join('');

        if (hiddenInput.value) {
            const s = this.data.services.find(srv => srv.id === hiddenInput.value);
            if (s) {
                triggerContent.innerHTML = `
                    <div class="trigger-selected-item">
                        <span class="trigger-dot" style="background-color: ${s.colorBorder || '#5F9EA0'};"></span>
                        <span>${s.name}</span>
                        <span class="option-badge" style="margin-left: auto;">${s.duration}m • ${s.price}€</span>
                    </div>
                `;
            }
        }
    }

    selectCustomService(serviceId) {
        const s = this.data.services.find(srv => srv.id === serviceId);
        if (!s) return;

        const hiddenInput = document.getElementById('appointmentServiceSelect');
        const triggerContent = document.getElementById('triggerSelectedService');
        const wrapper = document.getElementById('customServiceSelectWrapper');

        if (hiddenInput) hiddenInput.value = s.id;
        if (triggerContent) {
            triggerContent.innerHTML = `
                <div class="trigger-selected-item">
                    <span class="trigger-dot" style="background-color: ${s.colorBorder || '#5F9EA0'};"></span>
                    <span>${s.name}</span>
                    <span class="option-badge" style="margin-left: auto;">${s.duration}m • ${s.price}€</span>
                </div>
            `;
        }
        if (wrapper) wrapper.classList.remove('open');
        this.renderCustomServiceDropdown();
    }

    openNewAppointmentModal(date, time) {
        const modal = document.getElementById('modalNewAppointment');
        if (!modal) return;

        document.getElementById('apptDate').value = date || new Date().toISOString().split('T')[0];
        document.getElementById('apptTime').value = time || '10:00';
        document.getElementById('apptClientName').value = '';
        document.getElementById('apptClientPhone').value = '';
        document.getElementById('apptClientEmail').value = '';
        document.getElementById('apptNotes').value = '';

        if (this.data.services.length > 0) {
            this.selectCustomService(this.data.services[0].id);
        } else {
            this.renderCustomServiceDropdown();
        }

        modal.classList.add('open');
    }

    openNewAppointmentForClient(clientName, clientPhone) {
        this.openNewAppointmentModal();
        document.getElementById('apptClientName').value = clientName || '';
        document.getElementById('apptClientPhone').value = clientPhone || '';
    }

    saveNewAppointment() {
        const clientName = document.getElementById('apptClientName').value.trim();
        const clientPhone = document.getElementById('apptClientPhone').value.trim();
        const clientEmail = document.getElementById('apptClientEmail').value.trim();
        const serviceId = document.getElementById('appointmentServiceSelect').value;

        const date = document.getElementById('apptDate').value;
        const time = document.getElementById('apptTime').value;
        const notes = document.getElementById('apptNotes').value.trim();

        if (!clientName) {
            alert('Veuillez renseigner le nom de la cliente.');
            return;
        }

        if (!serviceId) {
            alert('Veuillez sélectionner une prestation.');
            return;
        }

        const service = this.data.services.find(s => s.id === serviceId);
        const serviceName = service ? service.name : 'Prestation';
        const duration = service ? service.duration : 60;
        const price = service ? service.price : 80;
        const colorBg = service ? service.colorBg : '#E8EAF6';
        const colorBorder = service ? service.colorBorder : '#5F9EA0';
        const colorText = service ? service.colorText : '#1F383E';

        const newAppt = {
            id: 'appt_' + Date.now(),
            clientName,
            clientPhone,
            clientEmail,
            serviceId,
            serviceName,
            duration,
            price,
            date,
            time,
            notes,
            colorBg,
            colorBorder,
            colorText,
            createdAt: new Date().toISOString()
        };

        this.data.appointments.push(newAppt);

        // Sauvegarder dans le répertoire client si pas déjà existant
        let existingClient = this.data.clients.find(c => c.name.toLowerCase() === clientName.toLowerCase());
        if (!existingClient) {
            existingClient = {
                id: 'cli_' + Date.now(),
                name: clientName,
                phone: clientPhone,
                email: clientEmail
            };
            this.data.clients.push(existingClient);
        } else if (clientPhone && !existingClient.phone) {
            existingClient.phone = clientPhone;
        }

        this.addNotification(`Nouveau RDV pris : ${clientName} - ${serviceName} (${date} à ${time})`);
        this.saveData();

        // Synchronisation Cloud Supabase uniquement si connectée
        if (this.currentUser) {
            window.supabaseService?.upsertAppointment(newAppt);
            window.supabaseService?.upsertClient(existingClient);
            this.showToast(`Rendez-vous enregistré et synchronisé sur le Cloud !`, 'success');
        } else {
            this.showToast(`Mode Test : RDV ajouté localement (connectez-vous pour synchroniser sur le Cloud)`, 'info');
        }

        document.getElementById('modalNewAppointment').classList.remove('open');
        this.renderAll();
    }

    openAppointmentDetails(id) {
        const appt = this.data.appointments.find(a => a.id === id);
        if (!appt) return;

        const modal = document.getElementById('modalAppointmentDetails');
        if (!modal) return;

        document.getElementById('detailClientName').textContent = appt.clientName;
        document.getElementById('detailServiceName').textContent = appt.serviceName;
        document.getElementById('detailDateTime').textContent = `${appt.date} à ${appt.time} (${appt.duration} min)`;
        document.getElementById('detailPrice').textContent = `${appt.price} €`;

        // Affichage du mode de règlement clair pour Stéphanie
        const paymentBadge = document.getElementById('detailPaymentBadge');
        const isOnline = appt.payment_method === 'en_ligne';
        if (paymentBadge) {
            paymentBadge.className = `payment-badge ${isOnline ? 'en_ligne' : 'sur_place'}`;
            paymentBadge.innerHTML = isOnline 
                ? '<i class="fa-solid fa-circle-check"></i> <span>Payé en ligne (CB)</span>'
                : '<i class="fa-solid fa-hand-holding-dollar"></i> <span>À régler sur place au cabinet</span>';
        }

        document.getElementById('detailPhone').textContent = appt.clientPhone || 'Non renseigné';
        document.getElementById('detailEmail').textContent = appt.clientEmail || 'Non renseigné';
        document.getElementById('detailNotes').textContent = appt.notes || 'Aucune note particulière';

        const callBtn = document.getElementById('detailCallBtn');
        if (callBtn) {
            if (appt.clientPhone) {
                callBtn.href = `tel:${appt.clientPhone}`;
                callBtn.style.display = 'inline-flex';
            } else {
                callBtn.style.display = 'none';
            }
        }

        const smsBtn = document.getElementById('detailSmsBtn');
        if (smsBtn) {
            if (appt.clientPhone) {
                smsBtn.href = `sms:${appt.clientPhone}`;
                smsBtn.style.display = 'inline-flex';
            } else {
                smsBtn.style.display = 'none';
            }
        }

        const deleteBtn = document.getElementById('detailDeleteBtn');
        if (deleteBtn) {
            deleteBtn.onclick = () => {
                if (confirm(`Voulez-vous annuler le rendez-vous de ${appt.clientName} ?`)) {
                    this.data.appointments = this.data.appointments.filter(a => a.id !== id);
                    this.saveData();
                    if (this.currentUser) {
                        window.supabaseService?.deleteAppointment(id);
                        this.showToast('Rendez-vous annulé et supprimé du Cloud.', 'danger');
                    } else {
                        this.showToast('Mode Test : rendez-vous annulé localement.', 'info');
                    }
                    modal.classList.remove('open');
                    this.renderAll();
                }
            };
        }

        modal.classList.add('open');
    }

    openNewServiceModal() {
        this.editingServiceId = null;
        const modal = document.getElementById('modalNewService');
        if (!modal) return;

        document.getElementById('serviceModalTitle').textContent = 'Nouvelle Prestation';
        document.getElementById('serviceName').value = '';
        document.getElementById('servicePrice').value = '80';
        document.getElementById('serviceDescription').value = '';
        document.getElementById('serviceDuration').value = '60';

        // Catégorie dynamique
        this.renderCategoryPills('Massages');
        const newCatBox = document.getElementById('newCategoryBox');
        if (newCatBox) newCatBox.style.display = 'none';

        // Durée standard
        document.querySelectorAll('#durationPillsGroup .pill-option').forEach(p => {
            if (p.getAttribute('data-value') === '60') p.classList.add('active');
            else p.classList.remove('active');
        });
        const customWrapper = document.getElementById('customDurationWrapper');
        if (customWrapper) customWrapper.style.display = 'none';

        const dropzoneText = document.getElementById('dropzoneText');
        if (dropzoneText) dropzoneText.textContent = 'Téléverser une photo depuis votre appareil';

        this.selectedImage = PRESET_IMAGES[0];
        this.renderImagePickerPresets();
        this.renderColorPickerPresets(0);

        modal.classList.add('open');
    }

    editService(id) {
        const s = this.data.services.find(srv => srv.id === id);
        if (!s) return;

        this.editingServiceId = id;
        const modal = document.getElementById('modalNewService');
        if (!modal) return;

        document.getElementById('serviceModalTitle').textContent = 'Modifier la prestation';
        document.getElementById('serviceName').value = s.name;
        document.getElementById('servicePrice').value = s.price;
        document.getElementById('serviceDescription').value = s.description || '';
        document.getElementById('serviceDuration').value = s.duration;

        // Catégorie
        this.renderCategoryPills(s.category);

        // Durée (standard ou personnalisée)
        const stdDurations = ['30', '45', '60', '75', '90', '120'];
        let matchedDuration = false;
        document.querySelectorAll('#durationPillsGroup .pill-option').forEach(p => {
            if (p.getAttribute('data-value') === String(s.duration)) {
                p.classList.add('active');
                matchedDuration = true;
            } else {
                p.classList.remove('active');
            }
        });

        const customWrapper = document.getElementById('customDurationWrapper');
        const customInput = document.getElementById('customDurationInput');
        if (!matchedDuration) {
            document.getElementById('pillCustomDuration')?.classList.add('active');
            if (customWrapper) customWrapper.style.display = 'flex';
            if (customInput) customInput.value = s.duration;
        } else {
            if (customWrapper) customWrapper.style.display = 'none';
        }

        // Couleur
        let colorIdx = PRESET_COLORS.findIndex(c => c.border === s.colorBorder);
        if (colorIdx === -1) colorIdx = 0;
        this.renderColorPickerPresets(colorIdx);

        this.selectedImage = s.image || PRESET_IMAGES[0];
        modal.classList.add('open');
    }

    deleteService(id) {
        if (confirm('Voulez-vous supprimer cette prestation du catalogue ?')) {
            this.data.services = this.data.services.filter(s => s.id !== id);
            this.saveData();
            if (this.currentUser) {
                window.supabaseService?.deleteService(id);
                this.showToast('Prestation supprimée du Cloud', 'danger');
            } else {
                this.showToast('Mode Test : prestation supprimée localement', 'info');
            }
            this.renderCatalogue();
            this.populateServiceDropdown();
        }
    }

    saveService() {
        const name = document.getElementById('serviceName').value.trim();
        const category = document.getElementById('serviceCategory').value.trim() || 'Massages';
        const duration = Number(document.getElementById('serviceDuration').value) || 60;
        const price = Number(document.getElementById('servicePrice').value) || 80;
        const description = document.getElementById('serviceDescription').value.trim();

        if (!name) {
            alert('Veuillez entrer un nom de soin.');
            return;
        }

        // Custom image upload support
        const fileInput = document.getElementById('serviceCustomImageFile');
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.selectedImage = e.target.result;
                this.finalizeSaveService({ name, category, duration, price, description });
            };
            reader.readAsDataURL(fileInput.files[0]);
            return;
        }

        this.finalizeSaveService({ name, category, duration, price, description });
    }

    finalizeSaveService({ name, category, duration, price, description }) {
        let savedService = null;
        if (this.editingServiceId) {
            const s = this.data.services.find(srv => srv.id === this.editingServiceId);
            if (s) {
                s.name = name;
                s.category = category;
                s.duration = duration;
                s.price = price;
                s.description = description;
                s.image = this.selectedImage;
                s.colorBg = this.selectedColor.bg;
                s.colorBorder = this.selectedColor.border;
                s.colorText = this.selectedColor.text;
                savedService = s;
            }
            this.showToast('Prestation modifiée avec succès !', 'success');
        } else {
            const newService = {
                id: 'srv_' + Date.now(),
                name,
                category,
                duration,
                price,
                description,
                image: this.selectedImage,
                colorBg: this.selectedColor.bg,
                colorBorder: this.selectedColor.border,
                colorText: this.selectedColor.text
            };
            this.data.services.push(newService);
            savedService = newService;
            this.showToast('Nouvelle prestation ajoutée au catalogue !', 'success');
        }

        this.saveData();
        if (this.currentUser && savedService) {
            window.supabaseService?.upsertService(savedService);
            this.showToast('Prestation synchronisée sur le Cloud !', 'success');
        } else {
            this.showToast('Mode Test : prestation enregistrée localement (non synchronisée au Cloud)', 'info');
        }

        document.getElementById('modalNewService').classList.remove('open');
        this.renderCatalogue();
        this.populateServiceDropdown();
    }

    /* GESTION ET MODIFICATION DES PAUSES ET CRÉNEAUX BLOQUÉS */
    openBlockSlotModal(date = null, time = '12:00') {
        this.editingBlockedSlotId = null;
        const modal = document.getElementById('modalBlockSlot');
        if (!modal) return;

        document.getElementById('blockSlotTitleText').textContent = 'Bloquer un créneau';
        document.getElementById('iconSubmitBlockSlot').className = 'fa-solid fa-lock';
        document.getElementById('textSubmitBlockSlot').textContent = 'Bloquer ce créneau';
        document.getElementById('btnDeleteBlockSlot').style.display = 'none';

        document.getElementById('blockReason').value = 'Pause déjeuner';
        document.getElementById('blockDate').value = date || new Date().toISOString().split('T')[0];
        document.getElementById('blockTime').value = time;
        document.getElementById('blockDuration').value = '60';

        document.querySelectorAll('#blockDurationPillsGroup .pill-option').forEach(p => {
            if (p.getAttribute('data-value') === '60') p.classList.add('active');
            else p.classList.remove('active');
        });
        const customWrapper = document.getElementById('customBlockDurationWrapper');
        if (customWrapper) customWrapper.style.display = 'none';

        modal.classList.add('open');
    }

    openBlockedDetails(id) {
        const blk = this.data.blockedSlots.find(b => b.id === id);
        if (!blk) return;

        this.editingBlockedSlotId = id;
        const modal = document.getElementById('modalBlockSlot');
        if (!modal) return;

        document.getElementById('blockSlotTitleText').textContent = 'Modifier l\'indisponibilité (Pause)';
        document.getElementById('iconSubmitBlockSlot').className = 'fa-solid fa-check';
        document.getElementById('textSubmitBlockSlot').textContent = 'Enregistrer les modifications';
        document.getElementById('btnDeleteBlockSlot').style.display = 'inline-flex';

        document.getElementById('blockReason').value = blk.reason || '';
        document.getElementById('blockDate').value = blk.date;
        document.getElementById('blockTime').value = blk.time;
        document.getElementById('blockDuration').value = blk.duration;

        let matched = false;
        document.querySelectorAll('#blockDurationPillsGroup .pill-option').forEach(p => {
            if (p.getAttribute('data-value') === String(blk.duration)) {
                p.classList.add('active');
                matched = true;
            } else {
                p.classList.remove('active');
            }
        });

        const customWrapper = document.getElementById('customBlockDurationWrapper');
        const customInput = document.getElementById('customBlockDurationInput');
        if (!matched) {
            document.getElementById('pillCustomBlockDuration')?.classList.add('active');
            if (customWrapper) customWrapper.style.display = 'flex';
            if (customInput) customInput.value = blk.duration;
        } else {
            if (customWrapper) customWrapper.style.display = 'none';
        }

        modal.classList.add('open');
    }

    saveBlockedSlot() {
        const date = document.getElementById('blockDate').value;
        const time = document.getElementById('blockTime').value;
        const duration = Number(document.getElementById('blockDuration').value) || 60;
        const reason = document.getElementById('blockReason').value.trim() || 'Indisponible';

        let savedBlock = null;
        if (this.editingBlockedSlotId) {
            const blk = this.data.blockedSlots.find(b => b.id === this.editingBlockedSlotId);
            if (blk) {
                blk.date = date;
                blk.time = time;
                blk.duration = duration;
                blk.reason = reason;
                savedBlock = blk;
                this.showToast('Indisponibilité mise à jour !', 'success');
            }
        } else {
            const newBlock = {
                id: 'block_' + Date.now(),
                date,
                time,
                duration,
                reason
            };
            this.data.blockedSlots.push(newBlock);
            savedBlock = newBlock;
            this.showToast('Créneau indisponible bloqué sur votre planning.', 'success');
        }

        this.saveData();
        if (this.currentUser && savedBlock) {
            window.supabaseService?.upsertBlockedSlot(savedBlock);
            this.showToast('Créneau indisponible synchronisé sur le Cloud.', 'success');
        } else {
            this.showToast('Mode Test : créneau bloqué localement.', 'info');
        }

        document.getElementById('modalBlockSlot').classList.remove('open');
        if (this.calendar) this.calendar.render(this.data.appointments, this.data.blockedSlots);
    }

    deleteBlockedSlot(id) {
        this.data.blockedSlots = this.data.blockedSlots.filter(b => b.id !== id);
        this.saveData();
        if (this.currentUser) {
            window.supabaseService?.deleteBlockedSlot(id);
            this.showToast('Indisponibilité supprimée du Cloud.', 'danger');
        } else {
            this.showToast('Mode Test : indisponibilité supprimée localement.', 'info');
        }
        document.getElementById('modalBlockSlot').classList.remove('open');
        if (this.calendar) this.calendar.render(this.data.appointments, this.data.blockedSlots);
    }

    renderSettingsSchedule() {
        const list = document.getElementById('scheduleDaysList');
        if (!list) return;

        const defaultSchedule = this.data.schedule || [
            { day: 'Lundi', open: true, start: '08:30', end: '19:00' },
            { day: 'Mardi', open: true, start: '08:30', end: '19:00' },
            { day: 'Mercredi', open: true, start: '08:30', end: '19:00' },
            { day: 'Jeudi', open: true, start: '08:30', end: '19:00' },
            { day: 'Vendredi', open: true, start: '08:30', end: '19:00' },
            { day: 'Samedi', open: true, start: '09:00', end: '18:00' },
            { day: 'Dimanche', open: false, start: '09:00', end: '18:00' }
        ];
        this.data.schedule = defaultSchedule;

        list.innerHTML = defaultSchedule.map((s, idx) => `
            <div class="schedule-day-item">
                <div class="schedule-day-info">
                    <label class="switch-toggle">
                        <input type="checkbox" ${s.open ? 'checked' : ''} onchange="app.toggleDaySchedule(${idx}, this.checked)">
                        <span class="switch-slider"></span>
                    </label>
                    <span class="day-label">${s.day}</span>
                </div>
                <div class="schedule-time-inputs" style="${s.open ? '' : 'opacity: 0.35; pointer-events: none;'}">
                    <input type="time" value="${s.start}" onchange="app.updateDayTime(${idx}, 'start', this.value)">
                    <span style="color: var(--text-muted); font-size: 0.8rem;">à</span>
                    <input type="time" value="${s.end}" onchange="app.updateDayTime(${idx}, 'end', this.value)">
                </div>
            </div>
        `).join('');

        // Synchroniser les pills de temps de battement
        const currentBuffer = this.data.bufferTime !== undefined ? this.data.bufferTime : 15;
        document.querySelectorAll('#bufferPillsGroup .pill-option').forEach(p => {
            if (Number(p.getAttribute('data-value')) === Number(currentBuffer)) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        });
    }

    toggleDaySchedule(idx, isOpen) {
        if (this.data.schedule && this.data.schedule[idx]) {
            this.data.schedule[idx].open = isOpen;
            this.saveData();
            this.renderSettingsSchedule();
            this.showToast(`${this.data.schedule[idx].day} : ${isOpen ? 'Ouvert' : 'Fermé'}`, 'success');
        }
    }

    updateDayTime(idx, field, val) {
        if (this.data.schedule && this.data.schedule[idx]) {
            this.data.schedule[idx][field] = val;
            this.saveData();
            window.supabaseService?.saveSettings({
                address: document.getElementById('settingCabinetAddress')?.value,
                phone: document.getElementById('settingCabinetPhone')?.value,
                email: document.getElementById('settingCabinetEmail')?.value,
                bufferTime: this.data.bufferTime,
                schedule: this.data.schedule
            });
        }
    }

    saveCabinetSettings() {
        const address = document.getElementById('settingCabinetAddress')?.value.trim();
        const phone = document.getElementById('settingCabinetPhone')?.value.trim();
        const email = document.getElementById('settingCabinetEmail')?.value.trim();
        this.data.cabinetInfo = { address, phone, email };
        this.saveData();
        if (this.currentUser) {
            window.supabaseService?.saveSettings({
                address,
                phone,
                email,
                bufferTime: this.data.bufferTime,
                schedule: this.data.schedule
            });
            this.showToast('Informations et horaires enregistrés sur le Cloud !', 'success');
        } else {
            this.showToast('Mode Test : paramètres enregistrés localement', 'info');
        }
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    renderAll() {
        this.renderDashboard();
        this.renderCatalogue();
        this.renderClients();
        if (this.calendar) {
            this.calendar.render(this.data.appointments, this.data.blockedSlots);
        }
    }
}

// Instance globale accessible
let app;
function initStephanieApp() {
    if (!window.app) {
        app = new StephanieProApp();
        window.app = app;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStephanieApp);
} else {
    initStephanieApp();
}
