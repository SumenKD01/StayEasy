import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ShowOptionsModal({ options, isVisible, onClose, functionToExecute }) {
    return (
        <Modal
            visible={isVisible}
            transparent
            // animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => functionToExecute(item)}
                            >
                                <Text style={styles.modalItemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        style={styles.modalCloseButton}
                        onPress={onClose}
                    >
                        <Text style={styles.modalCloseButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
