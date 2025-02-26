import { Stack } from "expo-router";
import React from "react";

export default function DonateLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Shop", headerShown: false }}
      />
      
    </Stack>
  );
}
