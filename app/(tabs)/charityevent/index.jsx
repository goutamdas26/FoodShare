import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { ItemsContext } from "../../../src/context/ItemContext";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString();
};

const FoodCharityScreen = () => {
  const navigation = useNavigation();
  const { events, fetchEvents } = useContext(ItemsContext);
  const [refreshing, setRefreshing] = useState(false);

  const handlePress = (item) => {
    navigation.navigate("event-details", item);
  };

  const handleAddBhandara = () => {
    router.push("list");
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.detail}>📅 {formatDate(item.startDate)} {formatTime(item.startDate)}</Text>
        <Text style={styles.detail}>📍 {item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Charity Events</Text>
      {events.length > 0 ? (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : (
        <Text style={styles.noEventsText}>No Events Available now</Text>
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddBhandara}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAF6",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#283593",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
  },
  noEventsText: {
  fontSize: 16,
  color: "#5C6BC0",
  textAlign: "center",
  marginTop: 50,
}
,
  cardContent: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: "#5C6BC0",
    marginBottom: 2,
  },
  addButton: {
    backgroundColor: "#3F51B5",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 6,
  },
  addButtonText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
});

export default FoodCharityScreen;
