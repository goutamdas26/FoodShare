import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ItemsProvider } from "../../src/context/ItemContext";
export default function Layout() {
  return (
 <ItemsProvider>
     <Tabs screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="foodhistory"
        options={{
          title: "FoodHistory",
          tabBarIcon: ({ color, size }) => (
           <FontAwesome5 name="clipboard-list" size={size} color={color} />

          ),
        }}
      />
      <Tabs.Screen
        name="donate"
        options={{
          title: "Donate",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="food-variant"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ngo"
        options={{
          title: "About Us",
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="receipt" size={size} color={color} />

<FontAwesome5 name="hand-holding-heart" size={size} color={color} />

          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
 </ItemsProvider>
  );
}

// import { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";

// export default function AuthScreen() {
//   const [isSignup, setIsSignup] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const router = useRouter();

//   const handleAuth = () => {
//     if (!email || !password || (isSignup && !name)) {
//       alert("Please fill all fields");
//       return;
//     }
    
//     // Handle authentication logic (API call, etc.)
//     alert(isSignup ? "Signed Up Successfully" : "Logged In Successfully");
//     router.push("/home");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{isSignup ? "Sign Up" : "Login"}</Text>
//       {isSignup && (
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           value={name}
//           onChangeText={setName}
//         />
//       )}
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
//       <TouchableOpacity style={styles.button} onPress={handleAuth}>
//         <Text style={styles.buttonText}>{isSignup ? "Sign Up" : "Login"}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
//         <Text style={styles.switchText}>
//           {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
//         </Text>
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

// import { View, Text } from 'react-native'
// import React from 'react'
// import { Stack } from 'expo-router'

// const _layout = () => {
//   return (
//    <Stack>
//     <Stack.Screen name='index'/>
//    </Stack>
//   )
// }

// export default _layout