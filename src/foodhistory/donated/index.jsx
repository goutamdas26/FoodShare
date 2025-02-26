
// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { Link } from 'expo-router'; // Import Link for navigation

// const DonatedHistory = () => {
//   const donatedItems = [
//     {
//       id: 1,
//       name: "Surplus Rice",
//       quantity: "5 kg",
//       date: "2025-02-05",
//       description: "High-quality rice donated by XYZ.",
//     },
//     {
//       id: 2,
//       name: "Leftover Bread",
//       quantity: "10 loaves",
//       date: "2025-02-03",
//       description: "Freshly baked bread surplus.",
//     },
//     {
//       id: 3,
//       name: "Canned Vegetables",
//       quantity: "20 cans",
//       date: "2025-02-02",
//       description: "Canned vegetables ready for donation.",
//     },
//     // Add more items as needed
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Donated Food History</Text>

//       <ScrollView style={styles.scrollContainer}>
//         {donatedItems.map((item) => (
//           <View key={item.id} style={styles.itemContainer}>
//             <Text style={styles.itemName}>{item.name}</Text>
//             <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
//             <Text style={styles.itemDetails}>Date Donated: {item.date}</Text>
//             <Link href={`/foodhistory/donated/donationDetails`} style={styles.button}>
//               <Text style={styles.buttonText}>Details</Text>
//             </Link>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   itemContainer: {
//     backgroundColor: '#f8f8f8',
//     borderRadius: 10,
//     padding: 15,
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   itemDetails: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   button: {
//     backgroundColor: '#ffcc00',
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default DonatedHistory;


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const DonatedHistory = () => {
  const router = useRouter();

  const donatedItems = [
    {
      id: 1,
      name: "Surplus Rice",
      quantity: "5 kg",
      date: "2025-02-05",
      description: "High-quality rice donated by XYZ.",
      receiver: "John Doe",
    },
    {
      id: 2,
      name: "Leftover Bread",
      quantity: "10 loaves",
      date: "2025-02-03",
      description: "Freshly baked bread surplus.",
      receiver: "Emma Smith",
    },
    {
      id: 3,
      name: "Canned Vegetables",
      quantity: "20 cans",
      date: "2025-02-02",
      description: "Canned vegetables ready for donation.",
      receiver: "Mark Wilson",
    },
  ];

  const handleDetailsPress = (item) => {
    router.push({
      pathname: "/foodhistory/donated/donationDetails",
      params: {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        date: item.date,
        description: item.description,
        receiver: item.receiver,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Donated Food History</Text>

      <ScrollView style={styles.scrollContainer}>
        {donatedItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemDetails}>Date Donated: {item.date}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDetailsPress(item)}
            >
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  itemDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#ffcc00",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DonatedHistory;
