import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Table} from 'antd';
import {Link} from 'react-router-dom'
import styles from './OrderList.module.less'

@observer
class OrderList extends Component {

    render() {
        const columns = [{
            title: '单号',
            dataIndex: 'orderid',
            key: 'orderid',
        }, {
            title: 'UID',
            dataIndex: 'uid',
            key: 'uid',
        }, {
            title: '问题类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '反馈时间',
            dataIndex: 'feedback',
            key: 'feedback',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: tags => {
                console.log("tag", tags)
                return <div className={tags === '1' ? styles.done : styles.todo}>{tags === '1' ? '处理完成' : '待处理'}</div>;
            }
        }, {
            title: '处理人',
            dataIndex: 'resolver',
            key: 'resolver',
        }, {
            title: '处理时间',
            dataIndex: 'resolveTime',
            key: 'resolveTime',
        }, {
            title: '详情',
            dataIndex: 'detail',
            key: 'detail',
            render: tags => {
                console.log("link", tags);
                return <Link to={"app/order"} query={{id: tags}}> {'详情'}</Link>;
            }
        }];

        const data = [{
            key: '1',
            orderid: '10001',
            uid: '0x88888888',
            type: '账户问题',
            title: '为何我的账号无法登录？',
            feedback: '2022-12-22 23:22:22',
            status: '0',
            resolver: '客服0010',
            resolveTime: '2018-11-22 11:11:11',
            detail:'10001'
        }, {
            key: '2',
            orderid: '10002',
            uid: '0x88888888',
            type: '',
            title: '为何我的账号无法登录？',
            feedback: '2022-12-22 23:22:22',
            status: '1',
            resolver: '客服0010',
            resolveTime: '2018-11-22 11:11:11',
            detail:'10002'
        }, {
            key: '3',
            orderid: '10003',
            uid: '0x88888888',
            type: '账户问题',
            title: '',
            feedback: '2022-12-22 23:22:22',
            status: '1',
            resolver: '客服0010',
            resolveTime: '2018-11-22 11:11:11',
            detail:'10003'
        }, {
            key: '4',
            orderid: '10004',
            uid: '0x88888888',
            type: '账户问题',
            title: '',
            feedback: '',
            status: '0',
            resolver: '客服0010',
            resolveTime: '2018-11-22 11:11:11',
            detail:'10004'
        }, {
            key: '5',
            orderid: '10005',
            uid: '0x88888888',
            type: '账户问题',
            title: '为何我的账号无法登录？',
            feedback: '2022-12-22 23:22:22',
            status: '0',
            resolver: '',
            resolveTime: '',
            detail:'10005'
        }];

        const pagination = {
            pageSize: 2,
            showTotal: (total) => {
                return <div>共{total}条记录，每页{pagination.pageSize}条，共{Math.round(total / pagination.pageSize)}页</div>
            },
            showQuickJumper: true
        };

        return (
            <Table pagination={pagination} columns={columns} dataSource={data}
                   className={styles.table}/>
        )
    }
}

export default OrderList