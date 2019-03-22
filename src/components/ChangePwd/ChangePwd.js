import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {Form, Input, Modal} from 'antd';

@inject('rootStore')
@Form.create({name: 'changepwd'})
@observer
class ChangePwd extends Component {


    constructor(props) {
        super(props);
        console.log("sub props-->", this.props)
    }

    componentDidMount(){
        this.props.form.resetFields();
    }

    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            console.log("submit -->", values);
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

    render() {
        const {rootStore,visible} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <Modal
                visible={visible}
                title="修改密码"
                width={"3.7rem"}
                cancelText={"取消"}
                okText={"提交"}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                wrapClassName={"changePwd"}
            >
                <Form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <Form.Item label="用户名：">
                        {rootStore.userInfo.name}
                    </Form.Item>
                    <Form.Item label="原密码：">
                        {getFieldDecorator('oldPwd', {
                            rules: [{required: false}],
                        })(
                            <Input placeholder="请输入原密码"/>
                        )}
                    </Form.Item>
                    <Form.Item label="新密码：">
                        {getFieldDecorator('newPwd', {
                            rules: [{required: false}],
                        })(
                            <Input type="password" placeholder="请输入新密码"/>
                        )}
                    </Form.Item>
                    <Form.Item label="新密码：">
                        {getFieldDecorator('confirmPwd', {
                            rules: [{required: false}],
                        })(
                            <Input type="password" placeholder="请再次输入新密码"/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ChangePwd