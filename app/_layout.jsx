


import Toast from "react-native-toast-message";
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
      router.replace("/(tabs)");
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
      <Stack
  screenOptions={{
    headerShown: false,
    animation: "fade", // smooth fade transition
    animationTypeForReplace: "push",
  }}
>
  <Stack.Screen name="(tabs)" />
  <Stack.Screen name="login" />
  <Stack.Screen name="signup" />
  <Stack.Screen name="otp" />
  <Stack.Screen
    name="list"
    options={{
      presentation: "modal", // makes it a modal
      animation: "fade",     // fade animation
      headerShown: true,
      title: "Add Event",
    }}
  />
</Stack>

        <Toast/>
      </LanguageProvider>
    </ItemsProvider>
  );
};

export default RootLayout;
