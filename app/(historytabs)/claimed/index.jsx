import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ItemsContext } from "../../../src/context/ItemContext";
import { useContext, useEffect, useState } from "react";
import GoBackHeader from "../../../src/components/goBack";

export default function ClaimedScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { fetchClaimedFood, claimedFood } = useContext(ItemsContext);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchClaimedFood();
    setRefreshing(false);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchClaimedFood();
      setLoading(false);
    };
    loadData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("claimed-details", item)}
    >
      <Image
        source={
          item.foodItemId.images
            ? { uri: item.foodItemId.images[0] }
            : require("../../../assets/images/icon.png")
        }
        style={styles.foodImage}
      />

      <View style={styles.cardContent}>
        <Text style={styles.foodName}>{item.foodItemId.name}</Text>
        <Text style={styles.donorName}>From: {item.foodItemId.donor.name}</Text>
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
                  item.foodItemId.status === "Picked Up" ? "#4CAF50" : "#FFA000",
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <GoBackHeader />
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{position:"absolute"
        ,textAlign:"center",
        top:30,left:"35%",fontSize:20,fontWeight:"bold"
      }}>Claimed Food</Text>
      <GoBackHeader />
      
      <FlatList
        data={claimedFood}
        renderItem={renderItem}
        keyExtractor={(item) => item.foodItemId._id}
        contentContainerStyle={[
          styles.listContainer,
          claimedFood.length === 0 && { flex: 1, justifyContent: "flex-start" },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="history" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No claimed items yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 70, // for header spacing
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 70,
    justifyContent: "center",
    alignItems: "center",
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
    shadowOffset: { width: 0, height: 2 },
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
    color: "#3F51B5",
    marginBottom: 4,
  },
  donorName: {
    fontSize: 14,
    color: "#3F51B5",
    marginBottom: 2,
  },
  quantity: {
    fontSize: 14,
    color: "#3F51B5",
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: "#888",
    flexWrap: "wrap",
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
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "#3F51B5",
  },
});
