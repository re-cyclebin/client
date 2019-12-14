import React from 'react'

import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity
} from 'react-native'

const Add = (props) => {
  return(
    <SafeAreaView
      style={{
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
        marginHorizontal: 20
      }}
    >
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Dummy')}
      >
        <Text>Text</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Add