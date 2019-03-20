import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styles from './Order.module.less'
import {Button, Form, Input, Row, Select} from 'antd';
import OrderList from './OrderList/OrderList'

@observer
@Form.create({name: 'order'})
class Order extends Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            console.log("-->", values)
        });
    }

    statusSelectChange = (value) => {
        // console.log(`selected status ${value}`);
    }

    typeSelectChange = (value) => {
        // console.log(`selected type ${value}`);
    }

    //重置表单
    resetForm = () => {
        console.log(`重置表单`);
    }

    render() {
        const Option = Select.Option;
        const {getFieldDecorator,resetFields} = this.props.form;
        // resetFields();
        return (
            <div className={styles.order}>
                <div className={styles.titleCon}>
                    <span>工单列表</span>
                </div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Row>
                        <Form.Item label="单号：">
                            {getFieldDecorator('orderid', {
                                rules: [{required: false}],
                            })(
                                <Input placeholder="请输入"/>
                            )}
                        </Form.Item>
                        <Form.Item label="标题：">
                            {getFieldDecorator('title', {
                                rules: [{required: false}],
                            })(
                                <Input placeholder="请输入关键字"/>
                            )}
                        </Form.Item>
                        <Form.Item label="UID：">
                            {getFieldDecorator('uid', {
                                rules: [{required: false}],
                            })(
                                <Input placeholder="请输入"/>
                            )}
                        </Form.Item>
                    </Row>
                    <Row className={styles.mt5}>
                        <Form.Item label="状态：">
                            {getFieldDecorator('status', {
                                rules: [{required: false}],
                                initialValue:'s0'
                            })(
                                <Select placeholder={"请选择"} style={{width: 250}} onChange={this.statusSelectChange}>
                                    <Option value="s0">状态1</Option>
                                    <Option value="s1" disabled>状态2</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="问题类型：">
                            {getFieldDecorator('type', {
                                rules: [{required: false}],
                                initialValue:'t0'
                            })(
                                <Select placeholder={"请选择"} style={{width: 250}} onChange={this.typeSelectChange}>
                                    <Option value="t0">请选择</Option>
                                    <Option value="t1">类型1</Option>
                                    <Option value="t2">类型2</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={resetFields}>
                                重置
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
                <OrderList/>
            </div>
        )
    }
}

export default Order