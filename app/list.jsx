import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from 'axios'; // Make sure to import axios at the top of your file
import * as SecureStore from "expo-secure-store"
import Constants from "expo-constants";
const API_URL = Constants.expoConfig.extra.API_URL;

const AddFoodCharityEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    location: "",
    contact: "",
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleInputChange = (name, value) => {
    setEvent({ ...event, [name]: value });
  };

  const handleDateChange = (selectedDate, field) => {
    if (selectedDate) {
      setEvent({ ...event, [field]: selectedDate });
    }
  };


  const handleSubmit = async () => {
    try {
      const token=await SecureStore.getItemAsync("userToken")
      const response = await axios.post(`${API_URL}/api/events/create`, event, {
        headers: {
          'Authorization': `Bearer ${token}`, // Replace with your JWT token
        },
      });
Alert.alert("","Event Added")
    } catch (error) {
      console.error("Error submitting event data:", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#e0e7ff", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#4f46e5", marginBottom: 20 }}>Add Food Charity Event</Text>
      
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
        style={[styles.input, { height: 50 }]} 
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

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
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
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default AddFoodCharityEvent;
