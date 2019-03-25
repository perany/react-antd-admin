import React, {PureComponent} from 'react'
import {Button, Form, Input, Row} from 'antd'
import styles from './Login.module.less'
import {setToken} from '../../utils/tools'
import {FormattedMessage} from 'react-intl'
import {inject} from 'mobx-react'
import config from '../../utils/config'

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
                    this.props.history.replace('/app/order')
                }
            });
        })
    }

    render() {
        const {form} = this.props
        const {getFieldDecorator} = form
        return (
            <div className={styles.login}>
                <div className={styles.form}>
                    <div className={styles.toolbar}>
                        <div className={`${styles.circle} ${styles.red}`}/>
                        <div className={`${styles.circle} ${styles.yellow}`}/>
                        <div className={`${styles.circle} ${styles.green}`}/>
                    </div>
                    <div className={styles.titleCon}>
                        <img alt='logo' src={config.logoPath}/>
                        <div>{Config.siteName}</div>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem hasFeedback className={styles.inputCon}>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入账号'}]
                            })(
                                <Input
                                    type='text'
                                    prefix={<i className={styles.user}/>}
                                    placeholder="请输入账号"
                                />
                            )}
                        </FormItem>
                        <FormItem hasFeedback className={styles.inputCon}>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码'}]
                            })(
                                <Input
                                    type='password'
                                    prefix={<i className={styles.pwd}/>}
                                    placeholder={`请输入密码`}
                                />
                            )}
                        </FormItem>
                        <Row type={"flex"} justify={"center"}>
                            <Button
                                type='primary'
                                htmlType={'submit'}>
                                <FormattedMessage id='intl.signIn'/>
                            </Button>
                        </Row>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login
