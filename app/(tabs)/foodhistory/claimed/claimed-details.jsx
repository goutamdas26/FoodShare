import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function ClaimDetailsScreen() {

  const route = useRoute();
  const claimDetails = route.params || {}; 
  // Mock data - replace with your actual data fetching logic
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // Local date format
    };
    const formatTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleTimeString(); // Local date format
    };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: claimDetails.image }}
        style={styles.image}
        defaultSource={require("../../../../assets/images/icon.png")}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{claimDetails.foodItemId.name}</Text>

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
            <Text style={styles.statusText}>
              {claimDetails.foodItemId.status}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Claim Details</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={20} color="#666" />
            <Text style={styles.detailText}>
              Claimed at: {formatDate(claimDetails.claimedAt)} {" "}  
              {formatTime(claimDetails.claimedAt)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="restaurant" size={20} color="#666" />
            <Text style={styles.detailText}>
              Quantity: {claimDetails.foodItemId.quantity}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Donor Information</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="store" size={20} color="#666" />
            <Text style={styles.detailText}>
              {claimDetails.foodItemId.donorDetails.name}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={20} color="#666" />
            <Text style={styles.detailText}>
              {claimDetails.foodItemId.location}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="phone" size={20} color="#666" />
            <Text style={styles.detailText}>
              {claimDetails.foodItemId.donorDetails.phone}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {claimDetails.foodItemId.description}
          </Text>
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
});
