import React, { useState } from "react";
import { View, Button, Alert, Text, StyleSheet } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";

import  Constants  from 'expo-constants';
import Toast from "react-native-toast-message";
const VerifyOtpScreen = ({ route, navigation }) => {
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
 
  const API_URL = Constants.expoConfig.extra.API_URL;

  const verifyOtp = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
      Toast.show({
        type: "success",
        text1: "OTP verified!",
        
      });
            router.replace(`/reset-password?email=${email}`);

    } catch (error) {
     
      if(error.response?.status==400){
      Toast.show({
        type: "error",
        text1: error.response?.data?.message,
        
      });
      return }
      Toast.show({
        type: "error",
        text1: "Something went wrong.",
        
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>OTP sent to {email}</Text>
      <OTPTextInput handleTextChange={setOtp} />
      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3F51B5", // Indigo theme
  },
  infoText: {
    color: "#FFFFFF", // White text for contrast
    marginBottom: 20,
  },
});

export default VerifyOtpScreen;
