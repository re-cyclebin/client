import React, { useState, useEffect } from 'react'

import {
  View,
  Text,
  Image,
  AsyncStorage
} from 'react-native'

const Waiting = (props) => {
  const [loading, setLoading] = useState('Please Wait...')
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Point', {
        token: props.navigation.state.params.token,
        id: props.navigation.state.params.oldTrash._id,
        weight: props.navigation.state.params.oldTrash.weight
      })
    }, 17000)
    // return db.doc('trashbins/5df87d05fb3d617f1f44b67d')
    //   .onSnapshot(doc => {
    //     const data = doc.data()
    //     console.log(data, "FROM FIREBASE")
    //     if (data.available) {
    //       props.navigation.navigate('Point', {
    //         token: props.navigation.state.params.token,
    //         id: props.navigation.state.params.oldTrash._id,
    //         weight: props.navigation.state.params.oldTrash.weight
    //       })
    //     }
    //   })
  }, [])

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%'
      }}
    >
      <Image
        source={require('../assets/calculate.jpg')}
        style={{
          height: 250,
          resizeMode: 'contain'
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 18,
            marginTop: 20,
            fontWeight: '600'
          }}
        >{loading} </Text>
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 19,
          fontWeight: '600'
        }}
      >We are calculating your point.</Text>
    </View>
  )
}

export default Waiting