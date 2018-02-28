export default {
    windowW: window.outerWidth,
    windowH: window.outerHeight,
    showPopup(el, innerHtml){
        el = el.parentElement
        this.removePopup()
        this.elT = el.offsetTop
        this.elL = el.offsetLeft
        this.elW = el.offsetWidth
        this.elH = el.offsetHeight
        let parentEl = this. getParent(el)
        this.prW = parentEl.offsetWidth
        this.prH = parentEl.offsetHeight
        let popup = document.createElement('div')
        let arrow = document.createElement('span')
        let popupPos = this.getPosition()
        popup.classList.add('popup')
        arrow.classList.add('arrow', popupPos.arrowType)
        popup.style.left = popupPos.left
        popup.style.top = popupPos.top
        popup.style.marginLeft = popupPos.mgLeft ? popupPos.mgLeft : 'auto'
        popup.style.marginTop = popupPos.mgTop ? popupPos.mgTop : 'auto'
        arrow.style.top = popupPos.arrowTop
        popup.innerHTML = innerHtml
        popup.appendChild(arrow)
        parentEl.appendChild(popup)
        document.querySelector('#submit').addEventListener('click', () => {
            return {
                day: el.getAttribute('data-day'),
                month: el.getAttribute('data-month'),
                year: el.getAttribute('data-year'),
                name: document.getElementById('popupName').value,
                participants: document.getElementById('popupParticipants').value,
                description: document.getElementById('popupDescription').value
            }
        })
        document.querySelector('#cancel').addEventListener('click', this.removePopup)
    },
    getParent(el){
        let pos = ''
        while (pos !== 'relative') {
            el = el.parentElement
            pos = getComputedStyle(el, null).position
        }
        return el
    },
    getPosition(){
        let pos = {}
        let deltaH = 200 - this.elH / 2
        if (this.windowW > 768) {
            if (this.prW - this.elL - this.elW > 400) {
                pos.left = (this.elL + this.elW + 10) + 'px'
                pos.arrowType = 'left'
            } else {
                pos.left = (this.elL - 310) + 'px'
                pos.arrowType = 'right'
            }
            if (this.elT < deltaH) pos.top = 10
            else if (this.elT + this.elH + deltaH > this.prH) pos.top = this.prH - 410
            else pos.top = this.elT - deltaH
            pos.arrowTop = (this.elT - pos.top + this.elH / 2) + 'px'
            pos.top += 'px'
        } else {
            pos.left = '50%'
            pos.mgLeft = '-150px'
            pos.top = '50%'
            pos.mgTop = '-200px'
        }
        return pos
    },
    removePopup(){
        let els = document.querySelectorAll('.popup')
        els.forEach((item) => item.parentElement.removeChild(item))
    }
}