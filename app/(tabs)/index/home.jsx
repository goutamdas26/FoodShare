import { useRoute } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ItemsContext } from "../../../src/context/ItemContext";
const foodData = [
  {
    id: "1",
    name: "Veg Biryani",
    image: "https://via.placeholder.com/150",
    quantity: "2 plates",
    category: "Human",
    location: "Sector 22, Chandigarh",
    donor: "John Doe",
    dateTime: "2025-02-10 14:30",
  },
  {
    id: "2",
    name: "Chicken Rice",
    image: "https://via.placeholder.com/150",
    quantity: "1 plate",
    category: "Pet",
    location: "MG Road, Bangalore",
    donor: "Jane Smith",
    dateTime: "2025-02-10 16:00",
  },
  {
    id: "3",
    name: "Dal & Roti",
    image: "https://via.placeholder.com/150",
    quantity: "3 plates",
    category: "Human",
    location: "Connaught Place, Delhi",
    donor: "Raj Kumar",
    dateTime: "2025-02-10 18:15",
  },
];

const AvailableFoodScreen = () => {
  const { items, loading, fetchItems } = useContext(ItemsContext);
  console.log(items)
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Food</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={()=>router.push({pathname:"/(tabs)/${item.id}"})}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodDetails}>{item.quantity}</Text>
              <Text style={styles.foodCategory}>Category: {item.category}</Text>
              <Text style={styles.foodDateTime}>
                Date & Time: {item.dateTime}
              </Text>
              <TouchableOpacity
                style={styles.claimButton}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/2",
                  })
                }
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
