import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import bimage from '../../../assets/images/food.png';

const BDetails = () => {
    const route = useRoute();
    const { name, date, location, description, image, cdate } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Image at the top */}
            <Image source={bimage} style={styles.image} />
            
            {/* Details Section */}
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Event Name:</Text>
                <Text style={styles.title}>{name}</Text>

                <View style={styles.row}>
                    <View style={styles.halfWidth}>
                        <Text style={styles.label}>Start Timing:</Text>
                        <Text style={styles.date}>📅 {date}</Text>
                    </View>
                    <View style={styles.halfWidth}>
                        <Text style={styles.label}>End Timing:</Text>
                        <Text style={styles.date}>⏳ {cdate}</Text>
                    </View>
                </View>

                <Text style={styles.label}>Location:</Text>
                <Text style={styles.location}>📍 {location}</Text>

                <Text style={styles.label}>Description:</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#f8f9fa', // Light background for readability
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
        marginBottom: 10,
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
