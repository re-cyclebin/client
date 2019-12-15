import React from 'react'
import {withNavigation} from 'react-navigation'

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

const Dummy = (props) => {
  return(
    <View>
      <TouchableOpacity>
        <Text>{props.navigation.state.params.data}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default withNavigation(Dummy)