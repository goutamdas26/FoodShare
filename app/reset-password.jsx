import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import  Constants  from 'expo-constants';
import Toast from "react-native-toast-message";

const ResetPasswordScreen = () => {
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = Constants.expoConfig.extra.API_URL;

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
     
      Toast.show({
        type: "warning",
        text1: "Please fill in all fields",
        
      });
      return;
    }
    if (password !== confirmPassword) {
    
      Toast.show({
        type: "warning",
        text1: "Passwords do not match",
        
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/auth/reset-password`, {
        email,
        newPassword: password,
      });
   
      Toast.show({
        type: "success",
        text1: "Password updated successfully!",
        
      });
      router.replace("/login");
    } catch (error) {
     
      if(error.response.status==404){
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to reset password"
        );
        return 
      }
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter a new password for {email}</Text>

      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Updating..." : "Reset Password"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef2ff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4f46e5", // Indigo 700
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6366f1", // Indigo 500
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6366f1",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4f46e5", // Indigo 700
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ResetPasswordScreen;
