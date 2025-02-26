import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Redirect } from "expo-router";
import DonatedLayout from "./donated/_layout";
import ClaimedLayout from "./claimed/_layout";

const TopTab = createMaterialTopTabNavigator();

export default function FoodHistoryScreen() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarIndicatorStyle: { backgroundColor: "#your_color" },
        tabBarStyle: { backgroundColor: "#FFFFFF" },
      }}
    >
      <TopTab.Screen name="donated" options={{ title: "Donated" }} component={DonatedLayout}/>
      <TopTab.Screen name="claimed" options={{ title: "Claimed" }} component={ClaimedLayout}/>
    </TopTab.Navigator>
  );
}
