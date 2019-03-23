import React, {Component} from 'react'
import {observer} from 'mobx-react'
import styles from './FastReply.module.less'
import {Button, Form, Input, Row, Select} from 'antd';
import ReplyList from './ReplyList/ReplyList'

@observer
@Form.create({name: 'order'})

class FastReply extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageSize: 15,
            total: 0,
            questionType: []
        }
    }

    componentDidMount() {
        this.props.form.validateFields();
        this.getQuetionType();
    }

    // 获取问题类型下拉列表
    getQuetionType = () => {
        Api.questionTypeList().then(res => {
            if (res.ret === 0) {
                this.setState({
                    questionType: res.data
                });
            }
        });
    }

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
            Api.fastReplyList(params, {mock: true}).then(res => {
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
                                    {this.state.questionType.map((item, i) => (
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
                <ReplyList {...this.state} pageChange={this.pageChange}/>
            </div>
        )
    }
}

export default FastReply