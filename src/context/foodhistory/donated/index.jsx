// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { MaterialIcons } from "@expo/vector-icons";

// // Mock data - replace with your actual data
// const DONATED_ITEMS = [
//   {
//     id: "1",
//     foodName: "Vegetable Biryani",
//     quantity: "20 servings",
//     donationDate: "2024-03-15",
//     expiryTime: "2024-03-15 20:00",
//     status: "Claimed",
//     claimedBy: "NGO Foundation",
//     image: "https://example.com/food1.jpg",
//   },
//   {
//     id: "2",
//     foodName: "Mixed Curry & Rice",
//     quantity: "15 servings",
//     donationDate: "2024-03-14",
//     expiryTime: "2024-03-14 21:00",
//     status: "Available",
//     claimedBy: null,
//     image: "https://example.com/food2.jpg",
//   },
//   // Add more items
// ];

// export default function DonatedScreen() {
//   const router = useRouter();

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Available":
//         return "#4CAF50";
//       case "Claimed":
//         return "#FFA000";
//       case "Expired":
//         return "#F44336";
//       default:
//         return "#999";
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => router.push(`/(tabs)/foodhistory/donated/${item.id}`)}
//     >
//       <Image
//         source={{ uri: item.image }}
//         style={styles.foodImage}
//         defaultSource={require("../../../../assets/images/icon.png")}
//       />

//       <View style={styles.cardContent}>
//         <Text style={styles.foodName}>{item.foodName}</Text>
//         <Text style={styles.quantity}>Quantity: {item.quantity}</Text>

//         <View style={styles.detailsRow}>
//           <MaterialIcons name="schedule" size={16} color="#666" />
//           <Text style={styles.timeText}>Expires: {item.expiryTime}</Text>
//         </View>

//         {item.claimedBy && (
//           <View style={styles.detailsRow}>
//             <MaterialIcons name="group" size={16} color="#666" />
//             <Text style={styles.claimedByText}>
//               Claimed by: {item.claimedBy}
//             </Text>
//           </View>
//         )}

//         <View style={styles.bottomRow}>
//           <Text style={styles.date}>Posted: {item.donationDate}</Text>
//           <View
//             style={[
//               styles.statusBadge,
//               { backgroundColor: getStatusColor(item.status) },
//             ]}
//           >
//             <Text style={styles.statusText}>{item.status}</Text>
//           </View>
//         </View>
//       </View>

//       <MaterialIcons
//         name="chevron-right"
//         size={24}
//         color="#666"
//         style={styles.arrow}
//       />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {DONATED_ITEMS.length > 0 ? (
//         <FlatList
//           data={DONATED_ITEMS}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={styles.listContainer}
//           showsVerticalScrollIndicator={false}
//         />
//       ) : (
//         <View style={styles.emptyContainer}>
//           <MaterialIcons name="volunteer-activism" size={64} color="#ccc" />
//           <Text style={styles.emptyText}>No donations yet</Text>
//           <Text style={styles.emptySubText}>
//             Your donated items will appear here
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   listContainer: {
//     padding: 16,
//   },
//   card: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     marginBottom: 16,
//     padding: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   foodImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   cardContent: {
//     flex: 1,
//   },
//   foodName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 4,
//   },
//   quantity: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 4,
//   },
//   detailsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   timeText: {
//     fontSize: 13,
//     color: "#666",
//     marginLeft: 4,
//   },
//   claimedByText: {
//     fontSize: 13,
//     color: "#666",
//     marginLeft: 4,
//   },
//   bottomRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 4,
//   },
//   date: {
//     fontSize: 12,
//     color: "#888",
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   statusText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "500",
//   },
//   arrow: {
//     marginLeft: 8,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   emptyText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: "#666",
//     fontWeight: "500",
//   },
//   emptySubText: {
//     marginTop: 8,
//     fontSize: 14,
//     color: "#999",
//   },
// });

import { useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const donatedItems = [
  { id: "1", name: "Bread", description: "Fresh bakery bread" },
  { id: "2", name: "Rice", description: "5kg rice pack" },
];

export default function DonatedScreen() {
  const router = useRouter();

  return (
    <View>
      <FlatList
        data={donatedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/(tabs)/foodhistory/donated/${item.id}`)}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
