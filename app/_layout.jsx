// import { useEffect, useState } from "react";
// import { Stack, useRouter } from "expo-router";
// import * as SecureStore from "expo-secure-store";

// const RootLayout = () => {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await SecureStore.getItemAsync("userToken");
// console.log(token==null)
//       if (token!=null) {
//         setIsAuthenticated(true);
//         // router.replace("(tabs)"); // Redirect to tabs when logged in
//       } else {
//         setIsAuthenticated(false);
//         router.replace("/login"); // Redirect to login if not authenticated
//       }
//     };

//     checkAuth();
//   }, []);

//   if (isAuthenticated === null) return null; // Prevent UI flickering while checking auth status

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="(tabs)" />
//       <Stack.Screen name="login" />
//       <Stack.Screen name="signup" />
//     </Stack>
//   );
// };

// export default RootLayout;

// import { View, Text } from 'react-native'
// import React from 'react'
// import { Stack } from 'expo-router'

// const RootLayout = () => {
//   return (
//   <Stack>
//     <Stack.Screen name='login'/>
//   </Stack>
//   )
// }

// export default RootLayout

import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
//import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";
import { LanguageProvider } from "../src/context/LanguageContext";
const RootLayout = () => {
  const router = useRouter();
  const segments = useSegments(); // Helps track navigation state
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
     // const token = await SecureStore.getItemAsync("userToken");
const token="true"
      setIsAuthenticated(!!token); // Set true if token exists, else false
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === null) return; // Wait until auth check completes

    if (isAuthenticated) {
      if (segments[0] !== "(tabs)") {
        router.replace("(tabs)"); // ✅ Redirect to tabs if logged in
      }
    } else {
      if (segments[0] !== "login") {
        router.replace("/login"); // ✅ Redirect to login if not
      }
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
   <LanguageProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
   </LanguageProvider>
  );
};

export default RootLayout;
