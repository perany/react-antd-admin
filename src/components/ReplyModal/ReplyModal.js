import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {Form, Input, Modal, Select, Switch} from 'antd';
import styles from "../../pages/FastReply/ReplyList/ReplyList.module.less";

@inject('rootStore')
@Form.create({name: 'replyModal'})
@observer
class replyModal extends Component {

    constructor(props) {
        super(props);
        console.log("sub props-->", this.props)
    }

    componentDidMount() {
        this.props.form.resetFields();
    }

    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            console.log("submit -->", values);
            this.props.onsubmit(values);
            // let params = {
            //     user_id: values.uid,
            //
            // };
            // Api.orderList(params).then(res => {
            //     if (res.ret === 0) {
            //         this.setState({
            //             list: res.data.list,
            //             pageSize: res.data.per_page,
            //             total: res.data.total
            //         });
            //         console.log("---->res ", res, this.state)
            //     }
            // });

        });
        this.props.onchange(false);
        this.props.form.resetFields();
    };

    handleCancel = (e) => {
        this.props.onchange(false);
        this.props.form.resetFields();
    };

    switchToggle = (checked, event) => {
        console.log(checked, event)
    }

    render() {
        const Option = Select.Option;
        const {TextArea} = Input;
        const {rootStore, visible} = this.props;
        const {getFieldDecorator,getFieldValue} = this.props.form;
        return (
            <Modal
                visible={visible}
                title={(this.props.isUpdate ? "编辑" : "新增") + "快速回复"}
                width={"6rem"}
                cancelText={"取消"}
                okText={"提交"}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                wrapClassName={"replyModal"}
            >
                <Form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <Form.Item label="类型：">
                        {getFieldDecorator('type', {
                            rules: [{required: true}],
                        })(
                            <Select placeholder={"请选择"} style={{width: 250}}>
                                {this.props.rootStore.questionType.map((item, i) => (
                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="标题：">
                        {getFieldDecorator('title', {
                            rules: [{required: true, message: '请输入标题！'}],
                        })(
                            <Input placeholder="请输入标题，限制10个字" style={{width:250}}/>
                        )}
                    </Form.Item>
                    <Form.Item label="状态：">
                        {getFieldDecorator('status', {
                            rules: [{required: true}],
                        })(
                            <div>
                                <Switch defaultChecked onClick={this.switchToggle}/>
                                <span
                                    className={getFieldValue('status') ? styles.enabled : styles.disabled}>{getFieldValue('status') ? '启用' : '禁用'}</span>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item label="内容：">
                        {getFieldDecorator('content', {
                            rules: [{required: true, message: '请输入回复内容！'}],
                            initialValue: ''
                        })(
                            <TextArea rows={12}/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default replyModal