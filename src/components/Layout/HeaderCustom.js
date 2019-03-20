import React, {Component, Fragment} from 'react'
import {Avatar, Icon, Layout, Menu} from 'antd'
import PropTypes from 'prop-types'
import {inject} from 'mobx-react'
import {FormattedMessage} from 'react-intl'
import styles from './HeaderCustom.module.less'

const {Header} = Layout

@inject('rootStore')
class HeaderCustom extends Component {
    static propTypes = {
        user: PropTypes.object,
        collapsed: PropTypes.bool,
        onCollapseChange: PropTypes.func,
        onSignOut: PropTypes.func
    }

    handleClickMenu = (e) => {
        e.key === 'SignOut' && this.props.onSignOut()
    }

    changeLocale = (e) => {
        const {rootStore} = this.props
        rootStore.changeLocale(e.key)
    }

    render() {
        const {languages} = Config.i18n
        const {rootStore} = this.props
        const currentLanguage = languages.find(
            item => item.key === rootStore.locale
        )
        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_1097054_l6xeatzamh.js',
        });
        const labelStyle = {
            'height': '0.2rem',
            'font-size': '0.12rem',
            'font-weight': '400',
            'color': 'rgba(153,153,153,1)',
            'line-height': '0.2rem',
            'margin-top': '0.15rem'
        }
        const valueStyle = {
            'height': '0.22rem',
            'font-size': '0.14rem',
            'font-weight': '500',
            'color': 'rgba(64,64,64,1)',
            'line-height': '0.22rem',
            'margin-bottom': '0.05rem'
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
                                    <IconFont type="iconUSERtouxiangx" style={{'background':'#fff','color':'#fff','border-radius':'0.17rem','font-size':'0.34rem'}}/>
                                    <span style={{'color':'#fff'}}>{this.props.user.realName}</span>
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
                            <Menu.Item key='changePwd'>
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
            </Header>
        )
    }
}

export default HeaderCustom
