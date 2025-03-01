// /* LoginScreen.js */
// /* LoginScreen.js */
// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useRouter } from "expo-router";
// import * as SecureStore from "expo-secure-store";


// export default function LoginScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = () => {
//     if (!email || !password) {
//       alert("Please fill all fields");
//       return;
//     }
//       const token =  SecureStore.setItem("userToken","dfdfs");

//     alert("Logged In Successfully");
//     router.push("/(tabs)");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => router.push("/signup")}>
//         <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: "#f4a261",
//     width: "100%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   switchText: {
//     marginTop: 15,
//     color: "#f4a261",
//     fontWeight: "bold",
//   },
// });


/* LoginScreen.js */
import { useState } from "react";
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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://192.168.29.119:5000/api/auth/login", {
        email,
        password,
      });
console.log(response.status)
      if (response.data && response.data.token) {
        await SecureStore.setItemAsync("userToken", response.data.token);
        alert("Logged In Successfully");
        router.push("/home");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#f4a261",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchText: {
    marginTop: 15,
    color: "#f4a261",
    fontWeight: "bold",
  },
});
