// app/tabs/donated.js

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import index from "./index";
import Jo from "./Jo";
import ClaimDetailsScreen from "./[id]";
const Stack=createNativeStackNavigator()
export default function Donated() {
  return (
    // ... existing code ...
    <Stack.Navigator>
      <Stack.Screen
        name="index"
        options={{ title: "Claimed" ,headerShown: false}}
        component={index}
       
      />
      <Stack.Screen name="Jo" options={{ title: "Ho" }} component={Jo} />
      <Stack.Screen name="[id]" options={{ title: "Ho" }} component={ClaimDetailsScreen} />
    </Stack.Navigator>
    // ... existing code ...
  );
}
