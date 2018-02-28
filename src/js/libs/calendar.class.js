import data from './data'

/***
 * Класс календаря
 */
class Calendar {
    constructor(config){
        this.data = data;
        this.currentDate = new Date();
        this.records = []
        this.config = Object.assign({
            el: 'calendar',
            month: this.currentDate.getMonth(),
            year: this.currentDate.getFullYear()
        }, config);
        if(document.getElementById(this.config.el).length === 0) {
            let el = document.createElement('div');
            el.setAttribute('id', this.config.el);
            el.classList.add(this.config.el);
            document.body.appendChild(el)
        }
        this.container = document.getElementById(this.config.el);
        this.table = document.createElement('div');
        this.table.classList.add(this.config.el + '__table');
        this.controls = document.createElement('div');
        this.controls.classList.add(this.config.el + '__controls');
        this.container.appendChild(this.controls);
        this.container.appendChild(this.table)
    }

    /***
     * Отрисовка всех элементов на страницу
     */
    draw(store, callback){
        this.records = store ? store : this.records;
        this.drawControls();
        this.drawCalendar();
        if (callback) callback()
    }

    /***
     * Формирование таблицы календаря
     */
    drawCalendar(){
        let conf = this.config;
        let elem = this.table;
        let selDate = new Date(conf.year, conf.month);
        let rows = 0;
        let cellClass = '';
        let table = '<div class="table"><div class="table__row">';
        let dayNames = window.outerWidth > 768 ? this.data.daysName : this.data.daysNameSm
        for (let i = 0; i < Calendar.weekday(selDate); i++) {
            table += `<div class="table__cell  table__cell_empty">${dayNames[i]}</div>`
        }
        while (selDate.getMonth() === conf.month) {
            let event = {};
            if (selDate.getMonth() === this.currentDate.getMonth() && selDate.getDate() === this.currentDate.getDate()) cellClass = 'active';
            else cellClass = '';
            this.records.forEach((item) => {
                if (item.day == selDate.getDate() && item.month == selDate.getMonth() && item.year == selDate.getFullYear()){
                    cellClass = cellClass + ' event';
                    event = item
                }
            });
            table += `
                <div class="table__cell ${cellClass}"
                    data-day="${selDate.getDate()}" 
                    data-month="${selDate.getMonth()}" 
                    data-year="${selDate.getFullYear()}"
                    data-name="${event.name ? event.name : ''}"
                    data-participants="${event.participants ? event.participants : ''}"
                    data-desc="${event.description ? event.description : ''}">
                    <p class="date">${rows === 0 ? dayNames[Calendar.weekday(selDate) % 7]+', '+selDate.getDate(): selDate.getDate()}</p>
                    <p class="name"><b>${event.name ? (event.name.length > 13 ? event.name.substr(0, 13) + '...' : event.name) : ''}</b></p>
                    <p class="participants">${event.participants ? (event.participants.length > 30 ? event.participants.substr(0, 30) + '...' : event.participants) : ''}</p>
                    <span class="js-add-event"></span>
                </div>`;
            if (Calendar.weekday(selDate) % 7 === 6) {
                table += `</div><div class="table__row">`;
                rows++
            }

            selDate.setDate(selDate.getDate() + 1)
        }

        if (Calendar.weekday(selDate) !== 0) {
            for (let i = Calendar.weekday(selDate); i < 7; i++) {
                table += `<div class="table__cell table__cell_empty"></div>`
            }
        }
        table += '</div></div>';
        elem.innerHTML = table
    }

    /***
     * Формирование элементов управления
     */
    drawControls(){
        let conf = this.config;
        let elem = this.controls;
        elem.innerHTML = `<button class="btn btn__default btn__sm js-prev">&#9668;</button><span>${this.data.monthName[conf.month]}, ${conf.year}</span><button class="btn btn__default btn__sm js-next">&#9658;</button><button class="btn btn__default btn__sm js-today">Сегодня</button>`
    }

    /***
     * Методы событий
     */
    prevMonth(callback){ // Месяц назад
        let conf = this.config;
        if(conf.month === 0) {
            conf.month = 11;
            conf.year--
        }else conf.month--;
        this.draw()
        if (callback) callback()
    }
    nextMonth(callback){ // Месяц вперед
        let conf = this.config;
        if(conf.month === 11) {
            conf.month = 0;
            conf.year++
        }else conf.month++;
        this.draw()
        if (callback) callback()
    }
    toToday(callback){ // Текущий месяц
        let conf = this.config;
        conf.month = this.currentDate.getMonth();
        conf.year = this.currentDate.getFullYear();
        this.draw()
        if (callback) callback()
    }

    /***
     * Вспомогательные методы: День недели
     * @param date
     * @returns {number}
     */
    static weekday (date) {
        let day = date.getDay();
        if (day === 0) day = 7;
        return day - 1
    }
}

export default Calendar