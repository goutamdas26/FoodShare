// import { useEffect, useState } from "react";
// import { Stack, useRouter } from "expo-router";
// import * as SecureStore from "expo-secure-store";
// import { ActivityIndicator, View } from "react-native";
// import { LanguageProvider } from "../src/context/LanguageContext";
// import { ItemsProvider } from "../src/context/ItemContext";

// const RootLayout = () => {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = await SecureStore.getItemAsync("userToken");
//         setIsAuthenticated(token ? true : false);
//       } catch (error) {
//         console.error("Error fetching token:", error);
//         setIsAuthenticated(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated === null) return;

//     if (isAuthenticated) {
//       router.replace("(tabs)");
//     } else {
//       router.replace("/login");
//     }
//   }, [isAuthenticated]);

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



import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";
import { LanguageProvider } from "../src/context/LanguageContext";
import { ItemsProvider } from "../src/context/ItemContext";

const RootLayout = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isMounted, setIsMounted] = useState(false); // Track component mount status

  useEffect(() => {
    setIsMounted(true); // Set mounted state

    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        setIsAuthenticated(token ? true : false);
      } catch (error) {
        console.error("Error fetching token:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    return () => setIsMounted(false); // Cleanup function
  }, []);

  useEffect(() => {
    if (!isMounted || isAuthenticated === null) return; // Ensure component is mounted

    if (isAuthenticated) {
      router.replace("(tabs)");
    } else {
      router.replace("/login");
    }
  }, [isAuthenticated, isMounted]);

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
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </Stack>
      </LanguageProvider>
    </ItemsProvider>
  );
};

export default RootLayout;
