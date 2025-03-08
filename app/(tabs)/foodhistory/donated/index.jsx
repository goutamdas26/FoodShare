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
import { useContext } from "react";
import { ItemsContext } from "../../../../src/context/ItemContext";

export default function DonatedScreen() {
  const { fetchDonatedFood, donatedFood } = useContext(ItemsContext);

  const router = useRouter();
  const navigation = useNavigation();
console.log(donatedFood)
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
      onPress={() => navigation.navigate("donation-details", item)} // Pass params
    >
      <Image
        source={{ uri: item.foodItemId.image }}
        style={styles.foodImage}
        defaultSource={require("../../../../assets/images/icon.png")}
      />

      <View style={styles.cardContent}>
        <Text style={styles.foodName}>{item.foodItemId.name}</Text>
        <Text style={styles.quantity}>Quantity: {item.foodItemId.quantity}</Text>

        {item.claimedBy && (
          <View style={styles.detailsRow}>
            <MaterialIcons name="group" size={16} color="#666" />
            <Text style={styles.claimedByText}>Claimed by: {item.claimedBy.name}</Text>
          </View>
        )}

        <View style={styles.bottomRow}>
          <Text style={styles.date}>Posted: {item.foodItemId.postedAt}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.foodItemId.status) },
            ]}
          >
            <Text style={styles.statusText}>{item.foodItemId.status}</Text>
          </View>
        </View>
      </View>

      <MaterialIcons name="chevron-right" size={24} color="#666" style={styles.arrow} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {donatedFood.length > 0 ? (
        <FlatList
          data={donatedFood}
          renderItem={renderItem}
          keyExtractor={(item) => item.foodItemId._id}
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
  claimedByText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Allows wrapping of long text without affecting status position
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#888",
    flex: 1, // Takes available space
    flexWrap: "wrap", // Ensures text wraps if long
    marginRight: 8, // Adds spacing from the status badge
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 70, // Prevents excessive shrinking
    alignItems: "center",
    justifyContent: "center",
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
