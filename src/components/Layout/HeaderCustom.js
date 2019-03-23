import React, {Component, Fragment} from "react"
import {Avatar, Icon, Layout, Menu} from "antd"
import PropTypes from "prop-types"
import {inject} from "mobx-react"
import {FormattedMessage} from "react-intl"
import styles from "./HeaderCustom.module.less"
import ChangePwd from "../ChangePwd/ChangePwd";
import IconFont from "../../components/IconFont/IconFont"

const {Header} = Layout;

@inject("rootStore")
class HeaderCustom extends Component {
    static propTypes = {
        user: PropTypes.object,
        collapsed: PropTypes.bool,
        onCollapseChange: PropTypes.func,
        onSignOut: PropTypes.func
    }

    state = {visible: false};

    // 退出登录
    handleLogout = (e) => {
        e.key === "SignOut" && this.props.onSignOut()
    };

    //切换语种
    changeLocale = (e) => {
        const {rootStore} = this.props;
        rootStore.changeLocale(e.key)
    };

    // 弹窗 切换可见
    onVisible = (status) => {
        this.setState({
            visible: status
        });
    };

    // 弹窗 显示
    showModal = () => {
        this.setState({
            visible: true
        });
    };

    render() {
        const {languages} = Config.i18n;
        const {rootStore} = this.props;
        const currentLanguage = languages.find(
            item => item.key === rootStore.locale
        );
        const labelStyle = {
            height: "0.2rem",
            fontSize: "0.12rem",
            fontWeight: "400",
            color: "rgba(153,153,153,1)",
            lineHeight: "0.2rem",
            marginTop: "0.15rem"
        };
        const valueStyle = {
            height: "0.22rem",
            fontSize: "0.14rem",
            fontWeight: "500",
            color: "rgba(64,64,64,1)",
            lineHeight: "0.22rem",
            marginBottom: "0.05rem"
        };
        const userIconStyle = {
            background: "#fff",
            color: "#667B99",
            borderRadius: "0.17rem",
            fontSize: "0.34rem",
            position: "relative",
            top: "8px",
            lineHeight: "0.34rem",
            marginRight: "0.1rem"
        };
        const itemIconStyle = {
            marginRight: "0.1rem",
            fontSize: "0.18rem",
            position: "relative",
            top: "0.02rem"
        }
        return (
            <Header className={styles.header}>
                <div
                    className={styles.button}
                    onClick={this.props.onCollapseChange}>
                    <Icon
                        className={styles.trigger}
                        type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
                    />
                </div>
                <div className={styles["right-container"]}>
                    <Menu
                        mode="horizontal"
                        theme="light"
                        onClick={this.handleLogout}
                    >
                        <Menu.SubMenu
                            key="avatar"
                            title={
                                <Fragment>
                                    <IconFont type={"\ue63c"} style={userIconStyle}/>
                                    <span style={{"color": "#fff"}}>{this.props.user.realName}</span>
                                </Fragment>}
                        >
                            <Menu.Item key="info" style={{"height": "auto", "top": "-5px"}}>
                                <div style={labelStyle}>账号：</div>
                                <div style={valueStyle}>{this.props.user.userName}</div>
                                <div style={labelStyle}>真实姓名：</div>
                                <div style={valueStyle}>{this.props.user.realName}</div>
                                <div style={labelStyle}>账户类型：</div>
                                <div style={valueStyle}>{this.props.user.role}</div>
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key="changePass" onClick={this.showModal}>
                                <IconFont type={"\ue633"} style={itemIconStyle}/>
                                <FormattedMessage id="intl.changePwd"/>
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key="SignOut" style={{"color": "#FC5252"}}>
                                <IconFont type={"\ue62f"} style={itemIconStyle}/>
                                <FormattedMessage id="intl.signOut"/>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                    <Menu
                        mode="horizontal"
                        theme="light"
                        selectedKeys={[currentLanguage.key]}
                        onClick={this.changeLocale}>
                        <Menu.SubMenu title={<div className={styles.language}>{currentLanguage.show}</div>}>
                            {languages.map(item => (
                                <Menu.Item key={item.key}>
                                    <Avatar
                                        size="small"
                                        style={{marginRight: 8}}
                                        src={item.flag}
                                    />
                                    {item.show + " " + item.title}
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    </Menu>
                </div>
                <ChangePwd
                    visible={this.state.visible}
                    onchange={this.onVisible}
                />
            </Header>
        )
    }
}

export default HeaderCustom
