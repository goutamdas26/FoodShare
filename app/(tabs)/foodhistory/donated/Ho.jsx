import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

const Ho = () => {
  const route = useRoute();
  const { id } = route.params || {};  

  return (
    <View>
      <Text>Ho {id}</Text>
    </View>
  )
}

export default Ho