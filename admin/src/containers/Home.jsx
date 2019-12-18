import React, { useState, useEffect } from 'react'

import MapView from 'react-native-maps';

import { GET_ALL_TRASH_FOR_MAP } from '../graphAction/query';
import { MUTATION_UPDATE_LOCATION_ADMIN, MUTATION_DELETE_LOCATION_ADMIN, MUTATION_CREATE_NEW_TRASH } from '../graphAction/mutation'

import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import { ErrorComponent, LoadingComponent } from '../component/SpamComponent'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MapComponent from '../component/MapComponent';

import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  AsyncStorage,
  Alert,
  TouchableOpacity
} from 'react-native'

export default (props) => {
  const [ token, setToken ] = useState('');
  const [ goFetch, {data, loading, error} ] = useLazyQuery(GET_ALL_TRASH_FOR_MAP,{ variables: { token } })

  const [ submitUpdate ] = useMutation(MUTATION_UPDATE_LOCATION_ADMIN);
  // const [ submitDelete ] = useMutation(MUTATION_DELETE_LOCATION_ADMIN);
  
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setToken(token)
      goFetch()
    }
    getToken();
  }, [])

  if(loading) return <LoadingComponent />
  if(error) return <ErrorComponent />

  const actionUpdate = ({ longitude, latitude, id }) => {
    submitUpdate({
      variables: { token, longitude: String(longitude), latitude: String(latitude), id }
    })
  }

  const onCancel = (newLoc, loc) => {
    newLoc.longitude = loc.longitude;
    newLoc.latitude = loc.latitude;
  }

  const updateLocation = (loc, id, trash) => {
    Alert.alert(
      'UPDATE',
      'Are you sure want change location',
      [
        { text: 'NO', onPress: () => onCancel(loc.coordinate, trash ) },
        { text: 'YES', onPress: () => actionUpdate({ longitude: loc.coordinate.longitude, latitude: loc.coordinate.latitude, id }) }
      ],
      { cancelable: false }
    )
  }

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        {text: 'Cancel'},
        {text: 'Logout', onPress: async () => {
          await AsyncStorage.removeItem('token')
          props.navigation.navigate('Signin')
        }},
      ],
    );
  }

  // const actionDelete = async (id) => {
  //   await submitDelete({
  //     variables: { id, token },
  //     update (cache) {
  //       const { AllTrash } = cache.readQuery({ query: GET_ALL_TRASH_FOR_MAP, variables: { token } })
  //       let temp = []
  //       AllTrash.forEach((trash, i) => {
  //         if(trash._id !== id) temp.push(trash)
  //       })
  //       cache.writeQuery({
  //         query: GET_ALL_TRASH_FOR_MAP,
  //         variables: { token },
  //         data: { AllTrash: temp }
  //       })
  //     }
  //   })
  // }

  // const deleteTrashId = (id) => {
  //   Alert.alert(
  //     'DELETE',
  //     'Are you sure want delete?',
  //     [
  //       { text: 'NO', onPress: () => alert('safe trash') },
  //       { text: 'DELETE', onPress: () => actionDelete(id) }
  //     ],
  //      { cancelable: false }
  //   )
  // }


  return(
    <View>
      <MapView style={styles.mapStyle} 
        camera={{
          center: {
            latitude: -6.2607917,
            longitude: 106.7810557
          },
          pitch: 0,
          heading: 0,
          altitude: 5000,
          zoom: 14
        }}
      >
        {
          data
            ? 
            data.AllTrash.map((trash, i) => (
              <MapComponent 
                data={trash} 
                key={i} 
                updateLocation={updateLocation}
                token={token}
                // deleteTrashId={deleteTrashId}
                link={props.navigation.navigate}
              />
            ))
            :
            null
        }
      </MapView>
      <SafeAreaView
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            logout()
          }}
          style={{
            backgroundColor: '#31B057',
            borderRadius: 8,
            padding: 8
          }}
        >
          <FontAwesome5 name="sign-out-alt" style={{ fontSize: 18, color: 'white' }} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%'
  },
});
