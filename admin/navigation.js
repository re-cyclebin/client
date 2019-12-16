import React from 'react'
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from './src/containers/Home'
import Signin from './src/containers/Signin';
import Map from './src/containers/Map';
import HistoryAdmin from './src/containers/HistoryAdmin';

import HomePull from './src/containers/HomePuller';

const stackHome = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    }
  }
})

const stackCreate = createStackNavigator({
  Map: { screen: Map, navigationOptions: {
    title: 'Choose Location',
    headerTransparent: true
  }},
})


const tabNavAdmin = createBottomTabNavigator({
  stackHome: {
    screen: stackHome,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'home'} style={{ fontSize: 20, color: tintColor}}/>,
      title: 'Home',
    },
  },
  AddTrash: { screen: stackCreate, navigationOptions: {
     tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'plus'} style={{ fontSize: 20, color: tintColor}}/>
  }},
  History: { screen: HistoryAdmin, navigationOptions: {
    tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'history'} style={{ fontSize: 20, color: tintColor}}/>
  }}
}, {
  initialRouteName: 'AddTrash',
  tabBarOptions: {
    activeTintColor: '#468847'
  }
})

const tabNavPuller = createBottomTabNavigator({
  stackHomePull: {
    screen: HomePull,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'home'} style={{ fontSize: 20, color: tintColor}}/>,
      title: 'Home',
    },
  },
})

const switchNav = createSwitchNavigator({
  Signin,
  tabNavAdmin: { screen: tabNavAdmin },
  tabNavPuller
}, {
  initialRouteName: 'Signin'
})

export default createAppContainer(switchNav)