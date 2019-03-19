import React from 'react'
import Loadable from 'react-loadable'
import {Loader} from '../components'

const loading = (props) => {
    if (props.pastDelay) {
        return <Loader/>
    }
    return null
}

const Dashboard = Loadable({
    loading,
    loader: () => import('../pages/Dashboard/Dashboard')
})
const Users = Loadable({
    loading,
    loader: () => import('../pages/Users/Users')
})

export default [
    {
        key: '/app/dashboard',
        title: 'Dashboard',
        zhTitle: '工单处理',
        icon: 'dashboard',
        component: Dashboard
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
