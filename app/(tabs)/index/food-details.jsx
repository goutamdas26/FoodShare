// import { useRoute } from "@react-navigation/native";
// import React from "react";
// import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

// const FoodDetailsScreen = () => {
//   const route = useRoute();
//   const { name, image, quantity, category, location, donor, dateTime } = route.params;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image source={{ uri: image }} style={styles.image} />
//       <Text style={styles.name}>{name}</Text>

//       <View style={styles.infoContainer}>
//         <Text style={styles.label}>Quantity:</Text>
//         <Text style={styles.value}>{quantity}</Text>
//       </View>

//       <View style={styles.infoContainer}>
//         <Text style={styles.label}>Category:</Text>
//         <Text style={[styles.value, category === "Human" ? styles.humanCategory : styles.petCategory]}>
//           {category}
//         </Text>
//       </View>

//       <View style={styles.infoContainer}>
//         <Text style={styles.label}>Location :</Text>
//         <Text style={styles.value}>{location}</Text>
//       </View>

//       <View style={styles.infoContainer}>
//         <Text style={styles.label}>Donor:</Text>
//         <Text style={styles.value}>{donor}</Text>
//       </View>

//       <View style={styles.infoContainer}>
//         <Text style={styles.label}>Date & Time:</Text>
//         <Text style={styles.value}>{dateTime}</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   image: {
//     width: 250,
//     height: 250,
//     borderRadius: 15,
//     marginBottom: 20,
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#333",
//     marginBottom: 15,
//   },
//   infoContainer: {
//     flexDirection: "row",
//     width: "100%",
//     justifyContent: "space-between",
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#555",
//   },
//   value: {
//     fontSize: 18,
//     color: "#333",
//   },
//   humanCategory: {
//     color: "green",
//     fontWeight: "bold",
//   },
//   petCategory: {
//     color: "blue",
//     fontWeight: "bold",
//   },
// });

// export default FoodDetailsScreen;
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const Details = () => {
    const route = useRoute();
    const { name, image, quantity, category, location,  dateTime,donarName,donorContact } = route.params;


    return (
        <ScrollView style={styles.container}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            defaultSource={require("../../../assets/images/icon.png")}
          />
    
          <View style={styles.content}>
            <Text style={styles.title}>{name}</Text>
    
        
    
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Claim Details</Text>
              <View style={styles.detailRow}>
                <MaterialIcons name="event" size={20} color="#666" />
                <Text style={styles.detailText}>
                  Posted At: {dateTime}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="access-time" size={20} color="#666" />
                <Text style={styles.detailText}>
                  Category: {category}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="restaurant" size={20} color="#666" />
                <Text style={styles.detailText}>
                  Quantity: {quantity}
                </Text>
              </View>
            </View>
    
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Donor Information</Text>
              <View style={styles.detailRow}>
                <MaterialIcons name="store" size={20} color="#666" />
                <Text style={styles.detailText}>{donarName}</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="location-on" size={20} color="#666" />
                <Text style={styles.detailText}>{location}</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="phone" size={20} color="#666" />
                <Text style={styles.detailText}>{donorContact}</Text>
              </View>
            </View>
    
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{}</Text>
            </View>
          </View>
        </ScrollView>
      );
}

export default Details
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  statusContainer: {
    marginBottom: 16,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
})