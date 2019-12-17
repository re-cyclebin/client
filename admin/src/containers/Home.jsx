import React, { useState, useEffect } from 'react'

import MapView, { Marker } from 'react-native-maps';

import { GET_ALL_TRASH_FOR_MAP } from '../graphAction/query';
import { MUTATION_UPDATE_LOCATION_ADMIN, MUTATION_DELETE_LOCATION_ADMIN, MUTATION_CREATE_NEW_TRASH } from '../graphAction/mutation'

import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import { ErrorComponent, LoadingComponent } from '../component/SpamComponent'
// import { Ionicons } from '@expo/vector-icons'
import MapComponent from '../component/MapComponent';

import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Image,
  AsyncStorage,
  Alert,
  TouchableOpacity
} from 'react-native'

const Home = (props) => {
  const [ token, setToken ] = useState('');
  const [ isClick, setClick ] = useState(false);
  const [ goFetch, {data, loading, error} ] = useLazyQuery(GET_ALL_TRASH_FOR_MAP,{ variables: { token } })

  // const [ submitCreate ] = useMutation( MUTATION_CREATE_NEW_TRASH )
  const [ submitUpdate ] = useMutation(MUTATION_UPDATE_LOCATION_ADMIN);
  const [ submitDelete ] = useMutation(MUTATION_DELETE_LOCATION_ADMIN);
  
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setToken(token)
      goFetch()
      // await AsyncStorage.removeItem('token') 
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

  const actionDelete = async (id) => {
    await submitDelete({
      variables: { id, token },
      update (cache, { data: { MUTATION_DELETE_LOCATION_ADMIN } }) {
        const { AllTrash } = cache.readQuery({ query: GET_ALL_TRASH_FOR_MAP, variables: { token } })
        let temp = []
        AllTrash.forEach((trash, i) => {
          if(trash._id !== id) temp.push(trash)
        })
        cache.writeQuery({
          query: GET_ALL_TRASH_FOR_MAP,
          variables: { token },
          data: { AllTrash: temp }
        })
      }
    })
  }

  const deleteTrashId = (id) => {
    Alert.alert(
      'DELETE',
      'Are you sure want delete?',
      [
        { text: 'NO', onPress: () => alert('safe trash') },
        { text: 'DELETE', onPress: () => actionDelete(id) }
      ],
       { cancelable: false }
    )
  }


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
                deleteTrashId={deleteTrashId}
              />
            ))
            :
            null
        }
      </MapView>
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

export default Home