



import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import { ItemsContext } from "../../../src/context/ItemContext";
import { isValidPhoneNumber } from 'libphonenumber-js';



const DonateFoodScreen = () => {
  const [images, setImages] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("Human");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const {API_URL}=useContext(ItemsContext)
  const isValidPhone = (phone) => isValidPhoneNumber(phone.trim(), 'IN');

  // Load saved draft
  useEffect(() => {
    (async () => {
      const draft = await SecureStore.getItemAsync("donateDraft");
      if (draft) {
        const parsed = JSON.parse(draft);
        setFoodName(parsed.foodName || "");
        setCategory(parsed.category || "Human");
        setDescription(parsed.description || "");
        setLocation(parsed.location || "");
        setPhone(parsed.phone || "");
        setQuantity(parsed.quantity || "");
        setExpiryDate(parsed.expiryDate ? new Date(parsed.expiryDate) : new Date());
        setImages(parsed.images || []);
      }
    })();
  }, []);

  // Save draft


  const pickImages = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsMultipleSelection: true,
    //   quality: 1,
    // });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((a) => a.uri)]);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.show({ type: "error", text1: "Location permission denied" });
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    let addressResponse = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    if (addressResponse.length > 0) {
      let a = addressResponse[0];
      setLocation(`${a.name}, ${a.street}, ${a.city}, ${a.region}, ${a.country}`);
    } else {
      Toast.show({ type: "error", text1: "Could not fetch address" });
    }
  };

  const isPhoneValid = (num) => /^[0-9]{10}$/.test(num);
  const isExpiryValid = () => new Date(expiryDate) > new Date();

  const handleSubmit = async () => {
    if (
      !foodName ||
      !category ||
      !description ||
      !location ||
      !phone ||
      !expiryDate ||
      images.length === 0
    ) {
      Toast.show({ type: "error", text1: "Please fill all fields and upload images" });
      return;
    }
  

    if (!isValidPhone(phone)) {
      Toast.show({ type: "error", text1: "Invalid phone number" });
      return;
    }

    if (!isExpiryValid()) {
      Toast.show({ type: "error", text1: "Expiry must be a future date" });
      return;
    }

    const token = await SecureStore.getItemAsync("userToken");
    if (!token) {
      Toast.show({ type: "error", text1: "Please log in again" });
      return;
    }

    try {
      setLoading(true);

      const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/dl92zh3w0/image/upload";
      const uploadPreset = "foodshare_upload";

      const imageUrls = await Promise.all(
        images.map(async (uri) => {
          const formData = new FormData();
          formData.append("file", { uri, type: "image/jpeg", name: "upload.jpg" });
          formData.append("upload_preset", uploadPreset);

          const res = await axios.post(cloudinaryUploadUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          return res.data.secure_url;
        })
      );

      const formData = new FormData();
      formData.append("foodName", foodName);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("phone", phone);
      formData.append("quantity", quantity);
      formData.append("expiry", expiryDate.toISOString());
      imageUrls.forEach((url) => formData.append("images", url));

      const response = await axios.post(API_URL + "/api/food/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Toast.show({ type: "success", text1: "Thankyou for your donation!" });
        setFoodName("");
        setCategory("Human");
        setDescription("");
        setLocation("");
        setPhone("");
        setQuantity("");
        setExpiryDate(new Date());
        setImages([]);
        SecureStore.deleteItemAsync("donateDraft");
      } else {
        Toast.show({ type: "error", text1: "Submission failed" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      Toast.show({ type: "error", text1: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Donate Food</Text>

      <TouchableOpacity
        onPress={pickImages}
        style={{
          backgroundColor: "#3F51B5",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white" }}>📸 Upload Images</Text>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        {images.map((img, idx) => (
          <Image
            key={idx}
            source={{ uri: img }}
            style={{ width: 100, height: 100, marginRight: 10, borderRadius: 8 }}
          />
        ))}
      </ScrollView>

      <TextInput
        placeholder="Food Name"
        value={foodName}
        onChangeText={setFoodName}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {["Human", "Pet"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setCategory(type)}
            style={{
              flex: 1,
              backgroundColor: category === type ? "#3F51B5" : "#ccc",
              padding: 10,
              marginHorizontal: 5,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: category === type ? "white" : "black" }}>{type=="Human"?"🍽️ ":"🐶 "}{type}</Text>
          </TouchableOpacity>
        ))}
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

      <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Expiry Date & Time</Text>

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={{ borderBottomWidth: 1, padding: 10, marginBottom: 10 }}
      >
        <Text>📅 {expiryDate.toDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={{ borderBottomWidth: 1, padding: 10, marginBottom: 10 }}
      >
        <Text>⏰ {expiryDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={expiryDate}
          mode="date"
          display="default"
          onChange={(e, d) => {
            setShowDatePicker(Platform.OS === "ios");
            if (d) {
              const updated = new Date(expiryDate);
              updated.setFullYear(d.getFullYear());
              updated.setMonth(d.getMonth());
              updated.setDate(d.getDate());
              setExpiryDate(updated);
            }
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={expiryDate}
          mode="time"
          display="default"
          onChange={(e, t) => {
            setShowTimePicker(Platform.OS === "ios");
            if (t) {
              const updated = new Date(expiryDate);
              updated.setHours(t.getHours());
              updated.setMinutes(t.getMinutes());
              setExpiryDate(updated);
            }
          }}
        />
      )}

      <TextInput
        placeholder="Enter Location"
        value={location}
        onChangeText={setLocation}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TouchableOpacity
        onPress={getLocation}
        style={{
          backgroundColor: "#3F51B5",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white" }}>📍 Get Current Location</Text>
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
          disabled={loading}
          style={{
            backgroundColor: "#3F51B5",
            padding: 10,
            borderRadius: 10,
            flex: 0.48,
            alignItems: "center",
            marginBottom:25
          }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "white", fontWeight: "bold" }}>✅ Submit</Text>
          )}
        </TouchableOpacity>
     

    </ScrollView>
  );
};

export default DonateFoodScreen;
