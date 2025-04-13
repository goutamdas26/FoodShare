import axios from 'axios';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import Toast from 'react-native-toast-message';

import { ItemsContext } from '../../../src/context/ItemContext';


const ContactUs = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const {API_URL}=useContext(ItemsContext)

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form fields
    if (!name || !email || !phone || !message) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Please fill all fields',
      });
      return;
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Please enter a valid 10-digit phone number',
      });
      return;
    }

    // Show loading indicator
    setLoading(true);

    try {
      // Simulate sending message (e.g., sending to server)
      const res=await axios.post(`${API_URL}/api/user/contact-us`,{phone,message,name,email})

      // Show success toast
      Toast.show({
        type: 'success',
        position: 'top',
        text1: res.data.message||'Message Sent!',
      });

      // Clear the form after submission
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      // Show error toast
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Something went wrong, please try again',
      });
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <View style={styles.form}>
        {/* Name Input */}
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        {/* Email Input */}
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        {/* Phone Input */}
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
        />

        {/* Message Input */}
        <Text style={styles.label}>Message:</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Enter your message"
          value={message}
          onChangeText={(text) => setMessage(text)}
          multiline
        />

        {/* Submit Button */}
        {loading ? (
          <ActivityIndicator size="large" color="#4B6EAF" />
        ) : (
          <Button title="Send Message" onPress={handleSubmit} color="#4B6EAF" />
        )}
      </View>

      {/* Additional Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Reach Us Directly</Text>
        <TouchableOpacity onPress={()=>Linking.openURL("tel:+919876543210")}>

        <Text style={styles.infoText}>Phone: 919876543210</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:contact@foodshare.org')}>
          <Text style={styles.infoText}>Email: contact@foodshare.org</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B6EAF',
    marginBottom: 20,
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#4B6EAF',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#4B6EAF',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: '#f2f6fc',
    padding: 15,
    borderRadius: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B6EAF',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#4B6EAF',
  },
});

export default ContactUs;
