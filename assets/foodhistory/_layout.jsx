import { Tabs } from "expo-router/tabs";
import { Stack } from "expo-router";

export default function FoodHistoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Food History",
          headerTitleAlign: "center",
        }}
      />
     
    </Stack>
  );
}
