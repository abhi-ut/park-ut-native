import React from 'react'
import { Text, View, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import axios from 'axios'
import styles from './styles'
import Message from './Message'

const _fail = 'Invalid credentials.'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            status: ''
        }
    }

    login() {
        const { email, password } = this.state
        axios
            .post(`https://park-ut.appspot.com/auth?email=${email}&password=${password}`)
            .then(response => {
                if (response.status == 200)
                    this.props.navigation.navigate('home', {
                        userId: response.data.id
                    })
                else this.setState({ status: _fail })
            })
            .catch(() => {
                this.setState({ status: _fail })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textHuge}>Park at UT</Text>
                <Text style={styles.textNormal}>Email Address</Text>
                <TextInput
                    onChangeText={val => this.setState({ email: val })}
                    editable={true}
                    keyboardType={'email-address'}
                    style={styles.input}
                />
                <Text style={styles.textNormal}>Password</Text>
                <TextInput
                    onChangeText={val => this.setState({ password: val })}
                    editable={true}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Button onPress={() => this.login()} title="Log In" styles={styles.primary} />
                <Message style={styles.failure} text={this.state.status} />
            </View>
        )
    }
}
