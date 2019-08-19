import React from 'react'
import { Text, TouchableNativeFeedback } from 'react-native'
import { Card } from 'react-native-elements'
import _ from 'lodash'
import styles from './styles'

export default class Home extends React.Component {
    render() {
        const garage = this.props.garage

        const spotCount = garage.spots.length
        const availableSpotCount = _.chain(garage.spots)
            .filter(spot => !spot.reservation)
            .size()
            .value()

        const localReserve = (availableSpotCount > 0) ? this.props.reserve : _.noop

        return (
            <TouchableNativeFeedback onPress={() => localReserve(garage.id)}>
                <Card title={this.props.garage.name}>
                    <Text style={_.assign({}, styles.center, styles.textBig)}>{this.props.garage.address}</Text>
                    <Text
                        style={_.assign({}, styles.center, styles.textNormal)}
                    >{`Available spots: ${availableSpotCount} / ${spotCount}`}</Text>
                </Card>
            </TouchableNativeFeedback>
        )
    }
}
