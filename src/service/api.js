import request from '../utils/request'

require('../mock/mock')

export default {
    login: (data, config) => request.post('login', {data, ...config}),
    // 工单列表
    orderList: (data, config) => request.get('cs/feedback/list', {data, ...config}),
    // 获取所有问题类型
    questionTypeList: (data, config) => request.get('cs/feedback-type/all', {data, ...config}),
    // 工单详情
    orderDetail: (data, config) => request.get('cs/feedback/info', {data, ...config}),
    // 工单回复
    reply: (data, config) => request.post('cs/feedback/reply', {data, ...config}),
    // 获取工单快速回复选项
    fastReplyOptions: (data, config) => request.get('cs/quick-type/all', {data, ...config}),
    // 获取快速回复列表
    fastReplyList: (data, config) => request.get('cs/quick-type/list', {data, ...config}),
}