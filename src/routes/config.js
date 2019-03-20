import React from 'react'
import Loadable from 'react-loadable'
import {Loader} from '../components'

const loading = (props) => {
    if (props.pastDelay) {
        return <Loader/>
    }
    return null
}

const Users = Loadable({
    loading,
    loader: () => import('../pages/Users/Users')
})
const Order = Loadable({
    loading,
    loader: () => import('../pages/Order/Order')
})

export default [
    {
        key: '/app/order',
        title: 'Order',
        zhTitle: '工单处理',
        icon: 'Order',
        component: Order
    },
    {
        key: '/app/user',
        title: 'Users',
        zhTitle: '邮件处理',
        icon: 'user',
        component: Users
    },
    // {
    //     key: '/app/user',
    //     title: 'Users',
    //     zhTitle: '快速回复设置',
    //     icon: 'user',
    //     component: Users
    // },
    // {
    //     key: '/app/user',
    //     title: 'Users',
    //     zhTitle: '账户设置',
    //     icon: 'user',
    //     component: Users
    // }
]
