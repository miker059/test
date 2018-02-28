/***
 * Работа с LocalStorage
 */
export default {
    /***
     * Получение массива объектов по префиксу
     */
    getObjects () {
        let arrRec = []
        let count = localStorage.length
        let reg = new RegExp('date:\\d{8}')
        console.log(reg)
        if(count > 0) {
            for (let i = 0; i < count; i++){
                if(reg.test(localStorage.key(i))) arrRec.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
            }
        }
        return arrRec
    },
    /***
     * Добавление записи в LocalStorage
     */
    setObject(obj = {}){
        if(this.isEmpty(obj)) return false
        let key = 'date:'+(String(obj.day).length === 1 ? '0' + obj.day: obj.day) + (String(obj.month).length === 1 ? '0' + obj.month: obj.month) + obj.year
        localStorage.setItem(key, JSON.stringify(obj))
    },
    isEmpty(obj) {
        for (let key in obj) {
            return false
        }
        return true;
    }
}
