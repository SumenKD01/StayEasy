import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Home</Text>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                {/* Raise Complaint Card */}
                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardTitle}>Raise Complaint</Text>
                    <Image
                        source={require('../../../assets/images/complaint.png')}
                        style={[styles.cardImage, styles.complaintImg]}
                    />
                </TouchableOpacity>

                {/* Check Status Card */}
                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardTitle}>Check Status</Text>
                    <Image
                        source={require('../../../assets/images/checking.png')}
                        style={styles.cardImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#D62E2E',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30,
    },
    card: {
        position: 'relative',
        overflow: 'hidden',
        width: 150,
        height: 150,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#F96E66',
        alignItems: 'left',
        justifyContent: 'top',
        shadowColor: '#FF0000',
        shadowRadius: 10,
        elevation: 8,
    },
    cardTitle: {
        padding: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#DB3A32',
        textAlign: 'left',
        marginBottom: 10,
    },
    cardImage: {
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: -5,
        right: -5,
        transform: [{ rotate: '-10deg' }],
    },
    complaintImg: {
        width: 55,
        height: 55,
    }
});