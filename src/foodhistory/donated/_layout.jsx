import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DonatedHistory from ".";
import DonationDetails from "./donationDetails";


const Stack = createNativeStackNavigator();

export default function DonatedHistoryLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DonatedHistory" component={DonatedHistory}  options={{
        headerShown:false
      }}/>
      <Stack.Screen name="donationDetails" component={DonationDetails}  options={{
        headerShown:false
      }}/>
    </Stack.Navigator>
  );
}
