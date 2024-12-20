import { StyleSheet, TextInput } from "react-native";

export default InputTextType = ({ inputName, changeValue, value, type }) => {
    return (
        <TextInput
            style={styles.inputField}
            placeholder={inputName}
            onChangeText={changeValue}
            value={value}
            textContentType={type === "email" ? 'emailAddress' : 'name'}
            secureTextEntry={inputName === "Password"}
        />
    );
}

const styles = StyleSheet.create({
    inputField: {
        height: 45,
        padding: 10,
        width: '100%',
        fontSize: 18
    },
});