class Calendar {
    constructor(config){
        this.currentDate = new Date()
        this.config = Object.assign({
            el: 'body',
            month: this.currentDate.getMonth(),
            year: this.currentDate.getFullYear(),
            daysName: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение']
        }, config)

    }

    drawCalendar(){
        let conf = this.config
        let elem = document.querySelector(conf.el)
        let selDate = new Date(conf.year, conf.month)
        let rows = 0
        let cellClass = ''
        let table = '<div class="table"><div class="table__row">'

        for (let i = 0; i < Calendar.myGetDay(selDate); i++) {
            table += `<div class="table__cell">${this.config.daysName[i]}</div>`
        }

        while (selDate.getMonth() === conf.month) {
            if (selDate.getMonth() === this.currentDate.getMonth() && selDate.getDate() === this.currentDate.getDate()) cellClass = 'active'
            else cellClass = ''
            table += `<div class="table__cell ${cellClass}">${rows === 0 ? this.config.daysName[Calendar.myGetDay(selDate) % 7]+', '+selDate.getDate(): selDate.getDate()}</div>`
            if (Calendar.myGetDay(selDate) % 7 === 6) { // вс, последний день - перевод строки
                table += `</div><div class="table__row">`
                rows++
            }

            selDate.setDate(selDate.getDate() + 1)
        }

        if (Calendar.myGetDay(selDate) !== 0) {
            for (let i = Calendar.myGetDay(selDate); i < 7; i++) {
                table += `<div class="table__cell"></div>`
            }
        }

        // закрыть таблицу
        table += '</div></div>'

        // только одно присваивание innerHTML
        elem.innerHTML = table
    }

    drawControls(){

    }

    static myGetDay (date) { // получить номер дня недели, от 0(пн) до 6(вс)
        let day = date.getDay()
        if (day === 0) day = 7
        return day - 1
    }
}

export default Calendar