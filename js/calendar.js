/**
 * CALENDAR ENGINE FOR REFLEXO PRO
 * Agenda interactif multi-vues (Jour / 3 Jours / Semaine) avec Drag & Drop et support tactile mobile
 */

class ProCalendar {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.onEventClick = options.onEventClick || (() => {});
        this.onEventDrop = options.onEventDrop || (() => {});
        this.onSlotClick = options.onSlotClick || (() => {});
        
        this.startHour = 7.5; // 07h30
        this.endHour = 20.5;   // 20h30
        
        // Mode de vue : 'day' (1j), '3days' (3j recommandé mobile), 'week' (7j)
        const savedMode = localStorage.getItem('cal_view_mode');
        this.viewMode = savedMode || (window.innerWidth <= 768 ? '3days' : 'week');

        this.currentDate = new Date();
        this.currentDate.setHours(0, 0, 0, 0);
        this.currentWeekStart = this.getMonday(new Date());
        
        this.pixelsPerHour = 70;
        this.draggedEvent = null;

        this.init();
    }

    getMonday(d) {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        date.setDate(diff);
        date.setHours(0, 0, 0, 0);
        return date;
    }

    init() {
        this.updateSwitcherUI();
        this.render();
    }

    setViewMode(mode) {
        if (!['day', '3days', 'week'].includes(mode)) return;
        this.viewMode = mode;
        localStorage.setItem('cal_view_mode', mode);
        this.updateSwitcherUI();
        this.render();
    }

    updateSwitcherUI() {
        document.querySelectorAll('.view-mode-btn').forEach(btn => {
            const mode = btn.getAttribute('data-mode');
            if (mode === this.viewMode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    prev() {
        if (this.viewMode === 'day') {
            this.currentDate.setDate(this.currentDate.getDate() - 1);
        } else if (this.viewMode === '3days') {
            this.currentDate.setDate(this.currentDate.getDate() - 3);
        } else {
            this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
        }
        this.render();
    }

    next() {
        if (this.viewMode === 'day') {
            this.currentDate.setDate(this.currentDate.getDate() + 1);
        } else if (this.viewMode === '3days') {
            this.currentDate.setDate(this.currentDate.getDate() + 3);
        } else {
            this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
        }
        this.render();
    }

    today() {
        this.currentDate = new Date();
        this.currentDate.setHours(0, 0, 0, 0);
        this.currentWeekStart = this.getMonday(new Date());
        this.render();
    }

    getVisibleDays() {
        const days = [];
        if (this.viewMode === 'day') {
            days.push(new Date(this.currentDate));
        } else if (this.viewMode === '3days') {
            for (let i = 0; i < 3; i++) {
                const d = new Date(this.currentDate);
                d.setDate(d.getDate() + i);
                days.push(d);
            }
        } else {
            // 'week' (7 jours)
            for (let i = 0; i < 7; i++) {
                const d = new Date(this.currentWeekStart);
                d.setDate(d.getDate() + i);
                days.push(d);
            }
        }
        return days;
    }

    formatDateIso(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    render(events = null, blockedSlots = null) {
        if (events !== null) this.events = events;
        if (blockedSlots !== null) this.blockedSlots = blockedSlots;
        this.events = this.events || [];
        this.blockedSlots = this.blockedSlots || [];
        
        if (!this.container) return;

        const visibleDays = this.getVisibleDays();
        const todayIso = this.formatDateIso(new Date());
        const numDays = visibleDays.length;
        
        // Mise à jour du titre de la période
        const titleEl = document.getElementById('calendarPeriodTitle');
        if (titleEl) {
            const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
            if (this.viewMode === 'day') {
                const d = visibleDays[0];
                const dayName = d.toLocaleDateString('fr-FR', { weekday: 'short' });
                titleEl.textContent = `${dayName}. ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
            } else {
                const d1 = visibleDays[0];
                const d2 = visibleDays[visibleDays.length - 1];
                if (d1.getMonth() === d2.getMonth()) {
                    titleEl.textContent = `${d1.getDate()} - ${d2.getDate()} ${months[d2.getMonth()]} ${d2.getFullYear()}`;
                } else {
                    titleEl.textContent = `${d1.getDate()} ${months[d1.getMonth()]} - ${d2.getDate()} ${months[d2.getMonth()]} ${d2.getFullYear()}`;
                }
            }
        }

        const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        // Grille adaptative CSS inline pour correspondre au nombre de jours
        let colStyle = '';
        if (this.viewMode === 'day') {
            colStyle = 'grid-template-columns: 48px 1fr; min-width: 100%;';
        } else if (this.viewMode === '3days') {
            colStyle = 'grid-template-columns: 48px repeat(3, minmax(96px, 1fr)); min-width: 100%;';
        } else {
            // 'week' (7 jours)
            colStyle = window.innerWidth <= 768
                ? 'grid-template-columns: 46px repeat(7, minmax(120px, 1fr)); min-width: 890px;'
                : 'grid-template-columns: 55px repeat(7, minmax(100px, 1fr)); min-width: 100%;';
        }

        // Header Days
        let headerHtml = `<div class="calendar-header-days" style="${colStyle}">
            <div class="day-col-header" style="background: var(--bg-light); border-right: 1px solid rgba(0,0,0,0.05);"></div>`;

        visibleDays.forEach((d) => {
            const isToday = this.formatDateIso(d) === todayIso;
            const dayOfWeek = dayNames[d.getDay()];
            headerHtml += `
                <div class="day-col-header ${isToday ? 'today' : ''}" data-date="${this.formatDateIso(d)}">
                    <div class="day-name">${dayOfWeek}.</div>
                    <div class="day-number">${d.getDate()}</div>
                </div>
            `;
        });
        headerHtml += `</div>`;

        // Body with Time Axis & Columns
        let bodyHtml = `<div class="calendar-body-scroll"><div class="calendar-grid-body" style="${colStyle}">`;

        const slotHalfHourHeight = this.pixelsPerHour / 2;

        // Time Axis
        bodyHtml += `<div class="time-axis">`;
        for (let h = 7.5; h < 20.5; h += 0.5) {
            const hour = Math.floor(h);
            const min = h % 1 === 0 ? '00' : '30';
            const label = min === '00' ? `${hour}h` : '';
            bodyHtml += `<div class="time-slot-label" style="height: ${slotHalfHourHeight}px; line-height: ${slotHalfHourHeight}px;">${label}</div>`;
        }
        bodyHtml += `</div>`;

        // Day Columns
        visibleDays.forEach((d) => {
            const dateIso = this.formatDateIso(d);
            const isToday = dateIso === todayIso;

            bodyHtml += `<div class="day-grid-column ${isToday ? 'today' : ''}" data-date="${dateIso}">`;
            
            // Grid background hour lines
            for (let h = 7.5; h < 20.5; h += 0.5) {
                const hour = Math.floor(h);
                const min = h % 1 === 0 ? '00' : '30';
                const timeStr = `${String(hour).padStart(2, '0')}:${min}`;
                bodyHtml += `<div class="hour-line" data-time="${timeStr}" style="height: ${slotHalfHourHeight}px;" title="Cliquer pour ajouter un RDV"></div>`;
            }

            // Render Events for this day
            const dayEvents = this.events.filter(e => e.date === dateIso);
            dayEvents.forEach(evt => {
                const [eh, em] = (evt.time || '10:00').split(':').map(Number);
                const eventHour = eh + (em / 60);
                const topPos = (eventHour - this.startHour) * this.pixelsPerHour;
                const durMin = Number(evt.duration) || 60;
                const heightPos = (durMin / 60) * this.pixelsPerHour - 2;

                const catBg = evt.colorBg || '#E8EAF6';
                const catBorder = evt.colorBorder || '#5F9EA0';
                const catText = evt.colorText || '#1F383E';

                // Calcul de l'heure de fin exacte
                const totalEndMin = eh * 60 + em + durMin;
                const endH = String(Math.floor(totalEndMin / 60) % 24).padStart(2, '0');
                const endM = String(totalEndMin % 60).padStart(2, '0');
                const timeLabel = `${evt.time} – ${endH}:${endM}`;

                bodyHtml += `
                    <div class="event-block" 
                         draggable="true" 
                         data-id="${evt.id}" 
                         title="${timeLabel} | ${evt.clientName || 'Client'} | ${evt.serviceName || ''}"
                         style="top: ${topPos}px; height: ${heightPos}px; background-color: ${catBg}; border-left-color: ${catBorder}; color: ${catText};">
                        <div class="event-time">${timeLabel}</div>
                        <div class="event-client">${evt.clientName || 'Client'}</div>
                        <div class="event-service">${evt.serviceName || 'Prestation'}</div>
                    </div>
                `;
            });

            // Render Blocked Slots for this day
            const dayBlocked = this.blockedSlots.filter(b => b.date === dateIso);
            dayBlocked.forEach(blk => {
                const [bh, bm] = (blk.time || '12:00').split(':').map(Number);
                const blockHour = bh + (bm / 60);
                const topPos = (blockHour - this.startHour) * this.pixelsPerHour;
                const heightPos = ((Number(blk.duration) || 60) / 60) * this.pixelsPerHour - 2;

                bodyHtml += `
                    <div class="event-block blocked-time" 
                         data-id="${blk.id}" 
                         title="${blk.time} - ${blk.reason || 'Indisponible'}"
                         style="top: ${topPos}px; height: ${heightPos}px;">
                        <div class="event-time">${blk.time} - ${blk.reason || 'Indisponible'}</div>
                    </div>
                `;
            });

            bodyHtml += `</div>`;
        });

        bodyHtml += `</div></div>`;

        this.container.innerHTML = `<div class="calendar-grid-wrapper">${headerHtml}${bodyHtml}</div>`;
        this.attachEventListeners();

        // Auto-scroll horizontal vers Aujourd'hui si en vue Semaine sur mobile
        if (this.viewMode === 'week' && window.innerWidth <= 768) {
            setTimeout(() => {
                const todayCol = this.container.querySelector('.day-grid-column.today');
                const scrollWrapper = this.container.querySelector('.calendar-grid-wrapper');
                if (todayCol && scrollWrapper) {
                    const scrollLeft = todayCol.offsetLeft - 50;
                    if (scrollLeft > 0) {
                        scrollWrapper.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                    }
                }
            }, 60);
        }
    }

    attachEventListeners() {
        // Click on hour slot to add event
        this.container.querySelectorAll('.hour-line').forEach(slot => {
            slot.addEventListener('click', () => {
                const column = slot.closest('.day-grid-column');
                const date = column.getAttribute('data-date');
                const time = slot.getAttribute('data-time');
                this.onSlotClick({ date, time });
            });
        });

        // Click on event block to open details
        this.container.querySelectorAll('.event-block').forEach(block => {
            block.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = block.getAttribute('data-id');
                this.onEventClick(id);
            });
        });

        // Setup Drag and Drop
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        const blocks = this.container.querySelectorAll('.event-block');
        const columns = this.container.querySelectorAll('.day-grid-column');

        blocks.forEach(block => {
            block.addEventListener('dragstart', (e) => {
                this.draggedEvent = block.getAttribute('data-id');
                block.classList.add('dragging');
                e.dataTransfer.setData('text/plain', this.draggedEvent);
            });

            block.addEventListener('dragend', () => {
                block.classList.remove('dragging');
                this.draggedEvent = null;
                columns.forEach(c => c.classList.remove('drag-over'));
            });
        });

        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                column.classList.add('drag-over');
            });

            column.addEventListener('dragleave', () => {
                column.classList.remove('drag-over');
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                column.classList.remove('drag-over');
                if (!this.draggedEvent) return;

                const targetDate = column.getAttribute('data-date');
                const rect = column.getBoundingClientRect();
                const offsetY = e.clientY - rect.top;
                
                // Calcul de la tranche horaire la plus proche (au quart d'heure près)
                const hourOffset = offsetY / this.pixelsPerHour;
                const targetHourDec = this.startHour + hourOffset;
                const roundedHour = Math.floor(targetHourDec);
                const roundedMin = Math.round((targetHourDec - roundedHour) * 4) * 15;
                
                let finalH = roundedHour;
                let finalM = roundedMin;
                if (finalM >= 60) {
                    finalH += 1;
                    finalM = 0;
                }
                
                const timeStr = `${String(Math.max(7, Math.min(20, finalH))).padStart(2, '0')}:${String(finalM).padStart(2, '0')}`;
                this.onEventDrop(this.draggedEvent, targetDate, timeStr);
            });
        });
    }
}

// Exposer sur l'objet global
window.ProCalendar = ProCalendar;
