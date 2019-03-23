import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Table} from 'antd';
import {Link} from 'react-router-dom'
import styles from './ReplyList.module.less'
import moment from "moment";

@observer
class ReplyList extends Component {

    constructor(props) {
        super(props)
        console.log("sub props-->", this.props)
    }

    render() {
        const {pageChange, list, pageSize,total} = this.props
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
            }, {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
            }, {
                title: '内容',
                dataIndex: 'content',
                key: 'content',
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
                title: '操作人',
                dataIndex: 'resolver',
                key: 'resolver',
            }, {
                title: '操作',
                dataIndex: 'modify',
                key: 'modify',
                render: tags => {
                    // console.log("link", tags);
                    return <Link to={`/app/order/detail/${tags}`}> {'编辑'}</Link>;
                }
            }
        ]
        let dataSource = []

        list.forEach((item, i) => {
                dataSource.push({
                    'key': item.id,
                    'id': item.id,
                    'type': item.type,
                    'title': item.title,
                    'content': item.content,
                    'status': item.status,
                    'resolver': item.customer_service,
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

export default ReplyList