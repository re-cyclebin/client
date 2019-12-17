import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, AsyncStorage } from 'react-native';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { GET_USER_SIGNIN } from '../graphAction/query'
import { MUTATION_SIGNIN_ADMIN } from '../graphAction/mutation';
import { Error } from '../component/SpamComponent'

export default ({ navigation }) => {
  const [ request, setRequest ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ submitSignin   ] = useMutation(MUTATION_SIGNIN_ADMIN);
  const [ token, setToken ] = useState('');
  const [ error, setError ] = useState('');
  const [ findRole, { data } ] = useLazyQuery(GET_USER_SIGNIN, { variables: { token } })

  useEffect(() => { 
    const gettingToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setToken(token)
      if(token) findRole()
    }
    gettingToken()
  }, [])
  
  const signin = async () => {
    try{
      const { data } = await submitSignin({
        variables: { request, password }
      })
      await AsyncStorage.setItem('token', data.signin.token)
      if(data.signin.user.role === 'admin') {
        navigation.navigate('tabNavAdmin')
      }
      else if(data.signin.user.role === 'puller'){
        navigation.navigate('tabNavPuller')
      }
    }catch({ graphQLErrors }) { setError(graphQLErrors); setTimeout(() => {
      setError('')
    }, 2000); }
  }
  data
  ?
    data.UserSignin
      ? (data.UserSignin.role == 'admin') ? navigation.navigate('tabNavAdmin')
      : navigation.navigate('tabNavPuller')
  : null
  : null
  
  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1537791341351-5f2fc64bcf55?ixlib=rb-1.2.1&w=1000&q=80'}} style={{ height: '100%', weight: '100%'}}>

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
        BoostleBin
        Admin
      </Text>
      <TextInput 
        value={ request }
        onChangeText={msg => setRequest(msg)}
        style={ styles.textInput }
        placeholder={ 'Email/Username' }
        placeholderTextColor={ '#9F9F9F' }
        autoCorrect={ false }
        autoCapitalize='none'
        keyboardType='default'
      />
      <TextInput 
        value={ password }
        onChangeText={msg => setPassword(msg)}
        style={ styles.textInput }
        placeholder={ 'Password' }
        placeholderTextColor={ '#9F9F9F' }
        autoCorrect={ false }
        autoCapitalize='none'
        secureTextEntry={ true }
        keyboardType='default'
      />
      <TouchableOpacity
        activeOpacity={ 0.7 }
        style={ styles.buttonLogin }
        onPress={ signin }
      >
        <Text>Sign In</Text>
        </TouchableOpacity>
        {
          (error) 
            ? <Error error={ error }/>
            : null
        }
      </SafeAreaView>
    </ImageBackground>
  )
}


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
    height: 40,
    borderRadius: 4,
    paddingHorizontal: 20,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#EFEFEF',
    borderRadius: 10,
    marginVertical: 8
  }
})
