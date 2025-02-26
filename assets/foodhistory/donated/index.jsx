import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function DonatedScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => router.push("/foodhistory/donated/123")}>
        <Text>View Donation Details</Text>
      </TouchableOpacity>
    </View>
  );
}
