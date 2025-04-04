import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";

const API_URL = Constants.expoConfig.extra.API_URL;

const Verified = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchKyc = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/kyc/status`, { id: userId });
      setUserData(response.data.kyc);
     
    } catch (error) {
      console.log(error);
      setError("Failed to load verification data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKyc();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4B0082" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ color: "#333", fontSize: 16 }}>No KYC data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "#FFF",
          padding: 20,
          borderRadius: 15,
        
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
          width: "100%",
        }}
      >
        <Text
          style={{
            color: "#4B0082",
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 10,
            textAlign:"center"
          }}
        >
          ✅ You are Verified!
        </Text>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 0,
            color: "#333",
          }}
        >
          Name- {userData.fullName}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 0,
            color: "#333",
          }}
        >
          ID- {userData.idType}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 0,
            color: "#333",
          }}
        >
          No.- {userData.idNumber}
        </Text>

        <View style={{ width: "100%", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 8,
              color: "#555",
            }}
          >
            Front Side
          </Text>
          <Image
            source={{ uri: userData.frontImage }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              marginBottom: 15,
            }}
            resizeMode="cover"
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 8,
              color: "#555",
            }}
          >
            Back Side
          </Text>
          <Image
            source={{ uri: userData.backImage }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Verified;
