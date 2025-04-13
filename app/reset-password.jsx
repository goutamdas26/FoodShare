import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";
import Toast from "react-native-toast-message";
import { ItemsContext } from "../src/context/ItemContext";

const ResetPasswordScreen = () => {
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
const{API_URL}=useContext(ItemsContext)

  const isPasswordStrong = (pwd) => {
    const minLength = 6;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      pwd.length >= minLength && hasNumber.test(pwd) && hasSpecialChar.test(pwd)
    );
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "All fields are required",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match",
      });
      return;
    }

    if (!isPasswordStrong(password)) {
      Toast.show({
        type: "error",
        text1: "Password must be 6+ chars & include number + special character",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/reset/reset-password`, {
        email,
        newPassword: password,
      });

      Toast.show({
        type: "success",
        text1: "Password updated successfully!",
      });
      router.replace("/login");
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to reset password";

      Toast.show({
        type: "error",
        text1: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
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
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Updating..." : "Reset Password"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#eef2ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4f46e5",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6366f1",
    textAlign: "center",
    marginBottom: 25,
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
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ResetPasswordScreen;
