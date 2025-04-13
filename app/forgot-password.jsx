

import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { ItemsContext } from "../src/context/ItemContext";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {API_URL}=useContext(ItemsContext)


  const handleForgotPassword = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Email Required",
        text2: "Please enter your email",
      });
      return;
    }

    setLoading(true);

    try {
      const token = await SecureStore.getItemAsync("userToken");
      const response = await axios.post(
        `${API_URL}/api/reset/forgot-password`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: `OTP sent to ${email}`,
        });
        router.replace(`/otp?email=${email}`);
      } else {
        Toast.show({
          type: "error",
          text1: "Email not found",
          text2: "Please try again.",
        });
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        Toast.show({
          type: "error",
          text1: "User not found",
          text2: "Check your email",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email to reset your password
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B0B0B0"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleForgotPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.switchText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A237E",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#B0BEC5",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#303F9F",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#FFF",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#5C6BC0",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#7986CB",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    marginTop: 15,
    color: "#BBDEFB",
    fontWeight: "bold",
  },
});
