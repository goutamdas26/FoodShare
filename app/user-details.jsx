import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Constants from 'expo-constants';
import axios from "axios";
import GoBackHeader from "../src/components/goBack";

const UserDetailsScreen = () => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const API_URL = Constants.expoConfig.extra.API_URL;
  
  const userDetails = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/user/details`, {
        userId: userId,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false); // Stop loading after API call
    }
  };

  const { userId } = useLocalSearchParams();

  useEffect(() => {
    userDetails();
  }, [userId]);

  return (
    <View style={styles.container}>
      <GoBackHeader />
      <Text style={styles.heading}>User Profile</Text>
      {loading ? (
        // Show loading spinner while fetching data
        <ActivityIndicator size="large" color="#3f51b5" style={styles.loader} />
      ) : (
        <>
          <Image
            source={{
              uri: user.profileImage || "https://res.cloudinary.com/dl92zh3w0/image/upload/v1744383503/Avatar-Profile-Vector-PNG-Pic_z3sbbw.png",
            }}
            style={styles.image}
          />
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user.name}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>

            <Text style={styles.label}>Phone</Text>
            <TouchableOpacity onPress={()=>user.phone?Linking.openURL(`tel:+91${user.phone}`):"" }>
            <Text style={styles.value}>{user.phone || "Not available"}</Text>

            </TouchableOpacity>
            <Text style={styles.label}>Verification</Text>
            <Text style={styles.value}>{user.kycStatus|| "Not Verified"}</Text>

            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{user.address || "No address available"}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f6fb",
    alignItems: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#3f51b5", // Indigo 500
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 30,
    borderWidth: 3,
    borderColor: "#3f51b5",
  },
  detailContainer: {
    width: "100%",
    marginBottom: 30,
    backgroundColor: "#e8eaf6", // Light Indigo
    padding: 16,
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    color: "#5c6bc0", // Indigo 400
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#1a237e", // Indigo 900
  },
  loader: {
    marginTop: 20,
  },
});
