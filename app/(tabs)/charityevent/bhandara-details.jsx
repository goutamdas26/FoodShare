import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const BDetails = () => {
  const route = useRoute();
  const {
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    description,
    imageUrl,
  } = route.params;

  // Format ISO date string to readable date
  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  // Format ISO string to readable time
  const formatTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Check event status
  const getStatus = () => {
    const now = new Date(); // current time

    const start = new Date(startTime); // event start time
    const end = new Date(endTime); // event end time

    // Compare the current time with the event start and end times
    if (now < start) return 'Upcoming'; // Event has not started
    if (now >= start && now <= end) return 'Ongoing'; // Event is in progress
    return 'Completed'; // Event has finished
  };

  const status = getStatus(); // Get the status of the event

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Event Image */}
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Event Name:</Text>
        <Text style={styles.title}>{title}</Text>

        {/* Event Status */}
        <Text style={[styles.statusText, { color: status === 'Ongoing' ? 'green' : status === 'Completed' ? 'gray' : 'blue' }]}>
          {status === 'Ongoing' ? '🟢 Open Now' : status === 'Completed' ? '🔴 Closed' : '🔵 Upcoming'}
        </Text>

        {/* Date and Time Info */}
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Start Timing:</Text>
            <Text style={styles.date}>📅 {formatDate(startDate)}</Text>
            <Text style={styles.date}>⏳ {formatTime(startTime)}</Text>
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>End Timing:</Text>
            <Text style={styles.date}>📅 {formatDate(endDate)}</Text>
            <Text style={styles.date}>⏳ {formatTime(endTime)}</Text>
          </View>
        </View>

        {/* Location */}
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.location}>📍 {location}</Text>

        {/* Description */}
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  halfWidth: {
    width: '48%',
  },
  date: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  location: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default BDetails;
