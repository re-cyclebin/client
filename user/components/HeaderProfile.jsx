import React from 'react'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList
} from 'react-native'

const HeaderProfile = (props) => {
  return(
    <SafeAreaView
      style={{
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600'
          }}
        >
          Username
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            alignItems: 'center'
          }}
        >
          <FontAwesome5 name={'sign-out-alt'} style={{ fontSize: 20}}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HeaderProfile