import data from './data'

export const popupForm = (el) => {
    return `
        <div class="popup__content">
            <input type="hidden" id>
            <p>${el.getAttribute('data-day')} ${data.monthNameSk[el.getAttribute('data-month')]}, ${el.getAttribute('data-year')}</p>                                            <div class="form__group">
                <input type="text" placeholder="Событие" class="form__control" id="popupName" value="${el.getAttribute('data-name') ? el.getAttribute('data-name'): ''}">
                <input type="text" placeholder="Имена частников" class="form__control" id="popupParticipants" value="${el.getAttribute('data-participants') ? el.getAttribute('data-participants'): ''}">
            </div>                                    
            <div class="form__group">
                <textarea rows="10" type="text" placeholder="Описание" class="form__control" id="popupDescription">${el.getAttribute('data-desc') ? el.getAttribute('data-desc'): ''}</textarea>
            </div>
            <div class="form__group">
                <button class="btn btn__primary" id="submit">Готово</button>            
                <button class="btn btn__default" id="cancel">Отмена</button>            
                <button class="btn btn__default" ${el.getAttribute('data-name') ? '' : 'disabled'} id="remove">Удалить</button>            
            </div>
        </div>
        `
}
