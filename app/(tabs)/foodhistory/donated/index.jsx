import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig.extra.API_URL;
import axios from "axios";
// Mock data - replace with your actual data
const DONATED_ITEMS = [
  {
    id: "1",
    foodName: "Vegetable Biryani",
    quantity: "20 servings",
    donationDate: "2024-03-15 14:30",
    expiryTime: "2024-03-15 20:00",
    status: "Claimed",
    claimedBy: "NGO Foundation",
    claimedAt: "2024-03-15 15:45",
    description:
      "Freshly prepared vegetable biryani. Contains rice, mixed vegetables, and mild spices.",
    pickupAddress: "123 Restaurant Lane, City",
    contactNumber: "+1234567890",
    image: "https://example.com/food1.jpg",
  },
  {
    id: "2",
    foodName: "Vegetable Biryani",
    quantity: "20 servings",
    donationDate: "2024-03-15 14:30",
    expiryTime: "2024-03-15 20:00",
    status: "Claimed",
    claimedBy: "NGO Foundation",
    claimedAt: "2024-03-15 15:45",
    description:
      "Freshly prepared vegetable biryani. Contains rice, mixed vegetables, and mild spices.",
    pickupAddress: "123 Restaurant Lane, City",
    contactNumber: "+1234567890",
    image: "https://example.com/food1.jpg",
  },
];

export default function DonatedScreen() {
  const fetchDonatedFood = async () => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");
      if (!userToken) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/food/getClaimedFood`,
        {}, // Empty body if not required
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Donated Food:", response.data);
      // Process response.data as needed
    } catch (error) {
      console.error("Error fetching donated food:", error);
    }
  };

  const router = useRouter();
  const navigation = useNavigation();
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "#4CAF50";
      case "Claimed":
        return "#FFA000";
      case "Expired":
        return "#F44336";
      default:
        return "#999";
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      // onPress={() => router.push(`/(tabs)/foodhistory/donated/${item.id}`)}
      onPress={() => navigation.navigate("donation-details", item)} // Pass params
    >
      <Image
        source={{ uri: item.image }}
        style={styles.foodImage}
        defaultSource={require("../../../../assets/images/icon.png")}
      />

      <View style={styles.cardContent}>
        <Text style={styles.foodName}>{item.foodName}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>

        <View style={styles.detailsRow}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.timeText}>Expires: {item.expiryTime}</Text>
        </View>

        {item.claimedBy && (
          <View style={styles.detailsRow}>
            <MaterialIcons name="group" size={16} color="#666" />
            <Text style={styles.claimedByText}>
              Claimed by: {item.claimedBy}
            </Text>
          </View>
        )}

        <View style={styles.bottomRow}>
          <Text style={styles.date}>Posted: {item.donationDate}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>

      <MaterialIcons
        name="chevron-right"
        size={24}
        color="#666"
        style={styles.arrow}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {DONATED_ITEMS.length > 0 ? (
        <FlatList
          data={DONATED_ITEMS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="volunteer-activism" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No donations yet</Text>
          <Text style={styles.emptySubText}>
            Your donated items will appear here
          </Text>
        </View>
      )}
      <TouchableOpacity onPress={fetchDonatedFood}>
        <Text>sfdsdf</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  timeText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  claimedByText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  arrow: {
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  emptySubText: {
    marginTop: 8,
    fontSize: 14,
    color: "#999",
  },
});
