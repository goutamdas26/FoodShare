import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig.extra.API_URL;


const DonateFoodScreen = () => {
  const [images, setImages] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("Human"); // Default category
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((asset) => asset.uri)]);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Allow location access to proceed");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    let addressResponse = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    if (addressResponse.length > 0) {
      let address = addressResponse[0];
      setLocation(
        `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.country}`
      );
    } else {
      Alert.alert("Error", "Could not fetch address");
    }
  };

  const handleSubmit = async () => {
    if (!foodName || !category || !description || !location || !phone) {
      Alert.alert("Missing Fields", "Please fill all details");
      return;
    }

    const token = await SecureStore.getItemAsync("userToken");

    if (!token) {
      Alert.alert("Authentication Error", "Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("foodName", foodName);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("phone", phone);
    formData.append("quantity", quantity);

    try {
      const response = await axios.post(API_URL+
        "/api/food/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Alert.alert("Success", "Food donation submitted successfully!");
        setFoodName("");
        setCategory("Human"); // Reset category
        setDescription("");
        setLocation("");
        setPhone("");
        setQuantity("");
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting donation:", error.response?.data || error);
      Alert.alert("Error", "Failed to submit donation. Please try again.");
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Donate Food
      </Text>

      <TouchableOpacity
        onPress={pickImages}
        style={{
          backgroundColor: "#ffcc00",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text>📸 Upload Images</Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row", marginBottom: 10 }}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={{ width: 100, height: 100, marginRight: 10 }}
          />
        ))}
      </ScrollView>

      <TextInput
        placeholder="Food Name"
        value={foodName}
        onChangeText={setFoodName}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
      />

      {/* Category Selection Toggle */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => setCategory("Human")}
          style={{
            flex: 1,
            backgroundColor: category === "Human" ? "#ff5733" : "#ccc",
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            marginRight: 5,
          }}
        >
          <Text style={{ color: category === "Human" ? "white" : "black" }}>🍽️ Human</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCategory("Pet")}
          style={{
            flex: 1,
            backgroundColor: category === "Pet" ? "#ff5733" : "#ccc",
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            marginLeft: 5,
          }}
        >
          <Text style={{ color: category === "Pet" ? "white" : "black" }}>🐶 Pet</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Enter Location"
        value={location}
        onChangeText={setLocation}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TouchableOpacity
        onPress={getLocation}
        style={{
          backgroundColor: "#00cc99",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text>📍 Get Current Location</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: "#ff5733",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>📤 Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DonateFoodScreen;
