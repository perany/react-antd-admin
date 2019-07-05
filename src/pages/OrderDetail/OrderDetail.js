import React, {Component} from 'react'
import {Row} from 'antd'
import styles from './OrderDetail.module.less'
import Back from './../../components/Back/Back'
import Title from "../../components/Title/Title";
import moment from "moment";
import Reply from "./Reply/Reply";
import {inject} from 'mobx-react'

@inject("rootStore")
class OrderDetail extends Component {

    state = {
        id: '',
        title: '',
        email: '',
        contact: '',
        feedbackTime: '',
        uid: '',
        type: null,
        typeName: '',
        app: '',
        appid: '',
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
        this.getOrderInfo(true);
    }

    getOrderInfo = (fleshAll) => {
        const {params} = this.props.match;
        Api.orderDetail({id: params.id}).then((res) => {
            if (res.data) {
                this.setState({
                    id: res.data.id,
                    title: res.data.title,
                    contact: res.data.contact,
                    feedbackTime: res.data.created_at,
                    uid: res.data.user_id,
                    type: res.data.type,
                    appid: res.data.appid,
                    status: res.data.status,
                    description: res.data.description,
                    resolver: res.data.customer_service,
                    resolveTime: res.data.updated_at,
                    resolveDesc: res.data.reply
                });
                if(fleshAll){
                    this.getUserInfo();
                    this.getAppInfo();
                    this.getTypeName();
                }
            }
        });
    }

    getTypeName = () => {
        this.props.rootStore.questionType.forEach((item) => {
            if (item.id === this.state.type) {
                this.setState({typeName: item.name});
            }
        })
    }

    getUserInfo = async () => {
        Api.userInfo({user_id: this.state.uid}).then((res) => {
            if (res.data) {
                this.setState({
                    email: res.data.email
                });
            }
        });
    }

    getAppInfo = async () => {
        Api.appInfo({appid: this.state.appid}).then((res) => {
            if (res.data) {
                this.setState({
                    app: res.data.name
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
                <span>处理时间：{moment(parseInt(this.state.resolveTime)).format('YYYY-MM-DD HH:mm:ss')}</span>
            </Row>
            <Row>
                {this.state.resolveDesc}
            </Row>
        </div>)
    }

    replySuccess = () => {
        this.getOrderInfo(false);
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
                            <span>反馈时间：{moment(parseInt(this.state.feedbackTime)).format('YYYY-MM-DD HH:mm:ss')}</span>
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
                    {this.state.status === 1 ? this.renderSolvedReply() :
                        <Reply id={this.state.id} replySuccess={this.replySuccess}/>}
                </div>
            </div>
        )
    }
}

export default OrderDetail
