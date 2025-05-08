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
  ActivityIndicator,
  Alert,
} from "react-native";
import { ItemsContext } from "../../../src/context/ItemContext";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Toast from "react-native-toast-message";

const AvailableFoodScreen = () => {
  const { items, loading, fetchItems } = useContext(ItemsContext);
  const [refreshing, setRefreshing] = useState(false);
  const [claimingItemId, setClaimingItemId] = useState(null);
  const navigation = useNavigation();
  const {API_URL}=useContext(ItemsContext)


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleClaim = async (food) => {
    try {
      setClaimingItemId(food._id);
      const userToken = await SecureStore.getItemAsync("userToken");

      const response = await axios.post(
        `${API_URL}/api/food/claim/${food._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to claim food");
      }

      Toast.show({
        type: "success",
        text1: "Food claimed successfully!",
      });

      await fetchItems();
    } catch (error) {
      if (error?.response?.status === 404) {
        Toast.show({
          type: "error",
          text1: error?.response?.data?.message,
        });
        await fetchItems();
        return;
      }
      Toast.show({
        type: "error",
        text1: "Failed to claim food",
      });
    } finally {
      setClaimingItemId(null);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FoodShare</Text>
      <Text style={styles.subHeader}>Food Available</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3F51B5" style={styles.loader} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.noFoodText}>No food available right now</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("food-details", item)}
            >
              <Image source={{ uri: item.images[0] }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodDetails}>{item.quantity}</Text>
                <Text style={styles.foodCategory}>Category: {item.category}</Text>
                <Text style={styles.foodDateTime}>
                  Date & Time: {formatDate(item.postedAt)} {formatTime(item.postedAt)}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.claimButton,
                    claimingItemId === item._id && { opacity: 0.6 },
                  ]}
                  onPress={() => {
                    Alert.alert(
                      "Confirm Claim",
                      "Do you really want to claim this food?",
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Yes",
                          onPress: () => handleClaim(item),
                        },
                      ],
                      { cancelable: true }
                    );
                  }}
                  
                  disabled={claimingItemId === item._id}
                >
                  {claimingItemId === item._id ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.claimText}>Claim</Text>
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "",
    marginBottom: 10,
    color: "#3F51B5",
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#3F51B5",
  },
  loader: { marginTop: 20 },
  noFoodText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#E8EAF6",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  info: { flex: 1 },
  foodName: { fontSize: 18, fontWeight: "bold", color: "#3F51B5" },
  foodDetails: { fontSize: 14, color: "gray" },
  foodCategory: { fontSize: 14, color: "#3F51B5" },
  foodDateTime: { fontSize: 14, color: "darkgray" },
  claimButton: {
    backgroundColor: "#3F51B5",
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  claimText: { color: "white", fontSize: 14, fontWeight: "bold" },
});

export default AvailableFoodScreen;
