// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Alert,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// const KYCVerificationScreen = () => {
//   const [kycData, setKycData] = useState({
//     fullName: "",
//     idNumber: "",
//     idType: "AADHAR",
//     frontImage: null,
//     backImage: null,
//   });
//   const [loading, setLoading] = useState(false);

//   const pickImage = async (type) => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.8,
//       });
//       if (!result.canceled) {
//         setKycData({ ...kycData, [type]: result.assets[0].uri });
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to pick image");
//     }
//   };

//   const handleSubmit = async () => {
//     if (
//       !kycData.fullName ||
//       !kycData.idNumber ||
//       !kycData.frontImage ||
//       !kycData.backImage
//     ) {
//       Alert.alert("Error", "Please fill all the required fields");
//       return;
//     }
//     setLoading(true);
//     try {
//       Alert.alert("Success", "KYC details submitted successfully");
//     } catch (error) {
//       Alert.alert("Error", "Failed to submit KYC details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}> Verification</Text>
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Full Name</Text>
//         <TextInput
//           style={styles.input}
//           value={kycData.fullName}
//           onChangeText={(text) => setKycData({ ...kycData, fullName: text })}
//           placeholder="Enter full name"
//           placeholderTextColor="#bbb"
//         />
//         <Text style={styles.label}>ID Number</Text>
//         <TextInput
//           style={styles.input}
//           value={kycData.idNumber}
//           onChangeText={(text) => setKycData({ ...kycData, idNumber: text })}
//           placeholder="Enter ID number"
//           keyboardType="number-pad"
//           placeholderTextColor="#bbb"
//         />
//         <Text style={styles.label}>ID Type</Text>
//         <View style={styles.idTypeContainer}>
//           {["AADHAR", "VOTER ID"].map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.idTypeButton,
//                 kycData.idType === type && styles.selectedIdType,
//               ]}
//               onPress={() => setKycData({ ...kycData, idType: type })}
//             >
//               <Text
//                 style={[
//                   styles.idTypeText,
//                   kycData.idType === type && styles.selectedIdTypeText,
//                 ]}
//               >
//                 {type}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//         <Text style={styles.label}>Upload ID Front Side</Text>
//         <TouchableOpacity
//           style={styles.uploadButton}
//           onPress={() => pickImage("frontImage")}
//         >
//           {kycData.frontImage ? (
//             <Image
//               source={{ uri: kycData.frontImage }}
//               style={styles.previewImage}
//             />
//           ) : (
//             <Text style={styles.uploadButtonText}>+ Upload Front</Text>
//           )}
//         </TouchableOpacity>
//         <Text style={styles.label}>Upload ID Back Side</Text>
//         <TouchableOpacity
//           style={styles.uploadButton}
//           onPress={() => pickImage("backImage")}
//         >
//           {kycData.backImage ? (
//             <Image
//               source={{ uri: kycData.backImage }}
//               style={styles.previewImage}
//             />
//           ) : (
//             <Text style={styles.uploadButtonText}>+ Upload Back</Text>
//           )}
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.submitButton, loading && styles.disabledButton]}
//           onPress={handleSubmit}
//           disabled={loading}
//         >
//           <Text style={styles.submitButtonText}>
//             {loading ? "Submitting..." : "Submit KYC"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#eef2ff",
//   },
//   header: {
//     fontSize: 26,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 20,
//     color: "#4f46e5",
//   },
//   formContainer: {
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//     color: "#4338ca",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#6366f1",
//     backgroundColor: "#e0e7ff",
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 15,
//     fontSize: 16,
//     color: "#312e81",
//   },
//   idTypeContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 15,
//   },
//   idTypeButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#6366f1",
//     backgroundColor: "#e0e7ff",
//   },
//   selectedIdType: {
//     backgroundColor: "#4f46e5",
//   },
//   idTypeText: {
//     color: "#312e81",
//     fontWeight: "500",
//   },
//   selectedIdTypeText: {
//     color: "#fff",
//   },
//   uploadButton: {
//     borderWidth: 1,
//     borderColor: "#6366f1",
//     borderRadius: 10,
//     borderStyle: "dashed",
//     height: 150,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 15,
//     backgroundColor: "#e0e7ff",
//   },
//   uploadButtonText: {
//     color: "#4f46e5",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   previewImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//   },
//   submitButton: {
//     backgroundColor: "#4f46e5",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   disabledButton: {
//     backgroundColor: "#ccc",
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default KYCVerificationScreen;
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";
import { ItemsContext } from "../../../src/context/ItemContext";

const KYCVerificationScreen = () => {
  const API_URL = Constants.expoConfig.extra.API_URL;
const {user}=useContext(ItemsContext)
  const [kycData, setKycData] = useState({
    fullName: "",
    idNumber: "",
    idType: "AADHAR",
    frontImage: null,
    backImage: null,
  });
  const [loading, setLoading] = useState(false);

  const pickImage = async (type) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      if (!result.canceled) {
        setKycData({ ...kycData, [type]: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleSubmit = async () => {
    if (!kycData.fullName || !kycData.idNumber || !kycData.frontImage || !kycData.backImage) {
      Alert.alert("Error", "Please fill all the required fields");
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("userId", user._id); // Replace with actual user ID
      formData.append("fullName", kycData.fullName);
      formData.append("idNumber", kycData.idNumber);
      formData.append("idType", kycData.idType);

      formData.append("frontImage", {
        uri: kycData.frontImage,
        type: "image/jpeg",
        name: "frontImage.jpg",
      });

      formData.append("backImage", {
        uri: kycData.backImage,
        type: "image/jpeg",
        name: "backImage.jpg",
      });

      const response = await axios.post(`${API_URL}/api/kyc/submit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Success", response.data.message);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to submit KYC details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Verification</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={kycData.fullName}
          onChangeText={(text) => setKycData({ ...kycData, fullName: text })}
          placeholder="Enter full name"
          placeholderTextColor="#bbb"
        />
        <Text style={styles.label}>ID Number</Text>
        <TextInput
          style={styles.input}
          value={kycData.idNumber}
          onChangeText={(text) => setKycData({ ...kycData, idNumber: text })}
          placeholder="Enter ID number"
          keyboardType="number-pad"
          placeholderTextColor="#bbb"
        />
        <Text style={styles.label}>ID Type</Text>
        <View style={styles.idTypeContainer}>
          {["AADHAR", "VOTER ID"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.idTypeButton,
                kycData.idType === type && styles.selectedIdType,
              ]}
              onPress={() => setKycData({ ...kycData, idType: type })}
            >
              <Text
                style={[
                  styles.idTypeText,
                  kycData.idType === type && styles.selectedIdTypeText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Upload ID Front Side</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => pickImage("frontImage")}
        >
          {kycData.frontImage ? (
            <Image
              source={{ uri: kycData.frontImage }}
              style={styles.previewImage}
            />
          ) : (
            <Text style={styles.uploadButtonText}>+ Upload Front</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.label}>Upload ID Back Side</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => pickImage("backImage")}
        >
          {kycData.backImage ? (
            <Image
              source={{ uri: kycData.backImage }}
              style={styles.previewImage}
            />
          ) : (
            <Text style={styles.uploadButtonText}>+ Upload Back</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Submitting..." : "Submit KYC"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2ff",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#4f46e5",
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#4338ca",
  },
  input: {
    borderWidth: 1,
    borderColor: "#6366f1",
    backgroundColor: "#e0e7ff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#312e81",
  },
  idTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  idTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#6366f1",
    backgroundColor: "#e0e7ff",
  },
  selectedIdType: {
    backgroundColor: "#4f46e5",
  },
  idTypeText: {
    color: "#312e81",
    fontWeight: "500",
  },
  selectedIdTypeText: {
    color: "#fff",
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#6366f1",
    borderRadius: 10,
    borderStyle: "dashed",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#e0e7ff",
  },
  uploadButtonText: {
    color: "#4f46e5",
    fontSize: 16,
    fontWeight: "600",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "#4f46e5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default KYCVerificationScreen;
