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

// Mock data - replace with your actual data
const CLAIMED_ITEMS = [
  {
    id: "1",
    foodName: "Mixed Vegetables Curry",
    quantity: "5 servings",
    claimedDate: "2024-03-15",
    donorName: "Restaurant ABC",
    status: "Picked Up",
    image: "https://example.com/food1.jpg", // Replace with your image
  },
  {
    id: "2",
    foodName: "Rice and Dal",
    quantity: "10 servings",
    claimedDate: "2024-03-14",
    donorName: "Hotel XYZ",
    status: "Ready for Pickup",
    image: "https://example.com/food2.jpg", // Replace with your image
  },
  // Add more items
];

export default function ClaimedScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
    //  onPress={() => router.push(`/foodhistory/claimed/${item.id}`)}
    onPress={() => navigation.navigate("claimed-details", item)}  // Pass params

    >
      <Image
        source={{ uri: item.image }}
        style={styles.foodImage}
        defaultSource={require("../../../../assets/images/icon.png")} // Add a default image
      />

      <View style={styles.cardContent}>
        <Text style={styles.foodName}>{item.foodName}</Text>
        <Text style={styles.donorName}>From: {item.donorName}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.date}>Claimed: {item.claimedDate}</Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === "Picked Up" ? "#4CAF50" : "#FFA000",
              },
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
      {CLAIMED_ITEMS.length > 0 ? (
        <FlatList
          data={CLAIMED_ITEMS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="history" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No claimed items yet</Text>
        </View>
      )}
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
  donorName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  quantity: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
});
