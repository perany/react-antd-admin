import React, {Component} from 'react'
import styles from './IconFont.module.less'

class IconFont extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <i className={styles.icon} style={this.props.style}>  {this.props.type}</i>
        )
    }
}

export default IconFont