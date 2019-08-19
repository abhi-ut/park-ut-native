import React from 'react'
import { Text, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import styles from './styles'

function makeReservationText(garage) {
    result = []
    result.push(`Your spot is currently reserved for 10 minutes`)
    result.push(`Reservation details`)
    result.push(`Garage name: ${garage.name}`)
    result.push(`Garage address: ${garage.address}`)
    result.push(`Spot location: ${garage.spot.location}`)
    result.push(`Your reservation is valid until ${garage.spot.reservation.time}`)
    result.push(`After this time, you will lose your spot`)
    result.push(`You may occupy your spot once you are at the garage`)
    return result
}

function makeOccupancyText(garage) {
    result = []
    result.push(`You are currently holding a spot`)
    result.push(`Occupancy details`)
    result.push(`Garage name: ${garage.name}`)
    result.push(`Garage address: ${garage.address}`)
    result.push(`Spot location: ${garage.spot.location}`)
    result.push(`This spot has been held since ${garage.spot.reservation.time}`)
    result.push(`You will be billed based on how long you have stayed`)
    result.push(`You may choose to checkout at anytime`)
    return result
}

export default class Home extends React.Component {
    render() {
        const garage = this.props.garage
        const occupied = this.props.occupied
        const lines = (occupied ? makeOccupancyText : makeReservationText)(garage)

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.textHuge}>{lines[0]}</Text>
                <Text style={styles.textBig}>{lines[1]}</Text>
                <Text style={styles.textNormal}>{lines[2]}</Text>
                <Text style={styles.textNormal}>{lines[3]}</Text>
                <Text style={styles.textNormal}>{lines[4]}</Text>
                <Text>{'\n'}</Text>
                <Text style={styles.textBig}>{lines[5]}</Text>
                <Text style={styles.textNormal}>{lines[6]}</Text>
                <Text>{'\n'}</Text>
                <Text style={styles.textBig}>{lines[7]}</Text>
                <Button onPress={() => this.props.action()} title={this.props.occupied ? 'Checkout' : 'Occupy'} />
            </ScrollView>
        )
    }
}
