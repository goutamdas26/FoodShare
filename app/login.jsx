import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Constants from "expo-constants";
import { ItemsContext } from "../src/context/ItemContext";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { setUser,API_URL } = useContext(ItemsContext);

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Toast.show({
        type: "info",
        text1: "Please fill in all fields",
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid email format",
      });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        await SecureStore.setItemAsync("userToken", token);
        setUser(user);

        Toast.show({
          type: "success",
          text1: "Login successful!",
          text2: "Redirecting to dashboard...",
        });

        router.replace("/(tabs)/");
      } else {
        Toast.show({
          type: "error",
          text1: "Login failed",
          text2: "Invalid credentials",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "Invalid credentials or server error",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/icon.png")} style={{
        height: 100,
        width: 100,
        bottom: 20,
        overflow: 'hidden', // Added to ensure cropping effect
        borderRadius: 20, // Optional: adds rounded corners
      }}/>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B0B0B0"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B0B0B0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/forgot-password")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
  forgotPassword: {
    marginTop: 10,
    color: "#BBDEFB",
    fontWeight: "bold",
  },
});
