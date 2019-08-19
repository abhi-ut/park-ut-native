import React from 'react'
import { Text } from 'react-native'
import { assign } from 'lodash'
import styles from './styles'

export default class Home extends React.Component {
    render() {
        if (this.props.display === false || !this.props.text) {
            return <Text />
        } else {
            return <Text style={assign({}, styles.message, this.props.style)}>{this.props.text}</Text>
        }
    }
}
