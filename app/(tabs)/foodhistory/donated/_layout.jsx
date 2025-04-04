// app/tabs/donated.js

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";


import DonationDetails from "./donation-details";
import DonatedScreen from "./index";
const Stack = createNativeStackNavigator();
export default function Donated() {
  return (
    // ... existing code ...
    <Stack.Navigator>
      <Stack.Screen
        name="index"
        options={{ title: "Donated",headerShown: false }}
        component={DonatedScreen}
      />

      <Stack.Screen name="donation-details" options={{ title: "Food Details" }} component={DonationDetails} />
    </Stack.Navigator>
    // ... existing code ...
  );
}
