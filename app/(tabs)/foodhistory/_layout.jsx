// app/tabs/_layout.js
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Claimed from "./claimed/_layout";
import Donated from "./donated/_layout";

const TopTabs = createMaterialTopTabNavigator();

export default function TopTabsLayout() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#2563eb",
        
        tabBarInactiveTintColor: "#64748b",
        tabBarIndicatorStyle: {
          backgroundColor: "#2563eb",
          height: 3,
        },
        tabBarStyle: {
          backgroundColor: "#ffffff",
          elevation: 0,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          textTransform: "none",
        },
      }}
    >
      <TopTabs.Screen
        name="claimed"
        component={Claimed}
        options={{ 
          title: "Claimed",
        }}
      />
      <TopTabs.Screen
        name="donated"
        component={Donated}
        options={{ 
          title: "Donated",
        }}
      />
    </TopTabs.Navigator>
  );
}
