import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LiveBhandaraScreen from './index';
import BDetails from './bhandara-details';
import ListBhandara from './list-bhandara';


const BhandaraStack = () => {
  const Stack = createNativeStackNavigator();

  return (
<Stack.Navigator>
  <Stack.Screen name='index' component={LiveBhandaraScreen} options={{
    title:"Food Charity Events",headerShown:false
  }}/>
  <Stack.Screen name='bhandara-details' component={BDetails} options={{
    title:"Event Details"
  }}/>
  <Stack.Screen name='list-bhandara' component={ListBhandara} options={{
    title:"List Bhandara"
  }}/>
</Stack.Navigator>
  )
}

export default BhandaraStack