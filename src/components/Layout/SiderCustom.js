import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Icon, Layout, Menu, Row} from 'antd'
import PropTypes from 'prop-types'
import routes from '../../routes/config'
import {inject} from 'mobx-react'
import styles from './SiderCustom.module.less'
import config from './../../utils/config'

@inject('rootStore')
class SiderCustom extends Component {

    //propType类型检查器
    static propTypes = {
        collapsed: PropTypes.bool
    }

    static getDerivedStateFromProps(props, state) {
        console.log('******getDerivedStateFromProps', props, state)
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
        const {pathname} = props.location
        return {
            openKey: props.collapsed ? [] : SiderCustom.openKey,
            selectedKey: pathname
        }
    }

    static openKey = []
    static pathname = ''

    state = {
        openKey: [],
        selectedKey: '',
        collapsed: true
    }

    componentDidMount() {
        console.log('******componentDidMount', this.props, this.state)
        SiderCustom.openKey = [this.props.location.parentKey] || []
        SiderCustom.pathname = this.props.location.pathname
        const state = SiderCustom.setMenuOpen(this.props)
        this.setState(state)
    }

    menuClick = e => {
        console.log(e, this.state, this.props)
        this.setState({
            selectedKey: e.key
        })
    }

    openMenu = v => {
        SiderCustom.openKey = v
        this.setState({
            openKey: v
        })
    }

    renderMenuItem = item => {
        const {rootStore} = this.props
        const title = rootStore.locale !== 'en' ? item[rootStore.locale + 'Title'] || item.title : item.title
        return (
            <Menu.Item
                key={item.key}
            >
                <Link to={(item.path || item.key) + (item.query || '')}>
                    {item.icon && <Icon type={item.icon}/>}
                    <span className='nav-item'>{title}</span>
                </Link>
            </Menu.Item>
        )
    }

    renderSubMenu = item => {
        const {rootStore} = this.props
        const title = rootStore.locale !== 'en' ? item[rootStore.locale + 'Title'] || item.title : item.title
        return (
            <Menu.SubMenu
                key={item.key}
                title={
                    <>
                        {item.icon && <Icon type={item.icon}/>}
                        <span className='nav-item'>{title}</span>
                    </>
                }>
                {item.subs.map(item => this.renderMenuItem(item))}
            </Menu.SubMenu>
        )
    }

    renderTrigger = (name) => {
        return (
            <div className={styles.trigger}>{name}</div>
        )
    }

    render() {
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
                    <div className={styles.titleIcon}/>{config.siteName}
                    </Row>
                <Menu mode='inline'
                      inlineCollapsed={this.props.collapsed}
                      selectedKeys={[this.state.selectedKey]}
                      openKeys={this.state.openKey}
                      onClick={this.menuClick}
                      onOpenChange={this.openMenu}>
                    {routes.map(r => r.component ? this.renderMenuItem(r) : this.renderSubMenu(r))}
                </Menu>
            </Layout.Sider>
        )
    }
}

export default withRouter(SiderCustom)
