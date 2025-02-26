import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClaimedHistory from './index';
import ClaimedDetails from "./claimedDetails";


const Stack = createNativeStackNavigator();

export default function ClaimedHistoryLayout() {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="ClaimedHistory"
        component={ClaimedHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="claimedDetails" component={ClaimedDetails} />
    </Stack.Navigator>
  );
}
