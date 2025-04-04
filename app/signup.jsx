


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
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post(API_URL + "/api/auth/register", {
        name,
        email,
        password,
      });
      Toast.show({
        type: "success",
        text1: "Account Created Successfuly !",
       
      });
      router.replace("/login");
    } catch (error) {
     
      if(error.response?.status==409){
        Toast.show({
          type: "error",
          text1: error.response?.data?.error || "Something went wrong",
         
        });
        return 
      }
      Toast.show({
        type: "error",
        text1:  "Something went wrong",
       
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
    backgroundColor: "#1A237E", // Deep Indigo
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
  },
  button: {
    backgroundColor: "#5C6BC0", // Lighter Indigo
    width: "100%",
    padding: 15,
    borderRadius: 12,
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
});