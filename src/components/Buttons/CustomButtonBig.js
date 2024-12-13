import { Text, TouchableOpacity } from "react-native"

export default CustomButtonBig = ({buttonName, buttonColor, textColor, buttonFunction}) => {
    const style = {
        width: "80%",
        padding: 4,
        backgroundColor: buttonColor,
        color: textColor,
    }
    return (
        <TouchableOpacity style={ style } onPress={buttonFunction}>
            <Text>{buttonName}</Text>
        </TouchableOpacity>
    )
}