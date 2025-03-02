import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useLanguage } from '../../../src/context/LanguageContext';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("English");
  const { locale, changeLanguage, t } = useLanguage();

const router=useRouter()
  const toggleLanguage = () => {
    setLanguage((prevLang) => prevLang === "English" ? "हिंदी" : "English");
    console.log(language)
    changeLanguage(language);
  };

  const handleLogout=async()=>{

      const token =await  SecureStore.deleteItemAsync("userToken");
router.replace("login")

  }

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>johndoe@example.com</Text>
      </View>

      {/* Settings Menu */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={toggleLanguage}>
          <Ionicons name="globe-outline" size={24} color="black" />
          <Text style={styles.menuText}>{t('changeLanguage')}</Text>
          <Text style={styles.menuValue}>{language}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={()=>router.push("/profile/updateprofile")}>
          <Ionicons name="person-outline" size={24} color="black" />
          <Text style={styles.menuText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={()=>router.push("/profile/kycverify")}>
          <Ionicons name="document-text-outline" size={24} color="black" />
          <Text style={styles.menuText}>KYC Verification</Text>
        </TouchableOpacity>

        <View style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Text style={styles.menuText}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </View>

        <TouchableOpacity style={styles.menuItem} onPress={()=>handleLogout()}>
          <Ionicons name="log-out-outline" size={24} color="red" />
          <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  profileContainer: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  profileName: { fontSize: 18, fontWeight: "bold" },
  profileEmail: { fontSize: 14, color: "gray" },
  menuContainer: { borderTopWidth: 1, borderTopColor: "#ddd", marginTop: 20 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: { fontSize: 16, flex: 1, marginLeft: 10 },
  menuValue: { fontSize: 16, color: "gray" },
});

export default SettingsScreen;
