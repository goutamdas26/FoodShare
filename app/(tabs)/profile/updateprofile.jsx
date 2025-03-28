import React, { useContext, useState } from 'react';
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

const UpdateProfileScreen = () => {
  const { user, fetchUser } = useContext(ItemsContext);
  const { name, email, phone, address, profileImage } = user;
  const API_URL = Constants.expoConfig.extra.API_URL;

  const [formData, setFormData] = useState({
    name,
    email,
    phone: phone ? phone.toString() : '', // Ensure phone is a string
    address,
    profileImage,
  });

  // Image Picker Function
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Allow access to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.IMAGES, // Updated for Expo 49+
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, profileImage: result.assets[0].uri });
    }
  };

  // Handle Profile Update
  const handleUpdateProfile = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const response = await axios.put(`${API_URL}/api/user/update`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        fetchUser();
        Alert.alert("Profile Updated");
      } else {
        console.error('Failed to update profile:', response.status);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={formData.profileImage ? { uri: formData.profileImage } : require('../../../assets/images/icon.png')}
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

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
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
