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

const DonateFoodScreen = () => {
  const [images, setImages] = useState([]);
  const [foodType, setFoodType] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

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

  const handleSubmit = () => {
    if (
      images.length === 0 ||
      !foodType ||
      !category ||
      !description ||
      !location ||
      !phone
    ) {
      Alert.alert("Missing Fields", "Please fill all details");
      return;
    }

    Alert.alert("Success", "Food donation submitted successfully!");
    // Here you can add API call to submit the data
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
        placeholder="Food Type"
        value={foodType}
        onChangeText={setFoodType}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
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
