import React, {Component} from 'react'
import {inject} from 'mobx-react'
import {message, Switch, Table} from 'antd';
import {Link} from 'react-router-dom'
import styles from './ReplyList.module.less'

@inject("rootStore")
class ReplyList extends Component {

    state = {
        dataSource: []
    };

    constructor(props) {
        super(props);
        this.setState({
            dataSource: this.initData()
        });
        console.log("sub props-->", this.props)
    }

    getTypeName = (tags) => {
        let res;
        this.props.rootStore.questionType.forEach((item) => {
            res = item.name;
            if (item.id === tags) return;
        })
        return res;
    }

    switchToggle = (checked, event, data) => {
        console.log(checked, event, data)
        data.enabled = data.enabled === 1 ? 0 : 1;
        this.updateReply({
            id: data.id,
            feedback_type: data.feedback_type,
            title: data.title,
            content: data.content,
            enabled: data.enabled
        });
    }

    updateReply = (data) => {
        Api.updateFastReply(data).then(() => {
            message.success("修改成功");
        });
    }

    initData = () => {
        let dataSource = [];
        this.props.list.forEach((item, i) => {
                item.key = i;
                dataSource.push({
                    'key': i,
                    'id': item.id,
                    'type': item.feedback_type,
                    'title': item.title,
                    'content': item.content,
                    'status': item,
                    'resolver': item.updated_by,
                    'detail': item
                });
            }
        );
        return dataSource;
    }

    render() {
        const {pageChange, pageSize, total} = this.props;
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                render: tags => {
                    return this.getTypeName(tags);
                }
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
                    console.log(tags,this.state.dataSource,this.state.dataSource[tags.key])
                    return <div>
                        <Switch defaultChecked={tags.enabled === 1} onClick={(checked, event) => {
                            this.switchToggle(checked, event, tags);
                        }}/>
                        <span
                            className={tags.enabled === 1 ? styles.enabled : styles.disabled}>{tags.enabled === 1 ? '启用' : '禁用'}</span>
                    </div>
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
        ];
        const pagination = {
            pageSize: pageSize,
            showTotal: (total) => {
                return <div>共{total}条记录，每页{pagination.pageSize}条，共{Math.ceil(total / pagination.pageSize)}页</div>
            },
            showQuickJumper: true,
            onChange: (page, pageSize) => {
                pageChange(pageSize, page);
            },
            total: total
        };

        return (
            <Table pagination={pagination} columns={columns} dataSource={this.initData()}
                   className={styles.table}/>
        )
    }
}

export default ReplyList