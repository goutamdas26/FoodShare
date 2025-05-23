import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const Details = () => {
  const route = useRoute();
  const {
    name,
    images , // Ensure it's an array
    quantity,
    category,
    location,
    donorDetails,
    donor,
    expiry,
    postedAt,
    description,
  } = route.params || {};
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Local date format
};
const formatTime = (timeString) => {
    const date = new Date(timeString);
 
    return date.toLocaleTimeString(); // Local date format
};
  // Handle missing images array
  const validImages = Array.isArray(images) && images.length > 0 ? images : [
    "https://via.placeholder.com/400", // Fallback image
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ScrollView style={styles.container}>
      {/* Image Slider */}
      <View>
        <FlatList
          data={validImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onScroll={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
        />
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {validImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Details</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={20} color="#666" />
            <Text style={styles.detailText}>Posted At: {formatDate(postedAt)} {formatTime(postedAt)}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={20} color="#666" />
            <Text style={styles.detailText}>Expire At: {formatDate(expiry)} {formatTime(expiry)}</Text>
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
          <TouchableOpacity style={styles.detailRow} onPress={() =>
                  router.push({
                    pathname: "user-details",
                    params: {
                      userId: donor._id,
                    },
                  })
                }>
            <MaterialIcons name="store" size={20} color="#666" />
            <Text style={styles.detailText}>{donorDetails?.name}</Text>
          </TouchableOpacity>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={20} color="#666" />
            <Text style={styles.detailText}>{location}</Text>
          </View>
          <TouchableOpacity style={styles.detailRow} onPress={()=>Linking.openURL(`tel:+91${donorDetails?.phone}`)}>
            <MaterialIcons name="phone" size={20} color="#666" />
            <Text style={styles.detailText}>{donorDetails?.phone}</Text>
          </TouchableOpacity>
          <View style={styles.detailRow}>
  <Ionicons name="person-circle" size={20} color="#3F51B5" style={{ marginRight: 0 }} />
  <Text style={styles.detailText}>User: {donor?.kycStatus}</Text>
</View>

        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: width,
    height: 250,
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#333",
    width: 10,
    height: 10,
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
