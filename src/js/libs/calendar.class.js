import data from './data'

class Calendar {
    constructor(config){
        this.data = data
        this.currentDate = new Date()
        this.config = Object.assign({
            el: 'calendar',
            month: this.currentDate.getMonth(),
            year: this.currentDate.getFullYear()
        }, config)
        if(document.getElementById(this.config.el).length === 0) {
            let el = document.createElement('div')
            el.setAttribute('id', this.config.el)
            el.classList.add(this.config.el)
            document.body.appendChild(el)
        }
        this.container = document.getElementById(this.config.el)
        this.table = document.createElement('div')
        this.table.classList.add(this.config.el + '__table')
        this.controls = document.createElement('div')
        this.controls.classList.add(this.config.el + '__controls')
        this.container.appendChild(this.controls)
        this.container.appendChild(this.table)
    }

    draw(){
        this.drawControls()
        this.drawCalendar()
        this.addElEvents()
    }

    drawCalendar(){
        let conf = this.config
        let elem = this.table
        let selDate = new Date(conf.year, conf.month)
        let rows = 0
        let cellClass = ''
        let table = '<div class="table"><div class="table__row">'

        for (let i = 0; i < Calendar.myGetDay(selDate); i++) {
            table += `<div class="table__cell  table__cell_empty">${this.data.daysName[i]}</div>`
        }

        while (selDate.getMonth() === conf.month) {
            if (selDate.getMonth() === this.currentDate.getMonth() && selDate.getDate() === this.currentDate.getDate()) cellClass = 'active'
            else cellClass = ''
            table += `
                <div 
                    class="table__cell ${cellClass} js-add-event" 
                    data-day="${selDate.getDate()}" 
                    data-month="${selDate.getMonth()}" 
                    data-year="${selDate.getFullYear()}">
                        ${rows === 0 ? this.data.daysName[Calendar.myGetDay(selDate) % 7]+', '+selDate.getDate(): selDate.getDate()}
                </div>`
            if (Calendar.myGetDay(selDate) % 7 === 6) {
                table += `</div><div class="table__row">`
                rows++
            }

            selDate.setDate(selDate.getDate() + 1)
        }

        if (Calendar.myGetDay(selDate) !== 0) {
            for (let i = Calendar.myGetDay(selDate); i < 7; i++) {
                table += `<div class="table__cell table__cell_empty"></div>`
            }
        }
        table += '</div></div>'
        elem.innerHTML = table
    }

    drawControls(){
        let conf = this.config
        let elem = this.controls
        elem.innerHTML = `<button class="btn btn__default btn__sm js-prev">&#9668;</button><span>${this.data.monthName[conf.month]}, ${conf.year}</span><button class="btn btn__default btn__sm js-next">&#9658;</button><button class="btn btn__default btn__sm js-today">Сегодня</button>`
    }

    addElEvents(){
        let conf = this.config
        document.querySelector('.js-prev').addEventListener('click', () => this.prevMonth())
        document.querySelector('.js-next').addEventListener('click', () => this.nextMonth())
        document.querySelector('.js-today').addEventListener('click', () => this.toToday())
        let addEventEls = document.querySelectorAll('.js-add-event')
        addEventEls.forEach((item) => {
            item.addEventListener('click', (event) => this.addEvent(event.target))
        })
    }

    prevMonth(){
        let conf = this.config
        if(conf.month === 0) {
            conf.month = 11
            conf.year--
        }else conf.month--
        this.draw()
    }
    nextMonth(){
        let conf = this.config
        if(conf.month === 11) {
            conf.month = 0
            conf.year++
        }else conf.month++
        this.draw()
    }
    toToday(){
        let conf = this.config
        conf.month = this.currentDate.getMonth()
        conf.year = this.currentDate.getFullYear()
        this.draw()
    }

    addEvent(el){
        let conf = this.config
        console.log(el.getAttribute('data-day'))
    }

    static myGetDay (date) {
        let day = date.getDay()
        if (day === 0) day = 7
        return day - 1
    }
}

export default Calendar