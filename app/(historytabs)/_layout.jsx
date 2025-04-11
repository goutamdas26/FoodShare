import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const FoodHistoryStack = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4B0082', // Indigo
        tabBarInactiveTintColor: '#A9A9A9',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: '#f8f8ff', // light indigo background
          borderTopColor: '#dcdcdc',
          height: 60,
          paddingBottom: 8,
          elevation: 10, // for Android shadow
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="claimed"
        options={{
          title: 'Claimed Food',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="donated"
        options={{
          title: 'Donated Food',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default FoodHistoryStack;

