import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
    FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

export default function App() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [fileName, setFileName] = useState('IMG918191000192.jpg');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ['Billing Issue', 'Service Request', 'Technical Support', 'Feedback', 'Other'];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setDropdownVisible(false);
    };

    const handleFileUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*', // You can specify file types, e.g., 'image/*' for images only
                copyToCacheDirectory: true,
            });

            if (result.type === 'success') {
                setFileName(result.name);
                console.log('Selected file:', result);
            }
        } catch (err) {
            console.error('Error selecting file:', err);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <MaterialIcons name="arrow-back" size={24} color="#FFF" />
                <Text style={styles.headerText}>Raise Complaint</Text>
            </View>

            {/* Form */}
            <ScrollView contentContainerStyle={styles.form}>
                {/* Title */}
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    placeholderTextColor="#7A7A7A"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />

                {/* Description */}
                <TextInput
                    style={[styles.input, styles.description]}
                    placeholder="Description (in 100 words)"
                    placeholderTextColor="#7A7A7A"
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />

                {/* Contact */}
                <TextInput
                    style={styles.input}
                    placeholder="Contact No."
                    placeholderTextColor="#7A7A7A"
                    keyboardType="numeric"
                    value={contact}
                    onChangeText={(text) => setContact(text)}
                />

                {/* Select Category */}
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setDropdownVisible(true)}
                >
                    <Text style={styles.dropdownText}>
                        {selectedCategory || 'Select Category'}
                    </Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color="#7A7A7A" />
                </TouchableOpacity>

                {/* Upload */}
                <TouchableOpacity style={styles.upload} onPress={handleFileUpload}>
                    <Text style={styles.uploadText}>Upload</Text>
                    <MaterialIcons name="file-upload" size={24} color="#8E8E8E" />
                </TouchableOpacity>

                {/* File Name */}
                {fileName ? (
                    <View style={styles.fileRow}>
                        <Text style={styles.fileName}>{fileName}</Text>
                        <MaterialIcons
                            name="delete"
                            size={20}
                            color="#8E8E8E"
                            onPress={() => setFileName('')}
                        />
                    </View>
                ) : null}

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitText}>Raise Complaint</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Dropdown Modal */}
            <Modal
                visible={isDropdownVisible}
                transparent
                // animationType="slide"
                onRequestClose={() => setDropdownVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleCategorySelect(item)}
                                >
                                    <Text style={styles.modalItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setDropdownVisible(false)}
                        >
                            <Text style={styles.modalCloseButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        height: 60,
        backgroundColor: '#D62E2E',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    headerText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    form: {
        padding: 20,
    },
    input: {
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#C1C1C1',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 14,
        color: '#333',
        marginBottom: 15,
    },
    description: {
        height: 100,
        textAlignVertical: 'top',
    },
    dropdown: {
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 2,
    },
    dropdownText: {
        color: '#7A7A7A',
        fontSize: 14,
    },
    upload: {
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 2,
    },
    uploadText: {
        color: '#7A7A7A',
        fontSize: 14,
    },
    fileRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 15,
    },
    fileName: {
        fontSize: 14,
        color: '#8E8E8E',
    },
    submitButton: {
        backgroundColor: '#D62E2E',
        borderRadius: 10,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#FF0000',
        shadowRadius: 10,
        elevation: 5,
    },
    submitText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        width: '80%',
        maxHeight: '60%',
        padding: 20,
    },
    modalItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
    },
    modalCloseButton: {
        borderWidth: 2,
        borderColor: '#D62E2E',
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: '#D62E2E',
        fontSize: 16,
        fontWeight: 'bold',
    },
});