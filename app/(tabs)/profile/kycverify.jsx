import { View, Text } from "react-native";
import React, { useContext } from "react";
import Verify from "../../../src/Screens/Auth/Verify";
import { ItemsContext } from "../../../src/context/ItemContext";
import Verified from "../../../src/Screens/Verified";



const Veriffy = () => {
  const { user } = useContext(ItemsContext);
  console.log(user);
  const Help = () => {
    if (user.kycStatus == "Verified") {
      return <Verified isVerified={true}/>;
    } else {
      return <Verify />;
    }
  };

  return <Help />;
};

export default Veriffy;
