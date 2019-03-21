import request from '../utils/request'

require('../mock/mock')

export default {
    login: (data, config) => request.post('login', {data, ...config}),
    orderList: (data, config) => request.get('cs/feedback/list', {data, ...config}),
    questionTypeList: (data, config) => request.get('cs/feedback-type/all', {data, ...config})
}