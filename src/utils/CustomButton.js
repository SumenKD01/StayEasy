import { Image, Text, TouchableOpacity } from "react-native"

export default CustomButton = ({ textPassed, imagePassed, functionPassed, colorPassed, textColor, borderColor, alignText }) => {
    const buttonStyle = {
        backgroundColor: colorPassed,
        justifyContent: alignText?alignText:'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        borderColor: borderColor?borderColor: "",
        borderWidth: borderColor?1:0
    }

    const buttonTextStyle = {
        color: textColor ? textColor : 'white',
        paddingHorizontal: 10,
    }

    const buttonIconStyle = {
        height: 20,
        width: 20
    }

    return (
        <TouchableOpacity style={buttonStyle} onPress={functionPassed} delayPressIn={0}>
            {textPassed === "Next" &&
                <Text style={buttonTextStyle}>{textPassed}</Text>
            }
            {imagePassed &&
                <Image source={imagePassed} style={buttonIconStyle} />
            }
            {textPassed !== "Next" &&
                <Text style={buttonTextStyle}>{textPassed}</Text>
            }
        </TouchableOpacity>
    )
}