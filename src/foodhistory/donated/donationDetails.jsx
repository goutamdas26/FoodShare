import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const DonationDetails = () => {
  const { name, quantity, date, description, receiver } =
    useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Donation Details</Text>

      <View style={styles.card}>
        <DetailItem label="Food Name" value={name} />
        <DetailItem label="Quantity" value={quantity} />
        <DetailItem label="Date Donated" value={date} />
        <DetailItem label="Description" value={description} />
        <DetailItem label="Receiver" value={receiver} />
      </View>
    </View>
  );
};

const DetailItem = ({ label, value }) => (
  <View style={styles.detailContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  detailContainer: {
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  value: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
    marginTop: 2,
  },
});

export default DonationDetails;
