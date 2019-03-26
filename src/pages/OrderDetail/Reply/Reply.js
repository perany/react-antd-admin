import React, {Component} from 'react'
import {inject} from 'mobx-react'
import {Button, Form, Input, Menu, message} from 'antd';
import IconFont from '../../../components/IconFont/IconFont'
import styles from './Reply.module.less'

@inject("rootStore")
    @Form.create()
class Reply extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuVisible: false,
            options: []
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
        const {setFieldsValue, getFieldValue} = this.props.form;
        const oldVal = getFieldValue('textarea');
        const addValue = e.key.substr(e.key.indexOf('_') + 1);
        setFieldsValue({textarea: oldVal + addValue});
        this.setState({
            menuVisible: false
        });
    }

    // 回复 点击
    applyClick = e => {
        const {getFieldValue} = this.props.form;
        Api.reply({
            id: this.props.id,
            reply: getFieldValue('textarea')
        }).then(res => {
            if (res.ret === 0) {
                message.success("您已回复成功！");
                this.props.replySuccess();
            }
        });
    }

    // 获取快捷回复 下拉选项
    getFastApplyOptions = () => {
        Api.fastReplyOptions({with_disabled: 0}).then(res => {
            this.setState({
                options: res.data ? res.data : []
            });
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
        const {getFieldDecorator} = this.props.form;
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
                        {
                            this.props.rootStore.questionType.map((item) => (
                                <SubMenu key={item.id} title={<span>{item.name}</span>}>
                                    {this.state.options.map((subItem) => (
                                        item.id === subItem['feedback_type'] &&
                                        <Menu.Item key={subItem.id + "_" + subItem.content}>{subItem.title}</Menu.Item>
                                    ))}
                                </SubMenu>
                            ))
                        }
                    </Menu>
                </div>
                <div className={styles.inputCon}>
                    <Form>
                        {getFieldDecorator('textarea', {
                            rules: [{required: true, message: '请输入回复内容！'}],
                            initialValue: ''
                        })(
                            <TextArea rows={12}/>
                        )}
                    </Form>
                </div>
                <Button type="primary" onClick={this.applyClick}>回复</Button>
            </div>
        )
    }
}

export default Reply