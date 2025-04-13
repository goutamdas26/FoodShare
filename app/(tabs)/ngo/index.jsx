import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Linking } from "react-native";
const NGODetailsScreen = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🏢 FoodShare</Text>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.text}>• Eshaan Tripathi</Text>
        <Text style={styles.text}>• Goutam Das</Text>
        <Text style={styles.text}>• Aryan</Text>
        <Text style={styles.text}>• Chandrakant Kumar</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>📜 Mission</Text>
        <Text style={styles.text}>
          FoodShare was started in collaboration with Chitkara University with
          the mission of reducing food waste and distributing surplus food to
          those in need. We aim to create a sustainable and compassionate
          society by ensuring no food goes to waste.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>📞 Contact</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:contact@foodshare.org')}>
          <Text style={styles.text}>Email: contact@foodshare.org</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Linking.openURL("tel:+919876543210")}>
          <Text style={styles.text}>Phone: +91 9876543210</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#3F51B5", // Indigo 500
  },
  sectionContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3F51B5", // Indigo 500
  },
  text: {
    fontSize: 16,
    marginVertical: 3,
    color: "#666",
  },
});

export default NGODetailsScreen;
