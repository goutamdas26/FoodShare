import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import GoBackHeader from "../../../src/components/goBack";

export default function DonationDetailsScreen() {
  const route = useRoute();
  const donationDetails = route.params || {};

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
      <GoBackHeader/>
      <Image
        source={{ uri: donationDetails.foodItemId.images[0] }}
        style={styles.image}
        defaultSource={require("../../../assets/images/icon.png")}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{donationDetails.foodItemId?.name}</Text>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  donationDetails.foodItemId.status === "Available"
                    ? "#4CAF50"
                    : "#FFA000",
              },
            ]}
          >
            <Text style={styles.statusText}>
              {donationDetails.foodItemId.status}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Donation Details</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={20} color="#666" />
            <Text style={styles.detailText}>
              Donated By: {donationDetails.foodItemId.donorDetails?.name}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={20} color="#666" />
            <Text style={styles.detailText}>
              Posted at: {formatDate(donationDetails.foodItemId.postedAt)}  {formatTime(donationDetails.foodItemId.postedAt)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="schedule" size={20} color="#666" />
            <Text style={styles.detailText}>
              Expires at: {formatDate(donationDetails.foodItemId.expiry)} {formatTime(donationDetails.foodItemId.expiry)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="restaurant" size={20} color="#666" />
            <Text style={styles.detailText}>
              Quantity: {donationDetails.foodItemId.quantity}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="restaurant" size={20} color="#666" />
            <Text style={styles.detailText}>
              For: {donationDetails.foodItemId.category}s
            </Text>
          </View>
        </View>

        {donationDetails.foodItemId.claimedBy && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Claimed By</Text>
            <View style={styles.detailRow}>
              <MaterialIcons name="group" size={20} color="#666" />
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "user-details",
                    params: {
                      userId: donationDetails.foodItemId.claimedBy._id,
                    },
                  })
                }
              >
                <Text style={styles.detailText}>
                  {donationDetails.foodItemId.claimedBy.name}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="access-time" size={20} color="#666" />
              <Text style={styles.detailText}>
                Claimed at: {formatDate(donationDetails.foodItemId.createdAt)} {formatTime(donationDetails.foodItemId.createdAt)}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup Information</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={20} color="#666" />
            <Text style={styles.detailText}>
              {donationDetails.foodItemId.location}
            </Text>
          </View>
          <View style={styles.detailRow} >
            <MaterialIcons name="phone" size={20} color="#666" />
            <TouchableOpacity onPress={()=>Linking.openURL(`tel:+91${donationDetails.foodItemId.donorDetails.phone}`)}>
            <Text style={styles.detailText}>
              {donationDetails.foodItemId.donorDetails.phone}
            </Text>

            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {donationDetails.foodItemId.description}
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
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});
