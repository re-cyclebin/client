import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './containers/Login'
import Home from './containers/Home'
import Detail from './containers/Detail'

const stackHome = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    }
  },
  Detail
})

const switchNav = createSwitchNavigator({
  Login: {
    screen: Login
  },
  stackHome: {
    screen: stackHome
  }
}, {
  initialRouteName: 'stackHome'
})

export default createAppContainer(switchNav)