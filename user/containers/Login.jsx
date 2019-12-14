import React, { useState, useEffect } from 'react'
import axiosServer from '../configs/axiosServer'

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity
} from 'react-native'


const Login = (props) => {
  const [request, setRequest] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const Error = () => {
    return(
      <Text
        style={{
          marginTop: 20,
          color: 'red'
        }}
      >
        { error }
      </Text>
    )
  }

  const login = async () => {
    try{
      const { data } = await axiosServer({
        url: '/signin',
        method: 'post',
        data: {
          request,
          password
        }
      })
      console.log(data)
    }
    catch(err) {
      setTimeout(() => {
        setError('')
      }, 2000)
      console.log(err.response.data.msg)
      setError(err.response.data.msg)
    }
  }

  return(
    <SafeAreaView
      style={
        styles.safeArea
      }
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: '800',
          marginBottom: 30,
          color: '#286d28'
        }}
      >
        BossRecycle
      </Text>
      <TextInput 
        value={request}
        onChangeText={(value) => setRequest(value)}
        style={
          styles.textInput
        }
        placeholder={'Email/Username'}
        placeholderTextColor={'#9F9F9F'}
        autoCorrect={false}
        autoCapitalize='none'
      />
      <TextInput 
        value={password}
        onChangeText={(value) => setPassword(value)}
        style={
          styles.textInput
        }
        placeholder={'Password'}
        placeholderTextColor={'#9F9F9F'}
        autoCorrect={false}
        autoCapitalize='none'
        secureTextEntry={true}
      />
      {
        request 
        ? (
          password 
          ? (
            <TouchableOpacity
            onPress={() => login()}
              activeOpacity={0.7}
              style={
                styles.buttonLogin
              }
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '600'
                }}
              >Log in</Text>
            </TouchableOpacity>
          )
          : (
            <View
              style={
                styles.buttonLoginDisable
              }
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '600'
                }}
              >Log in</Text>
            </View>
          )
        ) 
        : (
          <View
            style={
              styles.buttonLoginDisable
            }
          >
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600'
              }}
            >Log in</Text>
          </View>
        )
      }

      {
        error 
        ? <Error />
        : <Text></Text>
      }

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 40
        }}
      >
        <Text
          style={{
            marginRight: 3
          }}
        >
          Don't have an account? 
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: '#468847',
              fontWeight: '600'
            }}
          >Sign up.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

// #C6E0FA

const styles = StyleSheet.create({
  buttonLogin: {
    backgroundColor: '#468847',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 4,
    marginVertical: 8
  },
  buttonLoginDisable: {
    backgroundColor: '#afd6af',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 4,
    marginVertical: 8
  },
  safeArea: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  textInput: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    height: 50,
    borderRadius: 4,
    paddingHorizontal: 20,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#EFEFEF',
    marginVertical: 8
  }
})

export default Login