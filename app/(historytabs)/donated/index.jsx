import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl, // Import RefreshControl
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";




import { useContext, useState, useEffect } from "react"; // Import useState and useEffect
import { ItemsContext } from "../../../src/context/ItemContext";
import GoBackHeader from "../../../src/components/goBack";

export default function DonatedScreen() {
  const { fetchDonatedFood, donatedFood } = useContext(ItemsContext);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing


  const navigation = useNavigation();

  useEffect(() => {
    fetchDonatedFood(); // Log donatedFood only when it changes
  }, []);

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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Local date format
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("donation-details", item)} // Pass params
    >
      <Image
        source={{ uri: item.foodItemId.images[0] }}
        style={styles.foodImage}
        defaultSource={"https://res.cloudinary.com/dl92zh3w0/image/upload/v1744538923/knife-fork-and-plate-circular-icon-vector_sfbhgq.jpg"}
      />

      <View style={styles.cardContent}>
        <Text style={styles.foodName}>{item.foodItemId.name}</Text>
        <Text style={styles.quantity}>
          Quantity: {item.foodItemId.quantity}
        </Text>

        {item.foodItemId.claimedBy ? (
          <View style={styles.detailsRow}>
            <MaterialIcons name="group" size={16} color="#666" />
            <Text style={styles.claimedByText}>
              Claimed by: {item.foodItemId.claimedBy.name}
            </Text>
          </View>
        ):(<View style={styles.detailsRow}>
          <MaterialIcons name="group" size={16} color="#666" />
          <Text style={styles.claimedByText}>
            Claimed by: NA
          </Text>
        </View>)}

        <View style={styles.bottomRow}>
          <Text style={styles.date}>
            Posted: {formatDate(item.foodItemId.postedAt)}
          </Text>
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
    await fetchDonatedFood(); // Fetch donated food again
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <GoBackHeader/>
      <Text style={{position:"absolute"
        ,textAlign:"center",
        top:30,left:"35%",fontSize:20,fontWeight:"bold"
      }}>Donated Food</Text>
      {donatedFood.length > 0 ? (
        <FlatList
          data={donatedFood}
          renderItem={renderItem}
          keyExtractor={(item) => item.foodItemId._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <FlatList
          data={[]} // empty data
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="volunteer-activism" size={64} color="#ccc" />
              <Text style={styles.emptyText}>No donations yet</Text>
              <Text style={styles.emptySubText}>
                Your donated items will appear here
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ flexGrow: 1 }}
        />
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
    top:50,
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
