import React from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './containers/Login'
import Home from './containers/Home'

const switchNav = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  }
}, {
  initialRouteName: 'Home'
})

export default createAppContainer(switchNav)