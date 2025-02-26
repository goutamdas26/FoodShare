import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Donated from "./donated";
import Claimed from "./claimed";
import DonatedHistoryLayout from "./donated/_layout";
import ClaimedHistoryLayout from "./claimed/_layout";
const Tab = createMaterialTopTabNavigator();
const FoodHistory = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Donated" component={DonatedHistoryLayout} />
      <Tab.Screen name="claimed" component={ClaimedHistoryLayout} />
    </Tab.Navigator>
  );
};

export default FoodHistory;

const styles = StyleSheet.create({});
