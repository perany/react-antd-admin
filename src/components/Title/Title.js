import React, {Component} from 'react'
import styles from './Title.module.less'

class Title extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.titleCon}>
                    {this.props.title}
            </div>
        )
    }
}

export default Title