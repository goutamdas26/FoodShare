import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ItemsProvider } from "../../src/context/ItemContext";
import { Image } from "react-native";
import charityIcon from '../../assets/images/charity.png'

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? "#3F51B5" : color}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="donate"
        options={{
          title: "Donate",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="food-variant"
              size={size}
              color={focused ? "#3F51B5" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ngo"
        options={{
          title: "About Us",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="hand-holding-heart"
              size={size}
              color={focused ? "#3F51B5" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="charityevent"
        options={{
          title: "Charity Events",
          tabBarIcon: () => (
            <Image
              source={charityIcon} // Replace with your image URL
              style={{ width: 24, height: 24 }} // Adjust size as needed
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="person"
              size={size}
              color={focused ? "#3F51B5" : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}