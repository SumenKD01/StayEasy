import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";

export const ColorPicker = ({ colorChanger }) => {
    const colorData = ['red', 'blue', 'yellow', 'green', 'white', 'black', 'pink', 'cyan', 'purple', 'lime', 'orange', 'beige', 'violet', 'silver'];
    return (
        <View style={styles.colorContainer}>
            <FlatList
                contentContainerStyle={styles.colorList}
                horizontal={true}
                data={colorData}
                renderItem={({ item }) => <TouchableOpacity style={[styles.colorBox, { backgroundColor: item }]} onPress={() => colorChanger(item)}>
                </TouchableOpacity>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    colorContainer: {
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 10,
        height: 50,
        position: 'absolute',
        top: 0
    },
    colorList: {
        gap: 10
    },
    colorBox: {
        height: 30,
        width: 30,
        borderRadius: 14,
        borderColor: 'black',
        borderWidth: 1
    }
});