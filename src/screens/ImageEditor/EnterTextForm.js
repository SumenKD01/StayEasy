import { StyleSheet, TextInput, View, Text } from "react-native"
import { CustomButton } from "./CustomButton";
import { useState } from "react";
import SelectDropdown from 'react-native-select-dropdown';

export default EnterTextForm = ({ textSetFunc, closeEditorView }) => {

    const [textTyping, setTextTyping] = useState('');
    const [colorChosen, setColorChosen] = useState('black');
    const [sizeChosen, setSizeChosen] = useState('20');
    const colorsAvailable = ["black", "red", "yellow", "white","blue","pink","green"];

    const sendTheText = () => {
        textSetFunc({
            text: textTyping,
            color: colorChosen,
            size: sizeChosen
        });
        setTextTyping('');
        setColorChosen('black');
        setSizeChosen('20');
        closeEditorView();
    }

    return (
        <View style={styles.formContainer}>
            <View>
                <Text style={styles.formLabels}>Enter the Text:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={newText => setTextTyping(newText)}
                    value={textTyping}
                />
            </View>
            <View style={styles.form2ndRow}>
                <View>
                    <Text style={styles.formLabels}>Color</Text>
                    <SelectDropdown
                        data={colorsAvailable}
                        defaultValue={colorsAvailable[0]}
                        onSelect={(selectedItem, index) => {
                            setColorChosen(selectedItem);
                        }}
                        buttonStyle={styles.colorChooseButton}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.formLabels}>Size</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={newText => setSizeChosen(newText)}
                        value={sizeChosen}
                        keyboardType="numeric"
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton textRecieved={'Cancel'} functionRecieved={closeEditorView} />
                <CustomButton textRecieved={'Paste'} functionRecieved={sendTheText} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        gap: 10,
        backgroundColor: 'white',
        position: 'absolute',
        borderWidth: 2,
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        bottom: 0
    },
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        marginTop: 5,
        minWidth: 140,
        maxWidth: 300
    },
    formLabels: {
        paddingLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    form2ndRow: {
        flexDirection: 'row'
    },
    colorChooseButton: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        marginTop: 5,
        width: 140,
    }
});