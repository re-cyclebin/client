import React, { useState, useEffect } from 'react'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native'

const HeaderProfile = (props) => {
  const [username, setUsername] = useState('default')

  const asyncUsername = async () => {
    const username = await AsyncStorage.getItem('username')
    setUsername(username)
  }

  useEffect(() => {
    asyncUsername()
  })

  return(
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: 90
      }}
    >
      <View
        style={{
          marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600'
          }}
        >
          {username}
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            alignItems: 'center'
          }}
          onPress={() => (Alert.alert(
            'Logout',
            'Are you sure?',
            [
              {text: 'Cancel', onPress: () => console.log('cancel')},
              {text: 'Logout', onPress: async () => {
                await AsyncStorage.removeItem('token')
                await AsyncStorage.removeItem('username')
                props.navigation.navigate('Login')
              }}
            ]
          ))}
        >
          <FontAwesome5 name={'sign-out-alt'} style={{ fontSize: 20}}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HeaderProfile