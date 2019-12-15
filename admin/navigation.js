import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from './containers/Home'

const stackHome = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    }
  }
})


const tabNav = createBottomTabNavigator({
  stackHome: {
    screen: stackHome,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'home'} style={{ fontSize: 20, color: tintColor}}/>,
      title: 'Home',
    },
  },
}, {
  initialRouteName: 'stackHome',
  tabBarOptions: {
    activeTintColor: '#468847'
  }
})

const switchNav = createSwitchNavigator({
  tabNav,
}, {
  initialRouteName: 'tabNav'
})

export default createAppContainer(switchNav)