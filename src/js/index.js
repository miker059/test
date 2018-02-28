import './../sass/styles.scss'
import Calendar from './libs/calendar.class'
import LocalStore from './libs/localstorage'
import Popup from './libs/popup'
import { popupForm } from './libs/forms'

const Cal = new Calendar({
    el:'calendar'
})

const addEvents = () => {
    let addEventEls = document.querySelectorAll('.js-add-event');
    document.querySelector('.js-prev').addEventListener('click', () => Cal.prevMonth(addEvents));
    document.querySelector('.js-next').addEventListener('click', () => Cal.nextMonth(addEvents));
    document.querySelector('.js-today').addEventListener('click', () => Cal.toToday(addEvents));
    addEventEls.forEach((item) => {
        item.addEventListener('click', (event) => openPopup(event.target))
    })
}

const openPopup = (el) => {
    let innerHtml = popupForm(el.parentElement);
    Popup.showPopup(el, innerHtml)
    document.querySelector('#submit').addEventListener('click', () => {
        if (document.getElementById('popupName').value == '') {
            document.getElementById('popupName').classList.add('error')
            return
        }
        el = el.parentElement
        LocalStore.setObject({
            day: el.getAttribute('data-day'),
            month: el.getAttribute('data-month'),
            year: el.getAttribute('data-year'),
            name: document.getElementById('popupName').value,
            participants: document.getElementById('popupParticipants').value,
            description: document.getElementById('popupDescription').value
        })
        Popup.removePopup()
        Cal.draw(LocalStore.getObjects(), addEvents)
    })
    document.querySelector('#remove').addEventListener('click', () => {
        el = el.parentElement
        LocalStore.removeObject({
            day: el.getAttribute('data-day'),
            month: el.getAttribute('data-month'),
            year: el.getAttribute('data-year')
        })
        Popup.removePopup()
        Cal.draw(LocalStore.getObjects(), addEvents)
    })
}

Cal.draw(LocalStore.getObjects(), addEvents)

window.addEventListener('resize', () => {
    Cal.draw(LocalStore.getObjects(), addEvents)
})
