import './../sass/styles.scss'
import Calendar from './libs/calendar.class'

const Cal = new Calendar({
    el:'.calendar__table'
})

Cal.drawCalendar()
