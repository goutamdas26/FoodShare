
// export default FoodDetailsScreen;
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const Details = () => {
    const route = useRoute();
    const {
      name,
      image,
      quantity,
      category,
      location,
      dateTime,
      donorName,
      donorContact,
      postedAt,
    } = route.params;


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
            <Text style={styles.sectionTitle}>Food Details</Text>
            <View style={styles.detailRow}>
              <MaterialIcons name="event" size={20} color="#666" />
              <Text style={styles.detailText}>Posted At: {postedAt}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="access-time" size={20} color="#666" />
              <Text style={styles.detailText}>Category: {category}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="restaurant" size={20} color="#666" />
              <Text style={styles.detailText}>Quantity: {quantity}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Donor Information</Text>
            <View style={styles.detailRow}>
              <MaterialIcons name="store" size={20} color="#666" />
              <Text style={styles.detailText}>{donorName}</Text>
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