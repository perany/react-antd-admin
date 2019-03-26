import {action, observable} from 'mobx'
import config from '../utils/config'

const LOCALE = 'ROOTSTORE_LOCALE'

class RootStore {

    @observable userInfo = {
        id: "0001",
        name: "pengyl@kingnet.com"
    }

    @observable locale = 'en';

    @action loadLocale() {
        const dataStr = localStorage.getItem(LOCALE)
        const {languages} = config.i18n
        const langMap = languages.map(_ => _.key)
        if (langMap.includes(dataStr)) {
            this.locale = dataStr
        }
    }

    @action changeLocale(locale) {
        this.locale = locale;
        localStorage.setItem(LOCALE, locale)
    }

    @observable questionType = [];  //问题类型

    @action changeQuestionType(questionType){
        this.questionType = questionType;
    }
}

export default new RootStore()
