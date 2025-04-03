import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Constants  from 'expo-constants';
import axios from "axios";
  const API_URL = Constants.expoConfig.extra.API_URL;

const Verified = ({ isVerified }) => {
    const fetchKyc=async()=>{
try {
   const response=await axios.post(`${API_URL}`,{id:UserActivation._id})
   console.log(response.data)
    } 
catch (error) {
    console.log(error)
}
    useEffect(()=>{
fetchKyc()
    })
  return (
    <View
      style={{
        backgroundColor: isVerified ? "#4B0082" : "#ccc",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {isVerified ? "✅ You are Verified!" : "❌ Verification Pending"}
      </Text>
    </View>
  );
};

export default Verified;
