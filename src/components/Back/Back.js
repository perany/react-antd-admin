import {withRouter} from 'react-router-dom';
import React, {Component} from 'react'
import {Button} from 'antd'
import styles from './Back.module.less'

class Back extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.backCon}>
                <Button onClick={()=>{
                    this.props.history.goBack();
                }}>
                    返回
                </Button>
            </div>
        )
    }
}

export default withRouter(Back)