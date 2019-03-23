import axios from 'axios'
import loading from '../utils/loading'
import {message} from 'antd'

const axiosRequest = axios.create()

const getUrl = (url, mock) => {
    return mock ? `/local/${url}` : `/${url}`
}

let reqQueue = 0

axiosRequest.interceptors.request.use(config => {
    if (config['loading']) {
        reqQueue += 1
        loading.show()
    }
    config.url = getUrl(config.url, config['mock'])
    config.headers['Authorization'] = ''
    config.headers['Accept'] = 'application/json'
    // console.log("request data----->    ",config.data)
    return config
}, error => {
    if (error.config['loading']) {
        reqQueue -= 1
        reqQueue === 0 && loading.hide()
    }
    return Promise.reject(error)
})

axiosRequest.interceptors.response.use(response => {
    if (response.config['loading']) {
        reqQueue -= 1
        reqQueue === 0 && loading.hide()
    }
    if (response.data.ret !== 0) {
        message.error(response.data.msg)
    }
    return Promise.resolve(response.data)
}, error => {
    if (error.config['loading']) {
        reqQueue -= 1
        reqQueue === 0 && loading.hide()
    }
    return Promise.reject(error.message)
})

export default {
    get(url, config) {
        console.log(config)
        return axiosRequest({
            url,
            method: 'GET',
            loading: false,
            // params:config.data,
            ...config
        })
    },
    post(url, config) {
        return axiosRequest({
            url,
            method: 'POST',
            loading: false,
            ...config
        })
    }
}
