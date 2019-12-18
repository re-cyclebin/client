import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_CREATE_NEW_MEMBER } from '../graphAction/mutation'

export default ({ navigation }) => {
  const [ role, setValue ] = useState('puller');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ error, setError ] = useState('');
  const [ submitCreate ] = useMutation( MUTATION_CREATE_NEW_MEMBER )

  const radio_props = [
    {label: 'puller', value: 'puller' },
    {label: 'admin', value: 'admin' }
  ];
   
  const createNewMember = async () => {
    const token = await AsyncStorage.getItem('token');
    try{
      await submitCreate({
        variables: { token, username, email, password, role }
      })
      setError('Register Success')
      setUsername('');
      setPassword('');
      setEmail('');
      setTimeout(() => {
        navigation.navigate('stackHome')
      }, 2000);
    }catch({graphQLErrors}) { setError(graphQLErrors); setTimeout(() => {
      setError('')
    }, 2000); }
  }

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Create Member</Text>
      <View style={{ width: '65%', marginTop: 40 }}>
        <TextInput 
          onChangeText={msg => setUsername(msg)}
          style={{ width: '100%', backgroundColor: 'white', width: '100%', height: 30, textAlign: 'center', borderRadius: 20 }} placeholder='username' autoCapitalize='none' keyboardType='default'/>
        <TextInput 
          onChangeText={msg => setPassword(msg)}
          style={{ width: '100%', marginTop: 20, backgroundColor: 'white', width: '100%', height: 30, textAlign: 'center', borderRadius: 20 }} placeholder='password' autoCapitalize='none' keyboardType='default'/>
        <TextInput 
          onChangeText={msg => setEmail(msg)}
          style={{ width: '100%', marginTop: 20, backgroundColor: 'white', width: '100%', height: 30, textAlign: 'center', borderRadius: 20 }} placeholder='email' autoCapitalize='none' keyboardType='default'/>

        <View>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={(value) => { setValue(value) } }
            style={{ flexDirection: 'row', marginTop: 10 }}
          />
        </View>
      </View>
      <TouchableOpacity style={{ marginTop: 10, backgroundColor: 'green', height: 50, width: '65%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} onPress={createNewMember}>
        <Text>Create</Text>
      </TouchableOpacity>
    </View>
  )
}