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
  ActivityIndicator,
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
  const [localImage, setLocalImage] = useState(profileImage);
  const [loading, setLoading] = useState(false); // 🆕 Loading state

  const API_URL = Constants.expoConfig.extra.API_URL;

  const [formData, setFormData] = useState({
    name,
    email,
    phone: phone ? phone.toString() : '',
    address: address ? address.toString() : '',
    profileImage: localImage,
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Allow access to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setLocalImage(result.assets[0].uri);
      setFormData((prev) => ({ ...prev, profileImage: result.assets[0].uri }));
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!localImage) return;

    const data = new FormData();
    data.append('file', {
      uri: localImage,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
    data.append('upload_preset', 'foodshare_profileimage');
    data.append('cloud_name', 'dl92zh3w0');

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dl92zh3w0/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
      const resData = await res.json();
      if (resData.secure_url) {
        return resData.secure_url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true); // Start loading
    try {
      const token = await SecureStore.getItemAsync('userToken');
      let uploadedImageUrl = localImage;

      if (!localImage?.startsWith('http')) {
        uploadedImageUrl = await uploadImageToCloudinary();
      }

      const updatedData = {
        ...formData,
        profileImage: uploadedImageUrl,
      };

      const res = await axios.put(`${API_URL}/api/user/update`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        fetchUser();
        Toast.show({
          type: 'success',
          text1: 'Profile Updated',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to update profile',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error updating profile',
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={
            localImage
              ? { uri: localImage }
              : require('../../../assets/images/icon.png')
          }
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
          style={[styles.updateButton, loading && { opacity: 0.6 }]}
          onPress={handleUpdateProfile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.updateButtonText}>Update Profile</Text>
          )}
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
