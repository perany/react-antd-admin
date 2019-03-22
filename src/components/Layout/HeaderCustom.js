import React, {Component, Fragment} from 'react'
import {Avatar, Button, Form, Icon, Input, Layout, Menu, Modal, Row, Select} from 'antd'
import PropTypes from 'prop-types'
import {inject} from 'mobx-react'
import {FormattedMessage} from 'react-intl'
import styles from './HeaderCustom.module.less'

const {Header} = Layout

@inject('rootStore')
@Form.create({name: 'changepwd'})
class HeaderCustom extends Component {
    static propTypes = {
        user: PropTypes.object,
        collapsed: PropTypes.bool,
        onCollapseChange: PropTypes.func,
        onSignOut: PropTypes.func
    }

    state = { visible: false }

    handleClickMenu = (e) => {
        e.key === 'SignOut' && this.props.onSignOut()
    }

    changeLocale = (e) => {
        const {rootStore} = this.props
        rootStore.changeLocale(e.key)
    }

    // 修改密码弹窗
    showModal = ()=>{
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
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

        })
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        const {languages} = Config.i18n
        const {rootStore} = this.props
        const {getFieldDecorator, resetFields} = this.props.form;
        const currentLanguage = languages.find(
            item => item.key === rootStore.locale
        )
        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_1097054_l6xeatzamh.js',
        });
        const labelStyle = {
            'height': '0.2rem',
            'fontSize': '0.12rem',
            'fontWeight': '400',
            'color': 'rgba(153,153,153,1)',
            'lineHeight': '0.2rem',
            'marginTop': '0.15rem'
        }
        const valueStyle = {
            'height': '0.22rem',
            'fontSize': '0.14rem',
            'fontWeight': '500',
            'color': 'rgba(64,64,64,1)',
            'lineHeight': '0.22rem',
            'marginBottom': '0.05rem'
        }
        return (
            <Header className={styles.header}>
                <div
                    className={styles.button}
                    onClick={this.props.onCollapseChange}>
                    <Icon
                        className={styles.trigger}
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    />
                </div>
                <div className={styles['right-container']}>
                    <Menu
                        mode='horizontal'
                        theme='light'
                        onClick={this.handleClickMenu}
                    >
                        <Menu.SubMenu
                            key='avatar'
                            title={
                                <Fragment>
                                    <IconFont type="iconUSERtouxiangx" style={{
                                        'background': '#fff',
                                        'color': '#fff',
                                        'borderRadius': '0.17rem',
                                        'fontSize': '0.34rem',
                                        'position': 'relative',
                                        'top': '8px'
                                    }}/>
                                    <span style={{'color': '#fff'}}>{this.props.user.realName}</span>
                                </Fragment>}
                        >
                            <Menu.Item key='info' style={{'height': 'auto', 'top': '-5px'}}>
                                <div style={labelStyle}>账号：</div>
                                <div style={valueStyle}>{this.props.user.userName}</div>
                                <div style={labelStyle}>真实姓名：</div>
                                <div style={valueStyle}>{this.props.user.realName}</div>
                                <div style={labelStyle}>账户类型：</div>
                                <div style={valueStyle}>{this.props.user.role}</div>
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key='changePwd' onClick={this.showModal}>
                                <IconFont type="iconxiugaimimax"/>
                                <FormattedMessage id='intl.changePwd'/>
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key='SignOut' style={{'color': '#FC5252'}}>
                                <IconFont type="icontuichudenglux"/>
                                <FormattedMessage id='intl.signOut'/>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                    <Menu
                        mode='horizontal'
                        theme='light'
                        selectedKeys={[currentLanguage.key]}
                        onClick={this.changeLocale}>
                        <Menu.SubMenu title={<div className={styles.language}>{currentLanguage.show}</div>}>
                            {languages.map(item => (
                                <Menu.Item key={item.key}>
                                    <Avatar
                                        size='small'
                                        style={{marginRight: 8}}
                                        src={item.flag}
                                    />
                                    {item.show + " " + item.title}
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    </Menu>
                </div>
                <Modal
                    title="修改密码"
                    width={"3.7rem"}
                    visible={this.state.visible}
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
            </Header>
        )
    }
}

export default HeaderCustom
