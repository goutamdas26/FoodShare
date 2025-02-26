import { Stack } from "expo-router";

export default function NgoLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Shop", headerShown: false }}
      />
      
    </Stack>
  );
}
