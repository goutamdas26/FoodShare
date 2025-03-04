import React, { useState } from 'react';
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
import * as ImagePicker from 'expo-image-picker'; // If using Expo

const KYCVerificationScreen = () => {
  const [kycData, setKycData] = useState({
    fullName: '',
    idNumber: '',
    idType: 'AADHAR', // Default ID type
    frontImage: null,
    backImage: null,
  });

  const [loading, setLoading] = useState(false);

  // Function to pick image from gallery
  const pickImage = async (type) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setKycData({
          ...kycData,
          [type]: result.assets[0].uri,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!kycData.fullName || !kycData.idNumber || !kycData.frontImage || !kycData.backImage) {
      Alert.alert('Error', 'Please fill all the required fields');
      return;
    }

    setLoading(true);
    try {
      // Add your API call here
   
      Alert.alert('Success', 'KYC details submitted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit KYC details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Verification</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name (as per ID)</Text>
        <TextInput
          style={styles.input}
          value={kycData.fullName}
          onChangeText={(text) => setKycData({...kycData, fullName: text})}
          placeholder="Enter your full name"
        />

        <Text style={styles.label}>ID Number</Text>
        <TextInput
          style={styles.input}
          value={kycData.idNumber}
          onChangeText={(text) => setKycData({...kycData, idNumber: text})}
          placeholder="Enter your ID number"
          keyboardType="number-pad"
        />

        <Text style={styles.label}>ID Type</Text>
        <View style={styles.idTypeContainer}>
          {['AADHAR', 'PAN', 'VOTER ID'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.idTypeButton,
                kycData.idType === type && styles.selectedIdType,
              ]}
              onPress={() => setKycData({...kycData, idType: type})}
            >
              <Text style={[
                styles.idTypeText,
                kycData.idType === type && styles.selectedIdTypeText
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Upload ID Front Side</Text>
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={() => pickImage('frontImage')}
        >
          {kycData.frontImage ? (
            <Image
              source={{ uri: kycData.frontImage }}
              style={styles.previewImage}
            />
          ) : (
            <Text style={styles.uploadButtonText}>+ Upload Front Side</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Upload ID Back Side</Text>
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={() => pickImage('backImage')}
        >
          {kycData.backImage ? (
            <Image
              source={{ uri: kycData.backImage }}
              style={styles.previewImage}
            />
          ) : (
            <Text style={styles.uploadButtonText}>+ Upload Back Side</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Submitting...' : 'Submit KYC Details'}
          </Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
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
  idTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  idTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedIdType: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  idTypeText: {
    color: '#333',
  },
  selectedIdTypeText: {
    color: '#fff',
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    borderStyle: 'dashed',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  uploadButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default KYCVerificationScreen;

