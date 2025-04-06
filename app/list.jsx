// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import axios from 'axios'; // Make sure to import axios at the top of your file
// import * as SecureStore from "expo-secure-store"
// import Constants from "expo-constants";
// import Toast from "react-native-toast-message";
// const API_URL = Constants.expoConfig.extra.API_URL;

// const AddFoodCharityEvent = () => {
//   const [event, setEvent] = useState({
//     title: "",
//     description: "",
//     startDate: new Date(),
//     endDate: new Date(),
//     startTime: new Date(),
//     endTime: new Date(),
//     location: "",
//     contact: "",
//   });

//   const areFieldsNotEmpty = () => {
//     return Object.values(event).every(field => field !== "" && field !== null);
//   };
//   const [showStartDatePicker, setShowStartDatePicker] = useState(false);
//   const [showEndDatePicker, setShowEndDatePicker] = useState(false);
//   const [showStartTimePicker, setShowStartTimePicker] = useState(false);
//   const [showEndTimePicker, setShowEndTimePicker] = useState(false);

//   const handleInputChange = (name, value) => {
//     setEvent({ ...event, [name]: value });
//   };

//   const handleDateChange = (selectedDate, field) => {
//     if (selectedDate) {
//       setEvent({ ...event, [field]: selectedDate });
//     }
//   };


//   const handleSubmit = async () => {

//     try {
//     if(areFieldsNotEmpty){
     
//       Toast.show({
//         type: "warning",
//         text1: "Please fill all the fields",
       
//       });
//       return 
//     } 
//       const token=await SecureStore.getItemAsync("userToken")

//       const response = await axios.post(`${API_URL}/api/events/create`, event, {
//         headers: {
//           'Authorization': `Bearer ${token}`, // Replace with your JWT token
//         },
//       });

// Toast.show({
//   type: "success",
//   text1: "Event added successfully",
 
// });
//     } catch (error) {
     
//       Toast.show({
//         type: "error",
//         text1: "Error submitting event",
       
//       });
//     }
//   };

//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: "#e0e7ff", padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: "bold", color: "#4f46e5", marginBottom: 20 }}>Add Food Charity Event</Text>
      
//       <TextInput 
//         placeholder="Title" 
//         value={event.title} 
//         onChangeText={(text) => handleInputChange("title", text)}
//         style={styles.input} 
//       />
//       <TextInput 
//         placeholder="Description" 
//         value={event.description} 
//         onChangeText={(text) => handleInputChange("description", text)}
//         style={[styles.input, { height: 50 }]} 
//         multiline
//       />

//       <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}>
//         <Text style={styles.dateText}>Start Date: {event.startDate.toDateString()}</Text>
//       </TouchableOpacity>
//       {showStartDatePicker && (
//         <DateTimePicker
//           value={event.startDate}
//           mode="date"
//           display="default"
//           onChange={(e, date) => {
//             setShowStartDatePicker(false);
//             handleDateChange(date, "startDate");
//           }}
//         />
//       )}

//       <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateButton}>
//         <Text style={styles.dateText}>End Date: {event.endDate.toDateString()}</Text>
//       </TouchableOpacity>
//       {showEndDatePicker && (
//         <DateTimePicker
//           value={event.endDate}
//           mode="date"
//           display="default"
//           onChange={(e, date) => {
//             setShowEndDatePicker(false);
//             handleDateChange(date, "endDate");
//           }}
//         />
//       )}

//       <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.dateButton}>
//         <Text style={styles.dateText}>Start Time: {event.startTime.toLocaleTimeString()}</Text>
//       </TouchableOpacity>
//       {showStartTimePicker && (
//         <DateTimePicker
//           value={event.startTime}
//           mode="time"
//           display="default"
//           onChange={(e, date) => {
//             setShowStartTimePicker(false);
//             handleDateChange(date, "startTime");
//           }}
//         />
//       )}

//       <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.dateButton}>
//         <Text style={styles.dateText}>End Time: {event.endTime.toLocaleTimeString()}</Text>
//       </TouchableOpacity>
//       {showEndTimePicker && (
//         <DateTimePicker
//           value={event.endTime}
//           mode="time"
//           display="default"
//           onChange={(e, date) => {
//             setShowEndTimePicker(false);
//             handleDateChange(date, "endTime");
//           }}
//         />
//       )}

//       <TextInput 
//         placeholder="Location" 
//         value={event.location} 
//         onChangeText={(text) => handleInputChange("location", text)}
//         style={styles.input} 
//       />
//       <TextInput 
//         placeholder="Contact Number" 
//         value={event.contact} 
//         keyboardType="phone-pad"
//         onChangeText={(text) => handleInputChange("contact", text)}
//         style={styles.input} 
//       />

//       <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
//         <Text style={styles.submitButtonText}>Submit</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = {
//   input: {
//     backgroundColor: "white",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: "#4f46e5",
//   },
//   dateButton: {
//     backgroundColor: "#4f46e5",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     alignItems: "center",
//   },
//   dateText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   submitButton: {
//     backgroundColor: "#4f46e5",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   submitButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// };

// export default AddFoodCharityEvent;


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import axios from "axios";
import Toast from "react-native-toast-message";

const API_URL = Constants.expoConfig.extra.API_URL;
const CLOUDINARY_UPLOAD_PRESET = "foodshare_event"; // replace with your Cloudinary preset
const CLOUDINARY_CLOUD_NAME = "dl92zh3w0"; // replace with your Cloudinary cloud name

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
    imageUrl: "",
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const areFieldsNotEmpty = () => {
    return Object.values(event).every(value => value !== "" && value !== null && value !== undefined);
  };

  const handleInputChange = (name, value) => {
    setEvent({ ...event, [name]: value });
  };

  const handleDateChange = (selectedDate, field) => {
    if (selectedDate) {
      setEvent(prev => ({ ...prev, [field]: selectedDate }));
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({ type: "error", text1: "Permission denied for image access" });
      return;
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
      setEvent(prev => ({ ...prev, imageUrl: data.secure_url }));
      Toast.show({ type: "success", text1: "Image uploaded successfully" });
    } catch (err) {
      console.log(err);
      Toast.show({ type: "error", text1: "Image upload failed" });
    }
  };

  const handleSubmit = async () => {
    if (!areFieldsNotEmpty()) {
      Toast.show({ type: "warning", text1: "Please fill all the fields" });
      return;
    }

    try {
      const token = await SecureStore.getItemAsync("userToken");
      await axios.post(`${API_URL}/api/events/create`, event, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Toast.show({
        type: "success",
        text1: "Event added successfully",
      });
    } catch (error) {
      console.log(error?.response?.data);
      Toast.show({
        type: "error",
        text1: "Error submitting event",
      });
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#e0e7ff", padding: 20 }}>
      <Text style={styles.heading}>Add Food Charity Event</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.dateText}>Pick an Image</Text>
      </TouchableOpacity>
      {event.imageUrl ? (
        <Image
          source={{ uri: event.imageUrl }}
          style={{ width: "100%", height: 200, borderRadius: 10, marginBottom: 15 }}
        />
      ) : null}

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

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
