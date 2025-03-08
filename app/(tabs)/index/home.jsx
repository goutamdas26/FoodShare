import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { ItemsContext } from "../../../src/context/ItemContext";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const AvailableFoodScreen = () => {
  const { items, loading, fetchItems } = useContext(ItemsContext);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const API_URL = Constants.expoConfig.extra.API_URL;

  useEffect(() => {
    console.log("Component re-rendered");
  }, []);

  const handleClaim = async (food) => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");

      const response = await fetch(`${API_URL}/api/food/claim/${food._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to claim food");
      }

      alert("Food claimed successfully!");
      await fetchItems(); // Refresh the food list
    } catch (error) {
      console.error("Error claiming food:", error.message);
      alert(error.message);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Food</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View>
            <Text style={styles.noFoodText}>No food available right now</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("food-details", item)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodDetails}>{item.quantity}</Text>
              <Text style={styles.foodCategory}>
                Category: {item.category}
              </Text>
              <Text style={styles.foodDateTime}>
                Date & Time: {item.postedAt}
              </Text>
              <TouchableOpacity
                style={styles.claimButton}
                onPress={() => handleClaim(item)}
              >
                <Text style={styles.claimText}>Claim</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  noFoodText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  info: { flex: 1 },
  foodName: { fontSize: 18, fontWeight: "bold" },
  foodDetails: { fontSize: 14, color: "gray" },
  foodCategory: { fontSize: 14, color: "blue" },
  foodDateTime: { fontSize: 14, color: "darkgray" },
  claimButton: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: "center",
  },
  claimText: { color: "white", fontSize: 14, fontWeight: "bold" },
});

export default AvailableFoodScreen;
