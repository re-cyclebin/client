import React, { useState, useEffect } from 'react'

import { BarCodeScanner } from 'expo-barcode-scanner';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

const EmptyBin = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      BarCodeScanner.req
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (data) => {
    if(!scanned){
      setScanned(true);
      console.log(props.navigation)
      props.navigation.navigate('ConfirmationPage', {data: data.data})
    }
  };

  const Permission = () => {
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  }

  return(
    <View
      style={{
        justifyContent: 'center'
      }}
    >
      {
        !hasPermission && (
          <Permission />
        )
      }
      <BarCodeScanner
        onBarCodeScanned={ (e) => handleBarCodeScanned(e) }
        style={{
          height: '100%'
        }}
      />
      {
        scanned && (
          <TouchableOpacity
            onPress={() => setScanned(false)}
            activeOpacity={0.6}
            style={{
              padding: 8,
              position: 'absolute',
              backgroundColor: 'white',
              bottom: 50,
              right: 20,
              borderRadius: 16,
              alignItems: 'center'
            }}
          >
            <FontAwesome5 name={'redo-alt'} style={{ fontSize: 30 }} />
            <Text>Restart</Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default EmptyBin