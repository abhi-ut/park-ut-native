import React from 'react'
import { createSwitchNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings(['Warning: ViewPagerAndroid has been extracted'])

const AuthTabNavigator = createMaterialTopTabNavigator(
    {
        login: Login,
        register: Register
    },
    {
        initialRouteName: 'login'
    }
)

const RootSwitchNavigator = createSwitchNavigator(
    {
        initial: AuthTabNavigator,
        home: Home
    },
    {
        initialRouteName: 'initial'
    }
)

const AppContainer = createAppContainer(RootSwitchNavigator)

export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}
