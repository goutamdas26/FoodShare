import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl, // Import RefreshControl
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ItemsContext } from "../../../../src/context/ItemContext";
import { useContext, useEffect, useState } from "react"; // Import useState

export default function ClaimedScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { fetchClaimedFood, claimedFood } = useContext(ItemsContext);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
console.log(JSON.stringify(claimedFood[0],null,2))
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("claimed-details", item)} // Pass params
    >
      <Image
        source={{ uri: item.foodItemId.imageUrl }} // Use dynamic image URL from item
        style={styles.foodImage}
        defaultSource={require("../../../../assets/images/icon.png")} // Default image
      />

      <View style={styles.cardContent}>
        <Text style={styles.foodName}>{item.foodItemId.name}</Text>
        <Text style={styles.donorName}>From: {item.foodItemId.donorName}</Text>
        <Text style={styles.quantity}>
          Quantity: {item.foodItemId.quantity}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              Claimed: {new Date(item.claimedAt).toLocaleString()}
            </Text>
          </View>
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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchClaimedFood(); // Fetch claimed food again
    setRefreshing(false);
  };
useEffect(()=>{
fetchClaimedFood()
},[])
  return (
    <View style={styles.container}>
      {claimedFood.length > 0 ?  (
        <FlatList
          data={claimedFood}
          renderItem={renderItem}
          keyExtractor={(item) => item.foodItemId._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Add RefreshControl
          }
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
    color: "#3F51B5", // Changed to indigo 500
    marginBottom: 4,
  },
  donorName: {
    fontSize: 14,
    color: "#3F51B5", // Changed to indigo 500
    marginBottom: 2,
  },
  quantity: {
    fontSize: 14,
    color: "#3F51B5", // Changed to indigo 500
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    flex: 1, // Ensures the date text takes available space
  },
  date: {
    fontSize: 12,
    color: "#888",
    flexWrap: "wrap", // Allows wrapping if text is long
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
    color: "#3F51B5", // Changed to indigo 500
  },
});
