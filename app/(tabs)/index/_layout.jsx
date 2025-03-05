// app/tabs/donated.js

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import index from "./home";



import Details from "./food-details";
const Stack=createNativeStackNavigator()
export default function Donated() {
  return (
    // ... existing code ...
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        options={{ title: "Claimed" ,headerShown: false}}
        component={index}
       
      />

      {/* <Stack.Screen name="[id]" options={{ title: "Ho" }} component={ClaimDetailsScreen} /> */}
      <Stack.Screen name="food-details" component={Details} options={{title:"Food Details"}}/>
    </Stack.Navigator>
    // ... existing code ...
  );
}