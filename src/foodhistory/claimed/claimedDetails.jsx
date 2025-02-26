import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Correct hook for getting params

const ClaimedDetails = () => {
  const params = useLocalSearchParams(); // Get all passed params

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Food Claim Details</Text>
      <View style={styles.card}>
        <Text style={styles.itemName}>{params.name}</Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Quantity:</Text> {params.quantity}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Date Donated:</Text> {params.date}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Description:</Text> {params.description}
        </Text>
        {params.receiver && (
          <Text style={styles.detailText}>
            <Text style={styles.boldText}>Receiver:</Text> {params.receiver}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F6F9",
    justifyContent: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  itemName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
    textAlign: "center",
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
});

export default ClaimedDetails;
