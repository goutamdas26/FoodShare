import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';

const liveBhandaraData = [
  { id: '1', name: 'Bhandara at Community Center', date: '2023-10-01', location: 'Downtown', image: 'https://example.com/image1.jpg', cdate: '2023-10-01 08:00 PM' },
  { id: '2', name: 'Food Donation Drive', date: '2023-10-05', location: 'City Park', image: 'https://example.com/image2.jpg', cdate: '2023-10-05 08:00 PM' },
  { id: '3', name: 'Charity Bhandara', date: '2023-10-10', location: 'Old Town', image: 'https://example.com/image3.jpg', cdate: '2023-10-10 08:00 PM' },
];

const ListBhandara = () => {
  const [bhandaraName, setBhandaraName] = useState('');
  const [bhandaraDate, setBhandaraDate] = useState('');
  const [bhandaraLocation, setBhandaraLocation] = useState('');
  const [bhandaraCDate, setBhandaraCDate] = useState('');
  const [bhandaraData, setBhandaraData] = useState(liveBhandaraData);

  const addBhandara = () => {
    if (bhandaraName && bhandaraDate && bhandaraLocation && bhandaraCDate) {
      const newBhandara = {
        id: Math.random().toString(),
        name: bhandaraName,
        date: bhandaraDate,
        location: bhandaraLocation,
        cdate: bhandaraCDate,
        image: 'https://example.com/default-image.jpg',
      };
      setBhandaraData([...bhandaraData, newBhandara]);
      setBhandaraName('');
      setBhandaraDate('');
      setBhandaraLocation('');
      setBhandaraCDate('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetails}>📅 Start Date: {item.date}</Text>
        <Text style={styles.itemDetails}>⏳ Closing Date: {item.cdate}</Text>
        <Text style={styles.itemDetails}>📍 {item.location}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upcoming Bhandaras</Text>

      <TextInput placeholder="Bhandara Name" value={bhandaraName} onChangeText={setBhandaraName} style={styles.input} />
      <TextInput placeholder="Start Date (YYYY-MM-DD)" value={bhandaraDate} onChangeText={setBhandaraDate} style={styles.input} />
      <TextInput placeholder="Closing Date & Time" value={bhandaraCDate} onChangeText={setBhandaraCDate} style={styles.input} />
      <TextInput placeholder="Location" value={bhandaraLocation} onChangeText={setBhandaraLocation} style={styles.input} />
      
      <TouchableOpacity style={styles.addButton} onPress={addBhandara}>
        <Text style={styles.addButtonText}>➕ Add Bhandara</Text>
      </TouchableOpacity>

      <FlatList
        data={bhandaraData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  itemDetails: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
});

export default ListBhandara;
