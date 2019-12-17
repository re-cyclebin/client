import React from 'react'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native'

const HeaderAddTrash = (props) => {
  return(
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}
    >
      <View
        style={{
          paddingRight: 20,
          paddingLeft: 14
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate('EmptyBin')}
          activeOpacity={0.6}
          style={{
            padding: 6
          }}
        >
          <FontAwesome5 name={'arrow-left'} style={{ fontSize: 20}} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HeaderAddTrash