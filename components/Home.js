import React from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-elements'
import styles from './styles'
import Card from './Card'
import Inform from './Inform'
import axios from 'axios'
import _ from 'lodash'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fetched: false,
            data: null
        }
        this.fetch()
    }

    userId() {
        return this.props.navigation.getParam('userId', 'null')
    }

    fetch() {
        axios.get(`https://park-ut.appspot.com/details?user_id=${this.userId()}`).then(response => {
            this.setState({
                fetched: true,
                data: response.data
            })
        })
    }

    reserve(garageId) {
        axios.post(`https://park-ut.appspot.com/reserve/${garageId}?user_id=${this.userId()}`).then(response => {
            this.fetch()
        })
    }

    occupy() {
        axios.post(`https://park-ut.appspot.com/occupy?user_id=${this.userId()}`).then(response => {
            this.fetch()
        })
    }

    clear() {
        axios.post(`https://park-ut.appspot.com/clear?user_id=${this.userId()}`).then(response => {
            this.fetch()
        })
    }

    render() {
        let body
        if (this.state.fetched === false) {
            body = <ActivityIndicator size="large" styles={styles.primary} />
        } else {
            if (_.isArray(this.state.data)) {
                const boundReserve = this.reserve.bind(this)
                body = [
                    <Text
                        key="reserveHeader"
                        style={_.assign(
                            { paddingVertical: 20, borderColor: '#ced4da', borderWidth: 1, fontSize: 25 },
                            styles.center
                        )}
                    >
                        Choose a garage to book
                    </Text>,
                    <ScrollView key="cardContainer" contentContainerStyle={{ paddingBottom: 20 }}>
                        {_.chain(this.state.data)
                            .filter(garage => !_.isEmpty(garage.spots))
                            .map(garage => <Card garage={garage} reserve={boundReserve} key={garage.id} />)
                            .value()}
                    </ScrollView>
                ]
            } else {
                const garage = this.state.data
                const occupied = garage.spot.reservation.occupied
                const boundAction = (occupied ? this.clear : this.occupy).bind(this)
                body = <Inform garage={garage} occupied={occupied} action={boundAction} />
            }
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    {/* <Button title="Park at UT" /> */}
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('login')
                        }}
                        title="Logout"
                    />
                </View>
                {body}
            </View>
        )
    }
}
