import React, { useState, useEffect } from 'react'
import axiosServer from '../configs/axiosServer'
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const REGISTER = gql`
  mutation (
    $username: String, 
    $password: String,
    $email: String
    
  ) {
    signup(
      username: $username,
      password: $password,
      email: $email
    ){
      _id
      username
      password
    }
  }
`;

const LOGIN = gql`
  mutation (
    $request: String, 
    $password: String
  ) {
      signin (request: $request, password: $password){
        user {
          username
          role
        }
        token
      }
    }
`

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'

const Register = (props) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const cekToken = async () => {
    if(await AsyncStorage.getItem('token')){
      props.navigation.navigate('tabNav')
    }
  }

  // useEffect(() => {
  //   cekToken()
  // })

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

  const [registerUser] = useMutation(REGISTER)
  const [loginUser] = useMutation(LOGIN)

  const register = async () => {
    try{
      setIsLoading(true)
      const { data: dataRegister } = await registerUser({
        variables: {
          email,
          username,
          password
        }
      })
      console.log(dataRegister)
      const { data } = await loginUser({
        variables: {
          request: dataRegister.signup.username,
          password
        }
      })
      setIsLoading(false)
      // console.log(data.signin.token)
      // console.log(data.signin.user.username)
      console.log(data.signin.user.role)
      if(data.signin.user.role == 'user') {
        await AsyncStorage.setItem('token', data.signin.token)
        await AsyncStorage.setItem('username', data.signin.user.username)
        props.navigation.navigate('tabNav')
      }
      else {
        setTimeout(() => {
          setError('')
        }, 2000)
        setError('Only user can login')
      }
    }
    catch(err) {
      setIsLoading(false)
      console.log(err)
      setTimeout(() => {
        setError('')
      }, 2000)
      setError(err.graphQLErrors[0].message)
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
        Boostle
      </Text>
      <TextInput 
        value={username}
        onChangeText={(value) => setUsername(value)}
        style={
          styles.textInput
        }
        placeholder={'Username'}
        placeholderTextColor={'#9F9F9F'}
        autoCorrect={false}
        autoCapitalize='none'
      />
      <TextInput 
        value={email}
        onChangeText={(value) => setEmail(value)}
        style={
          styles.textInput
        }
        placeholder={'Email'}
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
        (email && username && password)
        ? (
          <TouchableOpacity
            onPress={() => register()}
            activeOpacity={0.7}
            style={
              styles.buttonLogin
            }
          >
            {
              !isLoading
              ? (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '600'
                  }}
                >Sign Up</Text>
              )
              : <ActivityIndicator color='white' />
            }
          </TouchableOpacity>
        ) 
        : (
          <View
            style={
              styles.buttonLoginDisable
            }
          >
            {
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '600'
                }}
              >Sign Up</Text>
            }
          </View>
        )
      }

      {
        error
        ? <Error />
        : <Text
          style={{
            color: 'white',
            marginTop: 20,
          }}> test </Text>
      }

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20
        }}
      >
        <Text
          style={{
            marginRight: 3
          }}
        >
          Already have an account? 
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
        >
          <Text
            style={{
              color: '#468847',
              fontWeight: '600'
            }}
          >Log in.</Text>
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

export default Register