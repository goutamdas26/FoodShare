import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Shop", headerShown: false }}
      />
      <Stack.Screen
        name="updateprofile"
        options={{ title: "Update Profile", headerShown: true }}
      />
      <Stack.Screen
        name="kycverify"
        options={{ title: "Verification", headerShown: true }}
      />
      <Stack.Screen
        name="contact-us"
        options={{ title: "Contact Us", headerShown: true }}
      />
    </Stack>
  );
}
