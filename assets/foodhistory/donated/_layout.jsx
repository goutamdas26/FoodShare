import { Stack } from "expo-router";

export default function DonatedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: "Donation Details",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
