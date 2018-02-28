import './../sass/styles.scss'
import Calendar from './libs/calendar.class'
import LocalStore from './libs/localstorage'

const Cal = new Calendar({
    el:'calendar'
})

Cal.draw()

console.log(LocalStore.getObjects())
LocalStore.setObject({
    day: 4,
    month: 3,
    year: 2018,
    name: 'dfddgfgds fgdgadasdad',
    participants: 'fvdfvdfv, dfvdfvdv, dfvdfvdv, dfvdfvdv, dfvdfvdv',
    description: 'dfvdfvdfvndfvndfvdf'
})