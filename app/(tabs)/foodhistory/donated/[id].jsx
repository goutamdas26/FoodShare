import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function DonationDetailsScreen() {
  const { id } = useLocalSearchParams();

  // Mock data - replace with your actual data fetching logic
  const donationDetails = {
    id,
    foodName: "Vegetable Biryani",
    quantity: "20 servings",
    donationDate: "2024-03-15 14:30",
    expiryTime: "2024-03-15 20:00",
    status: "Claimed",
    claimedBy: "NGO Foundation",
    claimedAt: "2024-03-15 15:45",
    description:
      "Freshly prepared vegetable biryani. Contains rice, mixed vegetables, and mild spices.",
    pickupAddress: "123 Restaurant Lane, City",
    contactNumber: "+1234567890",
    image: "https://example.com/food1.jpg",
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: donationDetails.image }}
        style={styles.image}
        defaultSource={require("../../../../assets/images/icon.png")}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{donationDetails.foodName}</Text>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  donationDetails.status === "Available"
                    ? "#4CAF50"
                    : "#FFA000",
              },
            ]}
          >
            <Text style={styles.statusText}>{donationDetails.status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Donation Details</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={20} color="#666" />
            <Text style={styles.detailText}>
              Posted: {donationDetails.donationDate}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="schedule" size={20} color="#666" />
            <Text style={styles.detailText}>
              Expires at: {donationDetails.expiryTime}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="restaurant" size={20} color="#666" />
            <Text style={styles.detailText}>
              Quantity: {donationDetails.quantity}
            </Text>
          </View>
        </View>

        {donationDetails.claimedBy && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Claimed By</Text>
            <View style={styles.detailRow}>
              <MaterialIcons name="group" size={20} color="#666" />
              <Text style={styles.detailText}>{donationDetails.claimedBy}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="access-time" size={20} color="#666" />
              <Text style={styles.detailText}>
                Claimed at: {donationDetails.claimedAt}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup Information</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={20} color="#666" />
            <Text style={styles.detailText}>
              {donationDetails.pickupAddress}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="phone" size={20} color="#666" />
            <Text style={styles.detailText}>
              {donationDetails.contactNumber}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{donationDetails.description}</Text>
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
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});
