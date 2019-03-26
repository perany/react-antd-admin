import React, {Component} from 'react'
import {Row} from 'antd'
import styles from './OrderDetail.module.less'
import Back from './../../components/Back/Back'
import Title from "../../components/Title/Title";
import moment from "moment";
import Reply from "./Reply/Reply";


class OrderDetail extends Component {

    constructor(props) {
        super(props);
        console.log(1, this.props)
    }

    state = {
        id: '',
        title: '',
        email: '',
        contact: '',
        feedbackTime: '',
        uid: '',
        type: null,
        app: '',
        status: 0,
        description: '',
        resolver: '',
        resolveTime: '',
        resolveDesc: ''
    }

    componentDidMount() {
        console.log(2, this.props)
        this.setState({
            id: this.props.match.params.id
        });
        this.getOrderInfo();
    }

    getOrderInfo = async () => {
        const {params} = this.props.match;
        Api.orderDetail({id: params.id}).then((res) => {
            if (res.data) {
                this.setState({
                    id: res.data.id,
                    title: res.data.title,
                    email: 'korea muscle man@gmail.com',  //todo 邮箱账户 用户信息接口
                    contact: res.data.contact,
                    feedbackTime: res.data.created_at,
                    uid: res.data.user_id,
                    type: res.data.type,    //todo 类型展示文字  全局遍历
                    app: res.data.appid,    //todo 应用名称 应用信息接口
                    status: res.data.status,
                    description: res.data.description,
                    resolver: res.data.customer_service,
                    resolveTime: res.data.updated_at,
                    resolveDesc: res.data.reply
                });
            }
        });
    }

    renderSolvedReply = () => {
        return (<div className={styles.feedbackCon}>
            <Row>
                <span>处理人：{this.state.resolver}</span>
            </Row>
            <Row>
                <span>处理时间：{moment(parseInt(this.state.resolveTime)).format('YYYY-MM-DD hh:mm:ss')}</span>
            </Row>
            <Row>
                {this.state.resolveDesc}
            </Row>
        </div>)
    }

    render() {
        return (
            <div className={styles.orderDetail}>
                <Back/>
                <div className={styles.con}>
                    <Title title={"用户反馈"}/>
                    <div className={styles.feedbackCon}>
                        <div className={styles.title}>{this.state.title}</div>
                        <Row>
                            <span>邮箱账户：{this.state.email}</span>
                            <span>联系方式：{this.state.contact}</span>
                        </Row>
                        <Row>
                            <span>反馈时间：{moment(parseInt(this.state.feedbackTime)).format('YYYY-MM-DD hh:mm:ss')}</span>
                            <span>UID：{this.state.uid}</span>
                        </Row>
                        <Row>
                            <span>问题类型：{this.state.type}</span>
                            <span>应用名称：{this.state.app}</span>
                        </Row>
                        <Row>
                            <span>状态：<span
                                className={this.state.status === 1 ? styles.done : styles.todo}>{this.state.status === 1 ? '处理完成' : '待处理'}</span></span>
                        </Row>
                        <Row>
                            <div>{this.state.description}</div>
                        </Row>
                    </div>
                </div>
                <div className={styles.con}>
                    <Title title={"客服回复"}/>
                    {this.state.status === 1 ? this.renderSolvedReply() : <Reply id={this.state.id}/>}
                </div>
            </div>
        )
    }
}

export default OrderDetail