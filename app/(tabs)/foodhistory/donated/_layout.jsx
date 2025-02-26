// app/tabs/donated.js

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import index from "./index";
import Ho from "./Ho";
import DonationDetails from "./[id]";
const Stack = createNativeStackNavigator();
export default function Donated() {
  return (
    // ... existing code ...
    <Stack.Navigator>
      <Stack.Screen
        name="index"
        options={{ title: "Donated",headerShown: false }}
        component={index}
      />
      <Stack.Screen name="Ho" options={{ title: "Ho" }} component={Ho} />
      <Stack.Screen name="[id]" options={{ title: "Ho" }} component={DonationDetails} />
    </Stack.Navigator>
    // ... existing code ...
  );
}
