import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Sample raw data for live bhandara
const liveBhandaraData = [
  { id: '1', name: 'Bhandara at Community Center', date: '2023-10-01', location: 'Downtown', image: 'https://example.com/image1.jpg',cdate:'2023-10-01 08:00 PM' },
  { id: '2', name: 'Food Donation Drive', date: '2023-10-05', location: 'City Park', image: 'https://example.com/image2.jpg',cdate:'2023-10-01 08:00 PM' },
  { id: '3', name: 'Charity Bhandara', date: '2023-10-10', location: 'Old Town', image: 'https://example.com/image3.jpg',cdate:'2023-10-01 08:00 PM' },
];

const LiveBhandaraScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  const handlePress = (item) => {
    // Navigate to the details screen
    navigation.navigate('bhandara-details', item); // Pass the ID or necessary data
  };

  const handleAddBhandara = () => {
    // Navigate to the add bhandara screen
    navigation.navigate('list-bhandara'); // Replace with your actual screen name
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>Date: {item.date}</Text>
      <Text style={styles.itemDetails}>Location: {item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={liveBhandaraData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddBhandara}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20, // Positioned at the bottom
    right: 20,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default LiveBhandaraScreen;