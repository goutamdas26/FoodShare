import { Stack } from "expo-router";

export default function FoodHistoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "FoodHistory", headerShown: false }}
      />
      

    </Stack>
  );
}
