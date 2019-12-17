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
import EmptyBin from './src/containers/EmptyBin';
import ConfirmationPage from './src/containers/ConfirmationPage';
import HomePull from './src/containers/HomePuller';
import Waiting from './src/containers/Waiting'

import ConfirmationHeader from './src/component/ConfirmationHeader'

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

const emptyStack = createStackNavigator({
  EmptyBin: {
    screen: EmptyBin,
    navigationOptions: {
      header: null
    }
  },
  ConfirmationPage: {
    screen: ConfirmationPage,
    navigationOptions: {
      header: ({ navigation }) => <ConfirmationHeader navigation={navigation} />
    }
  }
}, {
  // initialRouteName: 'ConfirmationPage'
  // initialRouteName: 'Waiting'
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
  emptyStack: {
    screen: emptyStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'dumpster-fire'} style={{ fontSize: 20, color: tintColor}}/>,
      title: 'Empty Bin',
    },
  }
}, {
  tabBarOptions: {
    activeTintColor: '#468847'
  }
})

const switchNav = createSwitchNavigator({
  Signin,
  tabNavAdmin: { screen: tabNavAdmin },
  tabNavPuller,
  Waiting
}, {
  initialRouteName: 'Signin'
})

export default createAppContainer(switchNav)