import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ItemsContext } from '../../../src/context/ItemContext';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const UpdateProfileScreen = () => {
  const { user, fetchUser } = useContext(ItemsContext);
  const { name, email, phone, address, profileImage } = user;
  // 1️⃣ Add this new state to track selected image URI
  const [localImage, setLocalImage] = useState(profileImage);

  const API_URL = Constants.expoConfig.extra.API_URL;

  const [formData, setFormData] = useState({
    name,
    email,
    phone: phone ? phone.toString() : "", // Ensure phone is a string
    address: address ? address.toString() : "",
    profileImage:localImage,
  });

  // Image Picker Function
const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "Allow access to select an image.");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    setLocalImage(result.assets[0].uri); // Just store local image
    setFormData((prev) => ({ ...prev, profileImage: localImage }));
  }
};
const uploadImageToCloudinary = async () => {
  if (!localImage) {
    Alert.alert("No image selected", "Please select an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", {
    uri: localImage,
    name: "profile.jpg",
    type: "image/jpeg",
  });
  formData.append("upload_preset", "foodshare_profileimage"); // 🔁 Replace
  formData.append("cloud_name", "dl92zh3w0"); // 🔁 Replace

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dl92zh3w0/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (data.secure_url) {
      setFormData((prev) => ({ ...prev, profileImage: data.secure_url }));
      setLocalImage(data.secure_url)

    } else {
  
      console.error(data);
    }
  } catch (err) {
    console.error("Cloudinary Upload Error", err);

  }
};


  // Handle Profile Update
  const handleUpdateProfile = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      await uploadImageToCloudinary()
      formData.profileImage=localImage
      const response = await axios.put(`${API_URL}/api/user/update`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        fetchUser();
       
        Toast.show({
          type: "success",
          text1: "Profile Updated",
        
        });
      } else {
        console.error("Failed to update profile:", response.status);
        Toast.show({
          type: "error",
          text1: "Failed to update profile:",
        
        });
      }
    } catch (error) {
   
      Toast.show({
        type: "error",
        text1: "Error updating profile. Please try again later.",
      
      });
    }
  };
useEffect(()=>{


})
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={localImage ? { uri: localImage } : require('../../../assets/images/icon.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Enter your full name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, styles.addressInput]}
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          placeholder="Enter your address"
          multiline
        />

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateProfile}
        >
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  imageButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  imageButtonText: {
    color: '#007AFF',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  addressInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  updateButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UpdateProfileScreen;
