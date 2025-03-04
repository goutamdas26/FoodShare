// // app/tabs/donated.js

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import React from "react";
// import { View, Text } from "react-native";

// import Ho from "./Ho";
// import DonationDetails from "./[id]";
// import DonatedScreen from "./index";
// const Stack = createNativeStackNavigator();
// export default function Donated() {
//   return (
//     // ... existing code ...
//     <Stack.Navigator>
//       <Stack.Screen
//         name="index"
//         options={{ title: "Donated",headerShown: false }}
//         component={DonatedScreen}
//       />
//       <Stack.Screen name="Ho" options={{ title: "Ho" }} component={Ho} />
//       <Stack.Screen name="[id]" options={{ title: "Ho" }} component={DonationDetails} />
//     </Stack.Navigator>
//     // ... existing code ...
//   );
// }
import { Stack } from "expo-router";

export default function DonatedStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Donated Items" }} />
      <Stack.Screen name="[id]" options={{ title: "Item Details" }} />
    </Stack>
  );
}
