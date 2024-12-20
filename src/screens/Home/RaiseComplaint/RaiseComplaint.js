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
import { Controller, useForm } from 'react-hook-form';
import ShowOptionsModal from '../../../components/Modals/ShowOptionsModal';

export default function RaiseComplaint() {
    const [fileName, setFileName] = useState('IMG918191000192.jpg');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isSubDropdownVisible, setSubDropdownVisible] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const categories = ['Civil', 'Electrical', 'Horticulture', 'Housekeeping'];
    const subCategories = ['Carpentering', 'Mason', 'Plumbering'];

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            category: selectedCategory,
            subCategory: selectedSubCategory,
            imageFileName: '',
            mobileNo: '',
            employeeId: '',
            plantName: ''
        }
    })

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setDropdownVisible(false);
    };

    const handleSubCategorySelect = (category) => {
        setSelectedSubCategory(category);
        setSubDropdownVisible(false);
    };

    const onSubmit = async (data) => {
        console.log(data);
        reset();
        setSelectedCategory("");
        setSelectedSubCategory("");
    }

    function toggleCategoryModal() {
        setDropdownVisible(isDropdownVisible ? false : true);
    }

    function toggleSubCategoryModal() {
        setSubDropdownVisible(isSubDropdownVisible ? false : true);
    }

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
                <Controller
                    control={control}
                    name='title'
                    rules={{ required: 'Please enter the Title !' }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            placeholderTextColor="#7A7A7A"
                            value={value}
                            onChangeText={(abc) => onChange(abc)}
                        />
                    )}
                />
                {errors.title && (
                    <Text style={{ color: 'red' }}>
                        {errors.title.message}
                    </Text>
                )}

                <Controller
                    control={control}
                    name='description'
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, styles.description]}
                            placeholder="Description (in 100 words, Optional)"
                            placeholderTextColor="#7A7A7A"
                            multiline
                            numberOfLines={4}
                            value={value}
                            onChangeText={(abc) => onChange(abc)}
                        />
                    )}
                />
                {errors.description && (
                    <Text style={{ color: 'red' }}>
                        {errors.description.message}
                    </Text>
                )}

                <Controller
                    control={control}
                    name='mobileNo'
                    rules={{ required: 'Please enter the Contact No. !' }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Contact No."
                            placeholderTextColor="#7A7A7A"
                            keyboardType="numeric"
                            value={value}
                            onChangeText={(abc) => onChange(abc)}
                        />
                    )}
                />
                {errors.mobileNo && (
                    <Text style={{ color: 'red' }}>
                        {errors.mobileNo.message}
                    </Text>
                )}

                <Controller
                    control={control}
                    name='category'
                    rules={{ required: 'Please select a category !' }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TouchableOpacity
                                style={styles.dropdown}
                                onPress={() => setDropdownVisible(true)}
                            >
                                <Text style={styles.dropdownText}>
                                    {selectedCategory || 'Select Category'}
                                </Text>
                                <MaterialIcons name="arrow-drop-down" size={24} color="#7A7A7A" />
                            </TouchableOpacity>
                            <ShowOptionsModal functionToExecute={(abc) => { handleCategorySelect(abc); onChange(abc); }} isVisible={isDropdownVisible} onClose={toggleCategoryModal} options={categories} />
                        </>
                    )}
                />
                {errors.category && (
                    <Text style={{ color: 'red' }}>
                        {errors.category.message}
                    </Text>
                )}

                {selectedCategory === "Civil" &&
                    <>
                        <Controller
                            control={control}
                            name='subCategory'
                            rules={{ required: 'Please select the sub category !' }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <TouchableOpacity
                                        style={styles.dropdown}
                                        onPress={() => setSubDropdownVisible(true)}
                                    >
                                        <Text style={styles.dropdownText}>
                                            {selectedSubCategory || 'Select Category'}
                                        </Text>
                                        <MaterialIcons name="arrow-drop-down" size={24} color="#7A7A7A" />
                                    </TouchableOpacity>
                                    <ShowOptionsModal functionToExecute={(abc) => { handleSubCategorySelect(abc); onChange(abc); }} isVisible={isSubDropdownVisible} onClose={toggleSubCategoryModal} options={subCategories} />
                                </>
                            )}
                        />
                        {errors.subCategory && (
                            <Text style={{ color: 'red' }}>
                                {errors.subCategory.message}
                            </Text>
                        )}


                    </>
                }

                <Controller
                    control={control}
                    name='imageFileName'
                    // rules={{ required: 'Please enter the Job Description !' }}
                    render={({ field: { onChange, value } }) => (
                        <View>
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
                        </View>
                    )}
                />
                {errors.imageFileName && (
                    <Text style={{ color: 'red' }}>
                        {errors.imageFileName.message}
                    </Text>
                )}



                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.submitText}>Raise Complaint</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Dropdown Modal */}

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
    }
});