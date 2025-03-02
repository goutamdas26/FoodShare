

import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";
import { LanguageProvider } from "../src/context/LanguageContext";
import { ItemsProvider } from "../src/context/ItemContext";
const RootLayout = () => {
  const router = useRouter();
  const segments = useSegments(); // Helps track navigation state
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
     //const token = await SecureStore.getItemAsync("userToken");
const token=true
     setIsAuthenticated(!!token); // Set true if token exists, else fals?e
 
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
  <ItemsProvider>
     <LanguageProvider>
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="(tabs)" /> */}
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
   </LanguageProvider>
  </ItemsProvider>
  );
};

export default RootLayout;


// import { useEffect, useState } from "react";
// import { Stack, useRouter, useSegments } from "expo-router";
// import { ActivityIndicator, View } from "react-native";
// import * as SecureStore from "expo-secure-store";
// import { LanguageProvider } from "../src/context/LanguageContext";
// import { ItemsProvider } from "../src/context/ItemContext";

// const RootLayout = () => {
//   const router = useRouter();
//   const segments = useSegments();
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = await SecureStore.getItemAsync("userToken");
//         setIsAuthenticated(!!token); // ✅ Set authentication state
//       } catch (error) {
//         console.error("Error fetching token:", error);
//         setIsAuthenticated(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated === null) return; // Wait for authentication check

//     if (isAuthenticated) {
//       if (segments[0] !== "(tabs)") {
//         router.replace("/(tabs)"); // ✅ Ensure correct redirection
//       }
//     } else {
//       if (segments[0] !== "login") {
//         router.replace("/login"); // ✅ Ensure correct redirection
//       }
//     }
//   }, [isAuthenticated, segments]);

//   if (isAuthenticated === null) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="blue" />
//       </View>
//     );
//   }

//   return (
//     <ItemsProvider> 
//       <LanguageProvider>
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="(tabs)" /> 
//           <Stack.Screen name="login" />
//           <Stack.Screen name="signup" />
//         </Stack>
//       </LanguageProvider>
//     </ItemsProvider>
//   );
// };

// export default RootLayout;
