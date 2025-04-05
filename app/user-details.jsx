import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Constants  from 'expo-constants';
import axios from "axios";

const UserDetailsScreen = () => {
  // const user = {
  //   name: "Goutam Das",
  //   email: "goutam@example.com",
  //   profileImage: "https://i.pravatar.cc/150?img=12",
  // };
  const [user,setUser]=useState({})
  const API_URL=Constants.expoConfig.extra.API_URL
  const userDetails=async()=>{
const response = await axios.post(`${API_URL}/api/user/details`, {
  userId: userId,
});
setUser(response.data)
  }
const { userId } = useLocalSearchParams();
useEffect(()=>{
userDetails()
})
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Profile</Text>
      <Image source={{ uri: user.profileImage }} style={styles.image} />
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user.phone}</Text>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{user.address||"No address available"}</Text>
      </View>


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
  button: {
    backgroundColor: "#3f51b5", // Indigo 500
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
