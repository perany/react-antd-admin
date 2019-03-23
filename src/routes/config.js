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
    name: 'Users',
    path: 'Users/Users',
}, {
    name: 'Order',
    path: 'Order/Order',
},{
    name: 'OrderDetail',
    path: 'OrderDetail/OrderDetail',
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
        component: componentObj['Users']
    },
    {
        key: '/app/order/detail/:id',
        title: 'details',
        root: false,
        zhTitle: '工单详情',
        icon: '\ue649',
        component: componentObj['OrderDetail']
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
];

export default componentMenuConfig
