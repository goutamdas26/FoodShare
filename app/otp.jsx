import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import Toast from "react-native-toast-message";
import { ItemsContext } from "../src/context/ItemContext";

const VerifyOtpScreen = () => {
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(30);
const {API_URL}=useContext(ItemsContext)


  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const verifyOtp = async () => {
    if (!otp || otp.length < 4) {
      Toast.show({
        type: "error",
        text1: "Please enter the OTP",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/reset/verify-otp`, { email, otp });
      Toast.show({ type: "success", text1: "OTP verified!" });
      router.replace(`/reset-password?email=${email}`);
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong.";
      Toast.show({
        type: "error",
        text1: status === 400 ? message : "Verification failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setResendLoading(true);
      await axios.post(`${API_URL}/api/reset/forgot-password`, { email });
      Toast.show({ type: "success", text1: "OTP resent successfully!" });
      setTimer(30);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Failed to resend OTP",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>OTP sent to {email}</Text>

      <OTPTextInput
        handleTextChange={setOtp}
        inputCount={4}
        tintColor="#fff"
        offTintColor="#b3c0ff"
        textInputStyle={styles.otpInput}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={verifyOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>

      {timer > 0 ? (
        <Text style={styles.resendText}>Resend OTP in {timer}s</Text>
      ) : (
        <TouchableOpacity
          onPress={resendOtp}
          disabled={resendLoading}
          style={styles.resendBtn}
        >
          {resendLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.resendBtnText}>Resend OTP</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3F51B5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  infoText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  otpInput: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: "#fff",
    color: "#000",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#1E40AF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendText: {
    marginTop: 20,
    color: "#c7d2fe",
    fontSize: 14,
  },
  resendBtn: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#4f46e5",
  },
  resendBtnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default VerifyOtpScreen;
