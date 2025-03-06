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
import { ItemsContext } from "../../../../src/context/ItemContext";
import { useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

// Mock data - replace with your actual data
const CLAIMED_ITEMS = [
  {
    id: "1",
    foodName: "Dal",
    quantity: "20 servings",
    claimedDate: "2024-03-15 14:30",
    expiryTime: "2024-03-15 20:00",
    status: "Claimed",
    donorName: "NGO Foundation",
    claimedAt: "2024-03-15 15:45",
    description:
      "Freshly prepared vegetable biryani. Contains rice, mixed vegetables, and mild spices.",
    pickupLocation: "123 Restaurant Lane, City",
    contactNumber: "+123456789",
    image: "https://example.com/food1.jpg",
  },
  {
    id: "2",
    foodName: "Vegetable Biryani",
    quantity: "20 servings",
    claimedDate: "2024-03-15 14:30",
    expiryTime: "2024-03-15 20:00",
    status: "Claimed",
    donorName: "NGO Foundation",
    claimedAt: "2024-03-15 15:45",
    description:
      "Freshly prepared vegetable biryani. Contains rice, mixed vegetables, and mild spices.",
    pickupLocation: "123 Restaurant Lane, City",
    contactNumber: "+123456789",
    image: "https://example.com/food1.jpg",
  },
];

export default function ClaimedScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { fetchClaimedFood,  claimedFood } =
    useContext(ItemsContext);


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      //  onPress={() => router.push(`/foodhistory/claimed/${item.id}`)}
      onPress={() => navigation.navigate("claimed-details", item)} // Pass params
    >
      <Image
        source={{ uri: item.foodItemId.image }}
        style={styles.foodImage}
        defaultSource={require("../../../../assets/images/icon.png")} // Add a default image
      />

      <View style={styles.cardContent}>
        <Text style={styles.foodName}>{item.foodItemId.name}</Text>
        <Text style={styles.donorName}>From: {item.foodItemId.donorName}</Text>
        <Text style={styles.quantity}>
          Quantity: {item.foodItemId.quantity}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.date}>Claimed: {item.claimedAt}</Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === "Picked Up" ? "#4CAF50" : "#FFA000",
              },
            ]}
          >
            <Text style={styles.statusText}>{item.foodItemId.status}</Text>
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
      {claimedFood.length > 0 ? (
        <FlatList
          data={claimedFood}
          renderItem={renderItem}
          keyExtractor={(item) => item.foodItemId._id}
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
