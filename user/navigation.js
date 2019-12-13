import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Login from './containers/Login'
import Home from './containers/Home'
import Detail from './containers/Detail'
import Profile from './containers/Profile'

const stackHome = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    }
  },
  Detail
})

const tabNav = createBottomTabNavigator({
  stackHome: {
    screen: stackHome,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'home'} style={{ fontSize: 17, color: tintColor}}/>,
      title: 'Home'
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'user-alt'} style={{ fontSize: 17, color: tintColor}} />
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#468847'
  }
})

const switchNav = createSwitchNavigator({
  Login: {
    screen: Login
  },
  tabNav
}, {
  initialRouteName: 'Login'
})

export default createAppContainer(switchNav)