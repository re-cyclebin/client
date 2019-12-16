import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { GET_ALL_TRASH_FOR_MAP } from '../graphAction/query';
import { MUTATION_UPDATE_LOCATION_ADMIN, MUTATION_DELETE_LOCATION_ADMIN } from '../graphAction/mutation'

import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import { ErrorComponent, LoadingComponent } from '../component/SpamComponent'

import MapComponent from '../component/MapComponent';

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  StatusBar,
  Image,
  AsyncStorage
} from 'react-native'

const Home = (props) => {
  const [ token, setToken ] = useState('');
  const [ goFetch, {data, loading, error} ] = useLazyQuery(GET_ALL_TRASH_FOR_MAP,{ variables: { token } })

  const [ submitUpdate ] = useMutation(MUTATION_UPDATE_LOCATION_ADMIN);
  const [ submitDelete ] = useMutation(MUTATION_DELETE_LOCATION_ADMIN);
  
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
    // console.log(longitude, latitude, id)
    // console.log(token)
    submitUpdate({
      variables: { token, longitude: String(longitude), latitude: String(latitude), id }
    })
  }

  const onCancel = (newLoc, loc) => {
    // console.log(newLoc, loc)
    // console.log('=========')
    newLoc.longitude = loc.longitude;
    newLoc.latitude = loc.latitude;
    // console.log('after new', newLoc)
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
            // latitude: location ? location.latitude : -6.2607917,
            // longitude: location ? location.longitude : 106.7810557
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
              // (trash.avaible)
              //   ?
              //   <View key={i}>
              //     <Marker draggable
              //       // onDragStart={(e) => console.log(e)}
              //       coordinate={{
              //         longitude: Number(trash.location.longitude),
              //         latitude: Number(trash.location.latitude)
              //       }}
              //       onDragEnd={({ nativeEvent }) => updateLocation(nativeEvent, trash._id, trash.location, e)}
              //       onPress={() => deleteTrashId(trash._id)}
              //     >
              //       <View>
              //         <Image 
              //           source={require('../../assets/trueTrash.png')}
              //           style={{
              //             width: 20,
              //             height: 40
              //           }}
              //         />
              //       </View>
              //     </Marker>
              //   </View>
              //   :
              //   <View key={i}>
              //     <Marker draggable
              //       coordinate={{
              //         longitude: Number(trash.location.longitude),
              //         latitude: Number(trash.location.latitude)
              //       }}
              //       onDragEnd={({ nativeEvent }) => updateLocation(nativeEvent, trash._id, trash.location)}
              //     >
              //       <View>
              //         <Image 
              //           source={require('../../assets/falsetrash.png')}
              //           style={{
              //             width: 20,
              //             height: 40
              //           }}
              //         />
              //       </View>
              //     </Marker>
              //   </View>
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