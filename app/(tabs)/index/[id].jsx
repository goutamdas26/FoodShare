import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function ClaimDetailsScreen() {
  const params = useLocalSearchParams();
console.log(params)
  // Mock data - replace with your actual data fetching logic
  const claimDetails = {
    id:params.id,
    foodName: "Mixed Vegetables Curry",
    quantity: "5 servings",
    claimedDate: "2024-03-15 14:30",
    pickupDate: "2024-03-15 16:45",
    donorName: "Restaurant ABC",
    donorAddress: "123 Food Street, City",
    donorContact: "+1234567890",
    status: "Picked Up",
    description:
      "Fresh vegetable curry with rice. Packed in disposable containers.",
    image: "https://example.com/food1.jpg", // Replace with your image
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: claimDetails.image }}
        style={styles.image}
        defaultSource={require("../../../assets/images/icon.png")}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{claimDetails.foodName}</Text>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  claimDetails.status === "Picked Up" ? "#4CAF50" : "#FFA000",
              },
            ]}
          >
            <Text style={styles.statusText}>{claimDetails.status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Claim Details</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={20} color="#666" />
            <Text style={styles.detailText}>
              Claimed: {claimDetails.claimedDate}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="access-time" size={20} color="#666" />
            <Text style={styles.detailText}>
              Pickup: {claimDetails.pickupDate}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="restaurant" size={20} color="#666" />
            <Text style={styles.detailText}>
              Quantity: {claimDetails.quantity}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Donor Information</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="store" size={20} color="#666" />
            <Text style={styles.detailText}>{claimDetails.donorName}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={20} color="#666" />
            <Text style={styles.detailText}>{claimDetails.donorAddress}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="phone" size={20} color="#666" />
            <Text style={styles.detailText}>{claimDetails.donorContact}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{claimDetails.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

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