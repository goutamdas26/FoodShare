import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddFoodCharityEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    time: "",
    location: "",
    contact: "",
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleInputChange = (name, value) => {
    setEvent({ ...event, [name]: value });
  };

  const handleDateChange = (eventType, selectedDate, field) => {
    if (selectedDate) {
      setEvent({ ...event, [field]: selectedDate });
    }
  };

  const handleSubmit = () => {
    console.log("Event Data:", event);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f0f8ff", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#007AFF", marginBottom: 20 }}>Add Food Charity Event</Text>
      
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
        style={[styles.input, { height: 100 }]} 
        multiline
      />

      <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>Start Date: {event.startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={event.startDate}
          mode="time"
          display="default"
          onChange={(e, date) => {
            setShowStartDatePicker(false);
            handleDateChange(e, date, "startDate");
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
            handleDateChange(e, date, "endDate");
          }}
        />
      )}

      <TextInput 
        placeholder="Time (e.g. 10:00 AM - 2:00 PM)" 
        value={event.time} 
        onChangeText={(text) => handleInputChange("time", text)}
        style={styles.input} 
      />
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
    borderColor: "#007AFF",
  },
  dateButton: {
    backgroundColor: "#007AFF",
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
    backgroundColor: "#007AFF",
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
