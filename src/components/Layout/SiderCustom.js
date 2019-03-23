import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Layout, Menu, Row} from 'antd'
import PropTypes from 'prop-types'
import routes from '../../routes/config'
import {inject} from 'mobx-react'
import styles from './SiderCustom.module.less'
import config from './../../utils/config'
import IconFont from '../../components/IconFont/IconFont'

@inject('rootStore')
class SiderCustom extends Component {

    //propType类型检查器
    static propTypes = {
        collapsed: PropTypes.bool
    }

    static getDerivedStateFromProps(props, state) {
        if (props.collapsed !== state.collapsed || props.location.pathname !== SiderCustom.pathname) {
            SiderCustom.pathname = props.location.pathname
            return {
                collapsed: props.collapsed,
                ...SiderCustom.setMenuOpen(props),
            }
        }
        return null
    }

    static setMenuOpen = (props) => {
        return {
            openKey: props.collapsed ? [] : SiderCustom.openKey,
        }
    }

    static openKey = []
    static pathname = ''

    state = {
        openKey: [],
        collapsed: true
    }

    iconStyle = {
        width: '0.2rem',
        display: 'inline-block',
        marginRight: '0.2rem',
        textAlign: 'center'
    }

    componentDidMount() {
        SiderCustom.openKey = [this.props.location.parentKey] || []
        SiderCustom.pathname = this.props.location.pathname
        const state = SiderCustom.setMenuOpen(this.props)
        this.setState(state)
    }

    openMenu = v => {
        SiderCustom.openKey = v
        this.setState({
            openKey: v
        })
    }

    renderMenuItem = item => {
        const {rootStore} = this.props;
        const title = rootStore.locale !== 'en' ? item[rootStore.locale + 'Title'] || item.title : item.title;
        return (
            <Menu.Item
                key={item.key}
            >
                <Link to={(item.path || item.key) + (item.query || '')}>
                    {item.icon && <IconFont type={item.icon} style={this.iconStyle}/>}
                    <span className={styles.navItem}>{title}</span>
                </Link>
            </Menu.Item>
        )
    }

    renderSubMenu = item => {
        const {rootStore} = this.props;
        const title = rootStore.locale !== 'en' ? item[rootStore.locale + 'Title'] || item.title : item.title;
        return (
            <Menu.SubMenu
                key={item.key}
                title={
                    <>
                        {item.icon && <IconFont type={item.icon} style={this.iconStyle}/>}
                        <span className={styles.navItem}>{title}</span>
                    </>
                }>
                {item.subs.map(item => this.renderMenuItem(item))}
            </Menu.SubMenu>
        )
    }

    render() {
        const {history} = this.props;
        let selectedKeys = [];
        let query = false;
        routes.forEach((item) => {
            if (history.location.pathname.indexOf(item.key) !== -1) {
                selectedKeys.push(item.key);
                query = true;
            }
        })
        return (
            <Layout.Sider
                theme={"light"}
                width={220}
                collapsedWidth={70}
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
                className={styles.sideBar}
            >
                <Row type={"flex"} className={styles.logo}>
                    <div className={styles.titleIcon}/>
                    {config.siteName}
                </Row>
                <Menu mode='inline'
                      inlineCollapsed={this.props.collapsed}
                      selectedKeys={query ? selectedKeys : ['/app']}
                      openKeys={this.state.openKey}
                      onOpenChange={this.openMenu}>
                    {routes.map(r => r.root && (r.component ? this.renderMenuItem(r) : this.renderSubMenu(r)))}
                </Menu>
            </Layout.Sider>
        )
    }
}

export default withRouter(SiderCustom)
