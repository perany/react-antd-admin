import {action, observable} from 'mobx'
import config from '../utils/config'

const LOCALE = 'ROOTSTORE_LOCALE'

class RootStore {
    @observable locale = 'en'
    @observable userInfo = {
        id: "0001",
        name: "pengyl@kingnet.com"
    }

    @action loadLocale() {
        const dataStr = localStorage.getItem(LOCALE)
        const {languages} = config.i18n
        const langMap = languages.map(_ => _.key)
        if (langMap.includes(dataStr)) {
            this.locale = dataStr
        }
    }

    @action changeLocale(locale) {
        this.locale = locale
        localStorage.setItem(LOCALE, locale)
    }
}

export default new RootStore()
