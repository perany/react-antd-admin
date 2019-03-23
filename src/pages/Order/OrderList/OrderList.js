import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Table} from 'antd';
import {Link} from 'react-router-dom'
import styles from './OrderList.module.less'
import moment from "moment";

@observer
class OrderList extends Component {

    constructor(props) {
        super(props)
        console.log("sub props-->", this.props)
    }

    render() {
        const {pageChange, list, pageSize,total} = this.props
        const columns = [
            {
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
                    // console.log("tag", tags)
                    return <div
                        className={tags === 1 ? styles.done : styles.todo}>{tags === 1 ? '处理完成' : '待处理'}</div>;
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
                    // console.log("link", tags);
                    return <Link to={`/app/order/detail/${tags}`}> {'详情'}</Link>;
                }
            }
        ]
        let dataSource = []

        list.forEach((item, i) => {
                dataSource.push({
                    'key': item.id,
                    'orderid': item.id,
                    'uid': item.user_id,
                    'type': item.type,
                    'title': item.title,
                    'feedback': moment(parseInt(item.created_at)).format('YYYY-MM-DD hh:mm:ss'),
                    'status': item.status,
                    'resolver': item.customer_service,
                    'resolveTime': moment(parseInt(item.updated_at)).format('YYYY-MM-DD hh:mm:ss'),
                    'detail': item.id
                })
            }
        )

        const pagination = {
            pageSize: pageSize,
            showTotal: (total) => {
                return <div>共{total}条记录，每页{pagination.pageSize}条，共{Math.ceil(total / pagination.pageSize)}页</div>
            },
            showQuickJumper: true,
            onChange: (page, pageSize) => {
                pageChange(pageSize, page);
            },
            total:total
        };

        return (
            <Table pagination={pagination} columns={columns} dataSource={dataSource}
                   className={styles.table}/>
        )
    }
}

export default OrderList