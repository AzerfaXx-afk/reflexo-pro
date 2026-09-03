/**
 * CALENDAR ENGINE FOR STÉPHANIE PRO
 * Agenda hebdomadaire interactif avec Drag & Drop et support tactile
 */

class ProCalendar {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.currentDate = new Date();
        this.currentWeekStart = this.getMonday(new Date());
        this.onEventClick = options.onEventClick || (() => {});
        this.onEventDrop = options.onEventDrop || (() => {});
        this.onSlotClick = options.onSlotClick || (() => {});
        
        this.startHour = 7.5; // 07h30
        this.endHour = 20.5;   // 20h30
        
        // Niveaux de zoom fluide
        this.zoomLevels = [
            { level: 75, pixelsPerHour: 45, label: '75%' },
            { level: 100, pixelsPerHour: 60, label: '100%' },
            { level: 125, pixelsPerHour: 75, label: '125%' },
            { level: 150, pixelsPerHour: 90, label: '150%' }
        ];
        this.currentZoomIndex = 1; // 100%
        this.pixelsPerHour = this.zoomLevels[this.currentZoomIndex].pixelsPerHour;
        this.draggedEvent = null;

        this.init();
    }

    zoomIn() {
        if (this.currentZoomIndex < this.zoomLevels.length - 1) {
            this.currentZoomIndex++;
            this.applyZoom();
        }
    }

    zoomOut() {
        if (this.currentZoomIndex > 0) {
            this.currentZoomIndex--;
            this.applyZoom();
        }
    }

    applyZoom() {
        this.pixelsPerHour = this.zoomLevels[this.currentZoomIndex].pixelsPerHour;
        const badge = document.getElementById('calZoomBadge');
        if (badge) badge.textContent = this.zoomLevels[this.currentZoomIndex].label;
        this.render(this.events, this.blockedSlots);
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
        this.render();
    }

    prevWeek() {
        this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
        this.render();
    }

    nextWeek() {
        this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
        this.render();
    }

    today() {
        this.currentWeekStart = this.getMonday(new Date());
        this.render();
    }

    getWeekDays() {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(this.currentWeekStart);
            d.setDate(d.getDate() + i);
            days.push(d);
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

        const weekDays = this.getWeekDays();
        const todayIso = this.formatDateIso(new Date());
        
        // Update Title Label if element exists
        const titleEl = document.getElementById('calendarPeriodTitle');
        if (titleEl) {
            const startMonth = weekDays[0].toLocaleDateString('fr-FR', { month: 'short' });
            const endMonth = weekDays[6].toLocaleDateString('fr-FR', { month: 'short' });
            const year = weekDays[6].getFullYear();
            titleEl.textContent = `${weekDays[0].getDate()} ${startMonth} - ${weekDays[6].getDate()} ${endMonth} ${year}`;
        }

        const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

        // Header Days
        let headerHtml = `<div class="calendar-header-days">
            <div class="day-col-header" style="background: var(--bg-light); border-right: 1px solid rgba(0,0,0,0.05);"></div>`;

        weekDays.forEach((d, idx) => {
            const isToday = this.formatDateIso(d) === todayIso;
            headerHtml += `
                <div class="day-col-header ${isToday ? 'today' : ''}" data-date="${this.formatDateIso(d)}">
                    <div class="day-name">${dayNames[idx]}.</div>
                    <div class="day-number">${d.getDate()}</div>
                </div>
            `;
        });
        headerHtml += `</div>`;

        // Body with Time Axis & Columns
        let bodyHtml = `<div class="calendar-body-scroll"><div class="calendar-grid-body">`;

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

        // 7 Day Columns
        weekDays.forEach((d) => {
            const dateIso = this.formatDateIso(d);
            const isToday = dateIso === todayIso;

            bodyHtml += `<div class="day-grid-column ${isToday ? 'today' : ''}" data-date="${dateIso}">`;
            
            // Grid background hour lines
            for (let h = 7.5; h < 20.5; h += 0.5) {
                const hour = Math.floor(h);
                const min = h % 1 === 0 ? '00' : '30';
                const timeStr = `${String(hour).padStart(2, '0')}:${min}`;
                bodyHtml += `<div class="hour-line" data-time="${timeStr}" style="height: ${slotHalfHourHeight}px;" title="Cliquez pour ajouter un RDV"></div>`;
            }

            // Render Events for this day
            const dayEvents = this.events.filter(e => e.date === dateIso);
            dayEvents.forEach(evt => {
                const [eh, em] = evt.time.split(':').map(Number);
                const eventHour = eh + (em / 60);
                const topPos = (eventHour - this.startHour) * this.pixelsPerHour;
                const heightPos = (evt.duration / 60) * this.pixelsPerHour - 2;

                const catBg = evt.colorBg || '#E8EAF6';
                const catBorder = evt.colorBorder || '#5F9EA0';
                const catText = evt.colorText || '#1F383E';

                bodyHtml += `
                    <div class="event-block" 
                         draggable="true" 
                         data-id="${evt.id}" 
                         style="top: ${topPos}px; height: ${heightPos}px; background-color: ${catBg}; border-left-color: ${catBorder}; color: ${catText};">
                        <div class="event-time">${evt.time} (${evt.duration}m)</div>
                        <div class="event-client">${evt.clientName || 'Client'}</div>
                        <div class="event-service">${evt.serviceName || 'Prestation'}</div>
                    </div>
                `;
            });

            // Render Blocked Slots for this day
            const dayBlocked = this.blockedSlots.filter(b => b.date === dateIso);
            dayBlocked.forEach(blk => {
                const [bh, bm] = blk.time.split(':').map(Number);
                const blockHour = bh + (bm / 60);
                const topPos = (blockHour - this.startHour) * this.pixelsPerHour;
                const heightPos = (blk.duration / 60) * this.pixelsPerHour - 2;

                bodyHtml += `
                    <div class="event-block blocked-time" 
                         data-id="${blk.id}" 
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
    }

    attachEventListeners() {
        // Click on hour slot to add event
        this.container.querySelectorAll('.hour-line').forEach(slot => {
            slot.addEventListener('click', (e) => {
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
                const eventId = block.getAttribute('data-id');
                const isBlocked = block.classList.contains('blocked-time');
                this.onEventClick(eventId, isBlocked);
            });

            // Drag & Drop
            block.addEventListener('dragstart', (e) => {
                this.draggedEvent = block.getAttribute('data-id');
                e.dataTransfer.setData('text/plain', this.draggedEvent);
                e.dataTransfer.effectAllowed = 'move';
                block.style.opacity = '0.4';
            });

            block.addEventListener('dragend', () => {
                block.style.opacity = '1';
                this.container.querySelectorAll('.day-grid-column').forEach(col => col.classList.remove('drag-over'));
            });
        });

        // Drop Targets (Day columns)
        this.container.querySelectorAll('.day-grid-column').forEach(col => {
            col.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                col.classList.add('drag-over');
            });

            col.addEventListener('dragleave', () => {
                col.classList.remove('drag-over');
            });

            col.addEventListener('drop', (e) => {
                e.preventDefault();
                col.classList.remove('drag-over');
                const eventId = e.dataTransfer.getData('text/plain') || this.draggedEvent;
                if (!eventId) return;

                const rect = col.getBoundingClientRect();
                const scrollContainer = this.container.querySelector('.calendar-body-scroll');
                const scrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
                const offsetY = e.clientY - rect.top + scrollTop;

                // Calculate snapped time (30 min increments)
                const hoursFromTop = offsetY / this.pixelsPerHour;
                const rawHour = this.startHour + hoursFromTop;
                
                // Snap to nearest 30 or 15 mins
                const snappedHour = Math.floor(rawHour);
                const remainderMin = (rawHour - snappedHour) * 60;
                let snappedMin = remainderMin < 15 ? 0 : (remainderMin < 45 ? 30 : 0);
                let finalHour = snappedHour;
                if (remainderMin >= 45) finalHour += 1;

                const newTime = `${String(Math.min(20, Math.max(7, finalHour))).padStart(2, '0')}:${String(snappedMin).padStart(2, '0')}`;
                const newDate = col.getAttribute('data-date');

                this.onEventDrop(eventId, newDate, newTime);
            });
        });
    }
}
