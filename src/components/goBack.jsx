import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const GoBackHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

export default GoBackHeader;

const styles = StyleSheet.create({
  container: {
   
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    
  },
  backBtn: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 6,
  },
  title: {
    marginLeft: 12,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
