import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Button, Input, Menu, message} from 'antd';
import IconFont from '../../../components/IconFont/IconFont'
import styles from './Reply.module.less'

@observer
class Reply extends Component {

    constructor(props) {
        super(props)
        console.log("sub props-->", this.props)
        this.state = {
            menuVisible: false,
            value: '123456'
        }
    }

    componentDidMount() {
        // 事件冒泡处理
        document.addEventListener('click', e => {
            this.setState({
                menuVisible: false
            });
        });
        // 获取快捷回复 下拉选项
        this.getFastApplyOptions();
    }

    componentWillUnmount() {
        // document.removeEventListener('click');
    }

    // 快捷回复 点击
    fastBtnClick = e => {
        e.nativeEvent.stopImmediatePropagation();
        var toggle = !this.state.menuVisible;
        this.setState({
            menuVisible: toggle
        });

    }

    // 快捷回复列表 点击
    menuItemClick = e => {
        this.setState({
            menuVisible: false
        });
    }

    // 回复 点击
    applyClick = e => {
        Api.reply({
            id: this.props.id,
            reply: '123456'
        }).then(res => {
            if (res.ret === 0) {
                message.success("您已回复成功！");
            }
        });
    }

    // 获取快捷回复 下拉选项
    getFastApplyOptions = () => {
        Api.fastReplyOptions({with_disabled: 0}).then(res => {

        });
    }

    render() {
        const btnIconStyle = {
            fontSize: '0.14rem',
            lineHeight: '0.3rem',
            margin: '0 0.05rem'
        };
        const btnOptionStyle = {
            width: 256,
            display: this.state.menuVisible ? 'block' : 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            zIndex: 2,
            position: 'relative'
        };
        const SubMenu = Menu.SubMenu;
        const MenuItemGroup = Menu.ItemGroup;
        const {TextArea} = Input;
        return (
            <div className={styles.reply}>
                <div className={styles.fastCon}>
                    <div className={styles.fastBtn} id="replayBtn" onClick={this.fastBtnClick}>
                        <IconFont type={"\ue645"} style={btnIconStyle}/>
                        <span>快捷回复</span>
                        <IconFont type={"\ue63b"} style={btnIconStyle}/>
                    </div>
                    <Menu onClick={this.menuItemClick}
                          id="replayBtnDown"
                          style={btnOptionStyle}
                          mode="vertical">
                        <SubMenu key="sub1" title={<span>Navigation One</span>}>
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span>Navigation Two</span>}>
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span>Navigation Three</span>}>
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div className={styles.inputCon}>
                    <TextArea rows={12}/>
                </div>
                <Button type="primary" onClick={this.applyClick}>回复</Button>
            </div>
        )
    }
}

export default Reply