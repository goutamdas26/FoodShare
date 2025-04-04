import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
  const API_URL = Constants.expoConfig.extra.API_URL;
  const { user, setUser } = useContext(ItemsContext);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(API_URL + "/api/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;

      if (response.data && response.data.token) {
        await SecureStore.setItemAsync("userToken", token);
        setUser(user);
        Toast.show({
          type: "success",
          text1: "Logged in!",
          text2: "Redirecting to dashboard...",
        });
        router.replace("/(tabs)/home");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Invalid credentials. Please try again.",
        
      });
      // console.error("Login Error:", error);
      // alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B0B0B0"
        keyboardType="email-address"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A237E", // Indigo 900 background
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
    backgroundColor: "#303F9F", // Indigo 700 input
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#FFF",
    fontSize: 16,
    marginBottom: 10,
  },
  forgotPassword: {
    color: "#BBDEFB",
    fontWeight: "bold",
    marginBottom: 0,
  },
  button: {
    backgroundColor: "#5C6BC0", // Indigo 500 button
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
    color: "#BBDEFB", // Light Indigo
    fontWeight: "bold",
  },
});