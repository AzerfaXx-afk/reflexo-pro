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

// Palette de couleurs pour les soins
const PRESET_COLORS = [
    { bg: '#E8EAF6', border: '#5C6BC0', text: '#1A237E', label: 'Indigo' },
    { bg: '#FCE4EC', border: '#EC407A', text: '#880E4F', label: 'Rose' },
    { bg: '#FFF8E1', border: '#FFB300', text: '#E65100', label: 'Ambre' },
    { bg: '#E0F2F1', border: '#26A69A', text: '#004D40', label: 'Turquoise' },
    { bg: '#F3E5F5', border: '#AB47BC', text: '#4A148C', label: 'Violet' },
    { bg: '#FBE9E7', border: '#FF7043', text: '#BF360C', label: 'Pêche' }
];

class StephanieProApp {
    constructor() {
        this.storageKey = 'stephanie_pro_data_v1';
        this.currentView = 'dashboard';
        this.data = this.loadData();
        this.selectedImage = PRESET_IMAGES[0];
        this.selectedColor = PRESET_COLORS[0];
        this.editingServiceId = null;

        this.calendar = null;

        this.init();
    }

    loadData() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error loading data', e);
            }
        }
        
        // Application vide au départ comme demandé par l'utilisateur
        return {
            services: [],
            appointments: [],
            blockedSlots: [],
            clients: [],
            notifications: []
        };
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

        // Enregistrer Service Worker pour PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW fail', err));
        }
    }

    updateHeaderDate() {
        const now = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const dateStr = now.toLocaleDateString('fr-FR', options);
        const el = document.getElementById('headerDate');
        if (el) el.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    }

    /* ========================================================================= 
       NAVIGATION
       ========================================================================= */
    setupNavigation() {
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
                        <button class="btn btn-outline" onclick="app.importCfixePresets()">
                            <i class="fa-solid fa-wand-magic-sparkles"></i> Pré-remplir avec mes soins Cfixe
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

    importCfixePresets() {
        this.data.services = [...CFIXE_PRESET_SERVICES];
        this.saveData();
        this.renderCatalogue();
        this.populateServiceDropdown();
        this.showToast('10 Prestations Cfixe importées dans votre catalogue !', 'success');
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

        // Category Pills
        document.querySelectorAll('#categoryPillsGroup .pill-option').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('#categoryPillsGroup .pill-option').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                document.getElementById('serviceCategory').value = pill.getAttribute('data-value');
            });
        });

        // Duration Pills
        document.querySelectorAll('#durationPillsGroup .pill-option').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('#durationPillsGroup .pill-option').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                document.getElementById('serviceDuration').value = pill.getAttribute('data-value');
            });
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

    renderColorPickerPresets() {
        const container = document.getElementById('colorPickerContainer');
        if (!container) return;

        container.innerHTML = PRESET_COLORS.map((c, idx) => `
            <div class="color-option-radio ${idx === 0 ? 'selected' : ''}" 
                 style="background-color: ${c.border};" 
                 title="${c.label}"
                 onclick="app.selectColorPreset(${idx}, this)">
            </div>
        `).join('');
    }

    selectColorPreset(idx, element) {
        this.selectedColor = PRESET_COLORS[idx];
        document.querySelectorAll('.color-option-radio').forEach(el => el.classList.remove('selected'));
        if (element) element.classList.add('selected');
    }

    populateServiceDropdown() {
        const select = document.getElementById('appointmentServiceSelect');
        if (!select) return;

        if (this.data.services.length === 0) {
            select.innerHTML = `<option value="">-- Aucun soin enregistré (Ajoutez-en dans Catalogue) --</option>`;
            return;
        }

        select.innerHTML = this.data.services.map(s => `
            <option value="${s.id}" data-duration="${s.duration}" data-price="${s.price}">
                ${s.name} (${s.duration} min - ${s.price} €)
            </option>
        `).join('');
    }

    openNewAppointmentModal(date, time) {
        this.populateServiceDropdown();
        const modal = document.getElementById('modalNewAppointment');
        if (!modal) return;

        document.getElementById('apptDate').value = date || new Date().toISOString().split('T')[0];
        document.getElementById('apptTime').value = time || '10:00';
        document.getElementById('apptClientName').value = '';
        document.getElementById('apptClientPhone').value = '';
        document.getElementById('apptClientEmail').value = '';
        document.getElementById('apptNotes').value = '';

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
        const serviceSelect = document.getElementById('appointmentServiceSelect');
        const serviceId = serviceSelect.value;
        const selectedOption = serviceSelect.selectedOptions[0];

        const date = document.getElementById('apptDate').value;
        const time = document.getElementById('apptTime').value;
        const notes = document.getElementById('apptNotes').value.trim();

        if (!clientName) {
            alert('Veuillez renseigner le nom de la cliente.');
            return;
        }

        const service = this.data.services.find(s => s.id === serviceId);
        const serviceName = service ? service.name : (selectedOption ? selectedOption.text : 'Prestation');
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
            this.data.clients.push({
                id: 'cli_' + Date.now(),
                name: clientName,
                phone: clientPhone,
                email: clientEmail
            });
        } else if (clientPhone && !existingClient.phone) {
            existingClient.phone = clientPhone;
        }

        this.addNotification(`Nouveau RDV pris : ${clientName} - ${serviceName} (${date} à ${time})`);
        this.saveData();

        document.getElementById('modalNewAppointment').classList.remove('open');
        this.renderAll();
        this.showToast(`Rendez-vous enregistré avec succès pour ${clientName} !`, 'success');
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
                    modal.classList.remove('open');
                    this.renderAll();
                    this.showToast('Rendez-vous annulé.', 'danger');
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
        document.getElementById('serviceCategory').value = 'Massages';
        document.getElementById('serviceDuration').value = '60';
        document.getElementById('servicePrice').value = '80';
        document.getElementById('serviceDescription').value = '';

        // Reset category pills
        document.querySelectorAll('#categoryPillsGroup .pill-option').forEach(p => {
            if (p.getAttribute('data-value') === 'Massages') p.classList.add('active');
            else p.classList.remove('active');
        });

        // Reset duration pills
        document.querySelectorAll('#durationPillsGroup .pill-option').forEach(p => {
            if (p.getAttribute('data-value') === '60') p.classList.add('active');
            else p.classList.remove('active');
        });

        const dropzoneText = document.getElementById('dropzoneText');
        if (dropzoneText) dropzoneText.textContent = 'Téléverser une photo depuis votre appareil';

        this.selectedImage = PRESET_IMAGES[0];
        this.selectedColor = PRESET_COLORS[0];
        this.renderImagePickerPresets();
        this.renderColorPickerPresets();

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
        document.getElementById('serviceCategory').value = s.category;
        document.getElementById('serviceDuration').value = s.duration;
        document.getElementById('servicePrice').value = s.price;
        document.getElementById('serviceDescription').value = s.description || '';

        // Synchroniser les pills catégorie
        document.querySelectorAll('#categoryPillsGroup .pill-option').forEach(p => {
            if (p.getAttribute('data-value') === s.category) p.classList.add('active');
            else p.classList.remove('active');
        });

        // Synchroniser les pills durée
        document.querySelectorAll('#durationPillsGroup .pill-option').forEach(p => {
            if (Number(p.getAttribute('data-value')) === Number(s.duration)) p.classList.add('active');
            else p.classList.remove('active');
        });

        this.selectedImage = s.image || PRESET_IMAGES[0];
        modal.classList.add('open');
    }

    deleteService(id) {
        if (confirm('Voulez-vous supprimer cette prestation du catalogue ?')) {
            this.data.services = this.data.services.filter(s => s.id !== id);
            this.saveData();
            this.renderCatalogue();
            this.populateServiceDropdown();
            this.showToast('Prestation supprimée', 'danger');
        }
    }

    saveService() {
        const name = document.getElementById('serviceName').value.trim();
        const category = document.getElementById('serviceCategory').value.trim();
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
            this.showToast('Nouvelle prestation ajoutée au catalogue !', 'success');
        }

        this.saveData();
        document.getElementById('modalNewService').classList.remove('open');
        this.renderCatalogue();
        this.populateServiceDropdown();
    }

    openBlockSlotModal() {
        const modal = document.getElementById('modalBlockSlot');
        if (!modal) return;
        document.getElementById('blockDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('blockTime').value = '12:00';
        document.getElementById('blockDuration').value = '60';
        document.getElementById('blockReason').value = 'Pause déjeuner';
        modal.classList.add('open');
    }

    saveBlockedSlot() {
        const date = document.getElementById('blockDate').value;
        const time = document.getElementById('blockTime').value;
        const duration = Number(document.getElementById('blockDuration').value) || 60;
        const reason = document.getElementById('blockReason').value.trim() || 'Indisponible';

        this.data.blockedSlots.push({
            id: 'block_' + Date.now(),
            date,
            time,
            duration,
            reason
        });

        this.saveData();
        document.getElementById('modalBlockSlot').classList.remove('open');
        if (this.calendar) this.calendar.render(this.data.appointments, this.data.blockedSlots);
        this.showToast('Créneau indisponible bloqué sur votre planning.', 'success');
    }

    openBlockedDetails(id) {
        const blk = this.data.blockedSlots.find(b => b.id === id);
        if (!blk) return;
        if (confirm(`Supprimer le blocage "${blk.reason}" du ${blk.date} à ${blk.time} pour réouvrir le créneau ?`)) {
            this.data.blockedSlots = this.data.blockedSlots.filter(b => b.id !== id);
            this.saveData();
            if (this.calendar) this.calendar.render(this.data.appointments, this.data.blockedSlots);
            this.showToast('Créneau libéré.', 'success');
        }
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
        }
    }

    exportData() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `sauvegarde-stephanie-pro-${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        this.showToast('Sauvegarde exportée avec succès !', 'success');
    }

    resetAllData() {
        if (confirm('Êtes-vous sûre de vouloir réinitialiser toutes vos données locales ?')) {
            localStorage.removeItem(this.storageKey);
            location.reload();
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
document.addEventListener('DOMContentLoaded', () => {
    app = new StephanieProApp();
});
