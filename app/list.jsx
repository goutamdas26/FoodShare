import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import axios from "axios";
import Toast from "react-native-toast-message";
import { ItemsContext } from "../src/context/ItemContext";


const CLOUDINARY_UPLOAD_PRESET = "foodshare_event";
const CLOUDINARY_CLOUD_NAME = "dl92zh3w0";

const AddFoodCharityEvent = () => {
const {API_URL}=useContext(ItemsContext)

  const [event, setEvent] = useState({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    location: "",
    contact: "",
    imageUrl: "",
  });

  const [loadingImage, setLoadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleInputChange = (name, value) => {
    setEvent(prev => ({ ...prev, [name]: value.trim() }));
  };

  const areFieldsValid = () => {
    const { title, description, location, contact, imageUrl } = event;
    if (!title || title.length < 3) return false;
    if (!description || !location || !contact || !imageUrl) return false;
    if (!/^\d{10}$/.test(contact)) return false;
    return true;
  };

  const handleDateChange = (selectedDate, field) => {
    if (selectedDate) {
      setEvent(prev => ({ ...prev, [field]: selectedDate }));
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return Toast.show({ type: "error", text1: "Image permission denied." });
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      await uploadImageToCloudinary(imageUri);
    }
  };

  const uploadImageToCloudinary = async (imageUri) => {
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "event.jpg",
      type: "image/jpeg",
    });
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setEvent(prev => ({ ...prev, imageUrl: data.secure_url }));
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.log(err);
      Toast.show({ type: "error", text1: "Failed to upload image" });
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = async () => {
    if (!areFieldsValid()) {
      return Toast.show({ type: "info", text1: "Please fill all valid fields." });
    }

    setSubmitting(true);

    try {
      const token = await SecureStore.getItemAsync("userToken");
      await axios.post(`${API_URL}/api/events/create`, event, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Toast.show({ type: "success", text1: "Event added successfully" });

      setEvent({
        title: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        location: "",
        contact: "",
        imageUrl: "",
      });
    } catch (error) {
      console.log(error?.response?.data || error);
      Toast.show({ type: "error", text1: "Error submitting event" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#e0e7ff", padding: 20 }}>
      <Text style={styles.heading}>Add Food Charity Event</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.dateText}>
          {loadingImage ? "Uploading..." : "Pick an Image"}
        </Text>
      </TouchableOpacity>
      {loadingImage && <ActivityIndicator size="small" color="#4f46e5" style={{ marginBottom: 10 }} />}
      {event.imageUrl && (
        <Image
          source={{ uri: event.imageUrl }}
          style={{ width: "100%", height: 200, borderRadius: 10, marginBottom: 15 }}
        />
      )}

      <TextInput
        placeholder="Title"
        value={event.title}
        onChangeText={(text) => handleInputChange("title", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={event.description}
        onChangeText={(text) => handleInputChange("description", text)}
        style={[styles.input, { height: 60 }]}
        multiline
      />

      <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>Start Date: {event.startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={event.startDate}
          mode="date"
          display="default"
          onChange={(e, date) => {
            setShowStartDatePicker(false);
            handleDateChange(date, "startDate");
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>End Date: {event.endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={event.endDate}
          mode="date"
          display="default"
          onChange={(e, date) => {
            setShowEndDatePicker(false);
            handleDateChange(date, "endDate");
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>Start Time: {event.startTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={event.startTime}
          mode="time"
          display="default"
          onChange={(e, date) => {
            setShowStartTimePicker(false);
            handleDateChange(date, "startTime");
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>End Time: {event.endTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={event.endTime}
          mode="time"
          display="default"
          onChange={(e, date) => {
            setShowEndTimePicker(false);
            handleDateChange(date, "endTime");
          }}
        />
      )}

      <TextInput
        placeholder="Location"
        value={event.location}
        onChangeText={(text) => handleInputChange("location", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Contact Number"
        value={event.contact}
        keyboardType="phone-pad"
        onChangeText={(text) => handleInputChange("contact", text)}
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loadingImage || submitting}
        style={[styles.submitButton, { opacity: loadingImage || submitting ? 0.5 : 1 }]}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4f46e5",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#4f46e5",
  },
  dateButton: {
    backgroundColor: "#4f46e5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  dateText: {
    color: "white",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#4f46e5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imagePicker: {
    backgroundColor: "#4f46e5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
};

export default AddFoodCharityEvent;
