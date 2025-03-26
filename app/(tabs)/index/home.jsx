// import { useNavigation } from "@react-navigation/native";
// import React, { useContext, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   RefreshControl,
// } from "react-native";
// import { ItemsContext } from "../../../src/context/ItemContext";
// import Constants from "expo-constants";
// import * as SecureStore from "expo-secure-store";

// const AvailableFoodScreen = () => {
//   const { items, loading, fetchItems } = useContext(ItemsContext);
//   const [refreshing, setRefreshing] = useState(false);
//   const navigation = useNavigation();
//   const API_URL = Constants.expoConfig.extra.API_URL;

//   useEffect(() => {
//     console.log("Component re-rendered");
//   }, []);

//   const handleClaim = async (food) => {
//     try {
//       const userToken = await SecureStore.getItemAsync("userToken");

//       const response = await fetch(`${API_URL}/api/food/claim/${food._id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`,
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to claim food");
//       }

//       alert("Food claimed successfully!");
//       await fetchItems(); // Refresh the food list
//     } catch (error) {
//       console.error("Error claiming food:", error.message);
//       alert(error.message);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchItems();
//     setRefreshing(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>FoodShare</Text> 
//       <Text style={styles.subHeader}>Food Available</Text>
//       <FlatList
//         data={items}
//         keyExtractor={(item) => item._id}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         ListEmptyComponent={
//           <View>
//             <Text style={styles.noFoodText}>No food available right now</Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => navigation.navigate("food-details", item)}
//           >
//             <Image source={ {uri:"https://res.cloudinary.com/dl92zh3w0/image/upload/v1741443893/raw-veg_r8toib.png"}} style={styles.image} />
//             <View style={styles.info}>
//               <Text style={styles.foodName}>{item.name}</Text>
//               <Text style={styles.foodDetails}>{item.quantity}</Text>
//               <Text style={styles.foodCategory}>
//                 Category: {item.category}
//               </Text>
//               <Text style={styles.foodDateTime}>
//                 Date & Time: {item.postedAt}
//               </Text>
//               <TouchableOpacity
//                 style={styles.claimButton}
//                 onPress={() => handleClaim(item)}
//               >
//                 <Text style={styles.claimText}>Claim</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   header: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//     color: "#3F51B5", // Indigo 500
//   },
//   subHeader: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#3F51B5", // Indigo 500
//   },
//   noFoodText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 20,
//     color: "gray",
//   },
//   card: {
//     flexDirection: "row",
//     backgroundColor: "#E8EAF6", // Light Indigo
//     borderRadius: 10,
//     marginBottom: 15,
//     padding: 10,
//     alignItems: "center",
//   },
//   image: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
//   info: { flex: 1 },
//   foodName: { fontSize: 18, fontWeight: "bold", color: "#3F51B5" }, // Indigo 500
//   foodDetails: { fontSize: 14, color: "gray" },
//   foodCategory: { fontSize: 14, color: "#3F51B5" }, // Indigo 500
//   foodDateTime: { fontSize: 14, color: "darkgray" },
//   claimButton: {
//     backgroundColor: "#3F51B5", // Indigo 500
//     padding: 8,
//     borderRadius: 5,
//     marginTop: 5,
//     alignItems: "center",
//   },
//   claimText: { color: "white", fontSize: 14, fontWeight: "bold" },
// });

// export default AvailableFoodScreen;


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
    fetchItems();
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
      await fetchItems();
    } catch (error) {
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
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dl92zh3w0/image/upload/v1741443893/raw-veg_r8toib.png",
                }}
                style={styles.image}
              />
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
  loader: {
    marginTop: 20,
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
  },
  claimText: { color: "white", fontSize: 14, fontWeight: "bold" },
});

export default AvailableFoodScreen;
