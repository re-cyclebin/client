import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Login from './containers/Login'
import Home from './containers/Home'
import Detail from './containers/Detail'
import Profile from './containers/Profile'
import Add from './containers/Add'
import Dummy from './containers/Dummy'

import HeaderProfile from './components/HeaderProfile'

const stackHome = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    }
  },
  Detail
})

const stackProfile = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: <HeaderProfile />
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
  Add: {
    screen: Add,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'plus-circle'} style={{ fontSize: 20, color: tintColor}} />,
      title: 'Add Trash'
    }
  },
  stackProfile: {
    screen: stackProfile,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'user-alt'} style={{ fontSize: 20, color: tintColor}} />,
      title: 'Profile'
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: '#468847'
  }
})

const switchNav = createSwitchNavigator({
  Login: {
    screen: Login
  },
  tabNav,
  Dummy
}, {
  initialRouteName: 'tabNav'
})

export default createAppContainer(switchNav)