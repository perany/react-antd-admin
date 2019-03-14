import React, {Fragment, PureComponent} from 'react'
import {Button, Form, Icon, Input, Row} from 'antd'
import styles from './Login.module.less'
import {setToken} from '../../utils/tools'
import {FormattedMessage} from 'react-intl'
import {inject} from 'mobx-react'

const FormItem = Form.Item

@inject('rootStore')
@Form.create()
class Login extends PureComponent {
    handleSubmit = (e) => {
        e.preventDefault()
        const {form} = this.props
        const {validateFieldsAndScroll} = form;
        validateFieldsAndScroll(async (errors, values) => {
            if (errors) {
                return
            }
            await Api.login(values, {mock: true}).then(res => {
                console.log("login req::", res);
                if (res.code === 0) {
                    setToken(res.token)
                    this.props.history.replace('/app/dashboard')
                }
            });
        })
    }

    render() {
        const {form} = this.props
        const {getFieldDecorator} = form
        return (
            <Fragment>
                <div className={styles.form}>
                    <div className={styles.logo}>
                        {/*<img alt='logo' src={config.logoPath}/>*/}
                        <span>{Config.siteName}</span>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem hasFeedback>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入用户名!'}]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="请输入用户名"
                                />
                            )}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码!'}]
                            })(
                                <Input
                                    type='password'
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder={`请输入密码`}
                                />
                            )}
                        </FormItem>
                        <Row>
                            <Button
                                type='primary'
                                htmlType={'submit'}>
                                <FormattedMessage id='intl.signIn'/>
                            </Button>
                            <p>
                                <span>Username：admin</span>
                                <span>Password：admin</span>
                            </p>
                        </Row>
                    </Form>
                </div>
                <div className={styles.footer}>
                    <footer className={styles['footer-view']}>
                        <div className={styles['footer-view-links']}>
                          <span>
                            <a
                                title='github'
                                rel="noopener noreferrer"
                                target='_blank'
                                href='https://github.com/shx996/react-antd-admin'>
                            <Icon type="github"/>
                          </a>
                          </span>
                            <span
                                onClick={() => {
                                    this.props.rootStore.changeLocale('en')
                                }}>English</span>
                            <span
                                onClick={() => {
                                    this.props.rootStore.changeLocale('zh')
                                }}>中文</span>
                        </div>
                        <div className={styles['footer-copyright']}>Ant Design Admin © 2019 perany</div>
                    </footer>
                </div>
            </Fragment>
        )
    }
}

export default Login
