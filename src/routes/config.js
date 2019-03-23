import React from 'react'
import Loadable from 'react-loadable'
import {Loader} from '../components'


//组件懒加载
let componentObj = {};

const loading = (props) => {
    if (props.pastDelay) {
        return <Loader/>
    }
    return null
}

const componentConfig = [{
    name: 'Email',
    path: 'Email/Email',
}, {
    name: 'Order',
    path: 'Order/Order',
},{
    name: 'OrderDetail',
    path: 'OrderDetail/OrderDetail',
},{
    name: 'FastReply',
    path: 'FastReply/FastReply',
},{
    name: 'Account',
    path: 'Account/Account',
}];

componentConfig.forEach((item, i) => {
    componentObj[item.name] = Loadable({
        loading,
        loader: () => import('../pages/' + item.path)
    })
});

// 路由菜单配置
const componentMenuConfig = [
    {
        key: '/app/order',
        title: 'Order',
        root: true,
        zhTitle: '工单处理',
        icon: '\ue649',
        component: componentObj['Order']
    },
    {
        key: '/app/user',
        title: 'Users',
        root: true,
        zhTitle: '邮件处理',
        icon: '\ue64c',
        component: componentObj['Email']
    },
    {
        key: '/app/order/detail/:id',
        title: 'details',
        root: false,
        zhTitle: '工单详情',
        icon: '\ue649',
        component: componentObj['OrderDetail']
    },
    {
        key: '/app/reply',
        title: 'Users',
        root: true,
        zhTitle: '快速回复设置',
        icon: '\ue64a',
        component: componentObj['FastReply']
    },
    {
        key: '/app/account',
        title: 'Users',
        root: true,
        zhTitle: '账户设置',
        icon: '\ue64b',
        component: componentObj['Account']
    }
];

export default componentMenuConfig
