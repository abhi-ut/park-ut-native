import React from 'react'
import { Text, View, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import axios from 'axios'
import styles from './styles'
import { assign } from 'lodash'
import Message from './Message'

const _pass = {
    style: styles.success,
    text: 'User registered successfully.'
}

const _fail = {
    style: styles.failure,
    text: 'Invalid information.'
}

const _newState = {
    name: '',
    email: '',
    password: '',
    passwordDuplicate: '',
    status: null
}

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = _newState
    }

    fail() {
        this.setState(assign({}, _newState, { status: _fail }))
    }

    register() {
        const { name, email, password, passwordDuplicate } = this.state
        axios
            .post(`https://park-ut.appspot.com/signup`, {
                name,
                email,
                password,
                passwordDuplicate
            })
            .then(response => {
                if (response.status == 200) {
                    this.setState(assign({}, _newState, { status: _pass }))
                } else this.fail()
            })
            .catch(() => this.fail())
    }

    render() {
        const status = this.state.status

        return (
            <View style={styles.container}>
                <Text style={styles.textNormal}>Name</Text>
                <TextInput
                    onChangeText={val => this.setState({ name: val })}
                    defaultValue={this.state.name}
                    editable={true}
                    style={styles.input}
                />
                <Text style={styles.textNormal}>Email Address</Text>
                <TextInput
                    onChangeText={val => this.setState({ email: val })}
                    defaultValue={this.state.email}
                    editable={true}
                    keyboardType={'email-address'}
                    style={styles.input}
                />
                <Text style={styles.textNormal}>Password</Text>
                <TextInput
                    onChangeText={val => this.setState({ password: val })}
                    defaultValue={this.state.password}
                    editable={true}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Text style={styles.textNormal}>Confirm Password</Text>
                <TextInput
                    onChangeText={val => this.setState({ passwordDuplicate: val })}
                    defaultValue={this.state.passwordDuplicate}
                    editable={true}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Button onPress={() => this.register()} title="Register" styles={styles.primary} />
                <Message display={status != null} style={status && status.style} text={status && status.text} />
            </View>
        )
    }
}
