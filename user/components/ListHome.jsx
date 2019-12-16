import React from 'react'
import { withNavigation } from 'react-navigation'
import MapViewDirections from 'react-native-maps-directions';

import MapView, { Marker } from 'react-native-maps';

import ListMap from './ListMap'

import {
  View,
  SafeAreaView,
  Text,
  Image,
  Platform,
  StatusBar,
  ScrollView
} from 'react-native'

const ListHome = (props) => {
  return(
    <SafeAreaView
      style={{
        marginHorizontal: 20,
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
      }}
    >
      <ScrollView 
        style={{
          minHeight: '100%'
        }}
      >
        {
          props.trashes.data
          ? (
            props.trashes.data.AllTrash.map(trash => (
              <ListMap location={props.location} trash={trash} key={trash._id}/>
            ))
          )
          : (
            <Text>Loading...</Text>
          )
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default withNavigation(ListHome)