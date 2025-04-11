import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import Verify from "../../../src/Screens/Auth/Verify";
import { ItemsContext } from "../../../src/context/ItemContext";
import Verified from "../../../src/Screens/Verified";
import Toast from "react-native-toast-message";

const Veriffy = () => {
  const { user } = useContext(ItemsContext);

  useEffect(() => {
    if (user.kycStatus === "Verified") {
      Toast.show({
        type: "success",
        text1: "Verified 🎉",
        text2: "Welcome to the platform!",
      });
    } else {
      Toast.show({
        type: "info",
        text1: "Verification Pending",
        text2: "Please verify your details to continue.",
      });
    }
  }, [user]);

  const Help = () => {
    if (user.kycStatus === "Verified") {
      return <Verified userId={user._id} />;
    } else {
      return <Verify />;
    }
  };

  return <Help />;
};

export default Veriffy;
