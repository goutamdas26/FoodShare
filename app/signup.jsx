import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";
import Toast from "react-native-toast-message";

const API_URL = Constants.expoConfig.extra.API_URL;

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isValidPhone = (phone) =>
    /^\d{10}$/.test(phone.trim()); // Ensures 10 digit number

  const isStrongPassword = (password) =>
    password.length >= 6; // You can make this stricter

  const handleSignup = async () => {
    if (!name || !email || !password || !phone || !address) {
      Toast.show({
        type: "info",
        text1: "Please fill all fields",
      });
      return;
    }

    if (!isValidEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Enter a valid email address",
      });
      return;
    }

    if (!isValidPhone(phone)) {
      Toast.show({
        type: "error",
        text1: "Phone number must be 10 digits",
      });
      return;
    }

    if (!isStrongPassword(password)) {
      Toast.show({
        type: "error",
        text1: "Password must be at least 6 characters",
      });
      return;
    }

    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
      });

      Toast.show({
        type: "success",
        text1: "Account created successfully!",
      });

      router.replace("/login");
    } catch (error) {
      const status = error.response?.status;
      const message =
        error.response?.data?.error || "Something went wrong. Try again later.";

      Toast.show({
        type: "error",
        text1: status === 409 ? message : "Signup failed",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#B0BEC5"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B0BEC5"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B0BEC5"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#B0BEC5"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#B0BEC5"
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    backgroundColor: "#3949AB",
    color: "#FFF",
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#5C6BC0",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
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
