import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BDetails from "./bhandara-details";


import FoodCharityScreen from "./index";

const EventStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="index"
        component={FoodCharityScreen}
        options={{
          title: "Food Charity Events",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="event-details"
        component={BDetails}
        options={{
          title: "Event Details",
        }}
      />

  
    </Stack.Navigator>
  );
};

export default EventStack;
