import React, {Component} from 'react'
import {inject} from 'mobx-react'
import styles from './FastReply.module.less'
import {Button, Form, Input, Row, Select} from 'antd';
import ReplyList from './ReplyList/ReplyList'
import ReplyModal from "../../components/ReplyModal/ReplyModal";

@inject("rootStore")
@Form.create({name: 'order'})

class FastReply extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageSize: 15,
            total: 0,
            addModelVisible:false
        }
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    // 新增按钮-弹窗切换可见
    onAddModalVisible = (status) => {
        this.setState({
            addModelVisible: status
        });
    };

    // 新增按钮-弹窗显示
    showAddModal = () => {
        this.setState({
            addModelVisible: true
        });
    };

    // 新增按钮-弹窗提交
    submitAddModal = (data) => {
        console.log("add:submit",data)
    };


    // 列表子组件分页
    pageChange = (pageSize, pageNow) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            console.log("submit -->", values);
            let params = {
                page: pageNow,
                limit: pageSize,
                feedback_type: values.type,
                title: values.title

            };
            Api.fastReplyList(params).then(res => {
                if (res.ret === 0) {
                    this.setState({
                        list: res.data.list,
                        pageSize: res.data.per_page,
                        total: res.data.total
                    });
                    console.log("---->res ", res, this.state)
                }
            });
        })
    }

    // 表单提交
    handleSubmit = (e, pageSize, pageNow) => {
        e.preventDefault()
        this.pageChange(pageSize, pageNow)
    }

    render() {
        const Option = Select.Option;
        const {getFieldDecorator, resetFields} = this.props.form;
        // resetFields();
        return (
            <div className={styles.order}>
                <div className={styles.titleCon}>
                    <span>快速回复</span>
                </div>
                <Form layout="inline" onSubmit={(e) => {
                    this.handleSubmit(e, this.state.pageSize, 1)
                }}>
                    <Row className={styles.mt5}>
                        <Form.Item label="标题：">
                            {getFieldDecorator('title', {
                                rules: [{required: false}],
                            })(
                                <Input placeholder="请输入"/>
                            )}
                        </Form.Item>
                        <Form.Item label="类型：">
                            {getFieldDecorator('type', {
                                rules: [{required: false}],
                            })(
                                <Select placeholder={"请选择"} style={{width: 250}}>
                                    {this.props.rootStore.questionType.map((item, i) => (
                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button className={styles.submit} htmlType="submit">
                                查询
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button className={styles.reset} onClick={() => {
                                resetFields()
                            }}>
                                重置
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
                <Button type="primary" className={styles.add} onClick={this.showAddModal}>+ 新增</Button>
                <ReplyModal
                    visible={this.state.addModelVisible}
                    onchange={this.onAddModalVisible}
                    onsubmit={this.submitAddModal}
                    isUpdate={false}
                />
                <ReplyList {...this.state} pageChange={this.pageChange}/>
            </div>
        )
    }
}

export default FastReply