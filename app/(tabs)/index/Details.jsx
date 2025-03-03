import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const Details = () => {
    const route = useRoute();
    const { name, image, quantity, category, location, donor, dateTime } = route.params;

    return (
        <ScrollView style={styles.container}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            defaultSource={require("../../../assets/images/icon.png")}
          />
    
          <View style={styles.content}>
            <Text style={styles.title}>{name}</Text>
    
        
    
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Claim Details</Text>
              <View style={styles.detailRow}>
                <MaterialIcons name="event" size={20} color="#666" />
                <Text style={styles.detailText}>
                  Posted At: {dateTime}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="access-time" size={20} color="#666" />
                <Text style={styles.detailText}>
                  Category: {category}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="restaurant" size={20} color="#666" />
                <Text style={styles.detailText}>
                  Quantity: {quantity}
                </Text>
              </View>
            </View>
    
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Donor Information</Text>
              <View style={styles.detailRow}>
                <MaterialIcons name="store" size={20} color="#666" />
                <Text style={styles.detailText}>{donor}</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="location-on" size={20} color="#666" />
                <Text style={styles.detailText}>{location}</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="phone" size={20} color="#666" />
                <Text style={styles.detailText}>{}</Text>
              </View>
            </View>
    
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{}</Text>
            </View>
          </View>
        </ScrollView>
      );
}

export default Details