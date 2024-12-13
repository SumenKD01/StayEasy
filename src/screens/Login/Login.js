import { Text, View } from "react-native";
import CustomButtonBig from "../../components/Buttons/CustomButtonBig"
import { Colors } from "../../utils/Colors"

export default Login = () => {

    const clickFunction = () => {
        console.log("Button Pressed");
    }

    return (
        <View>
            <Text>Login</Text>
            <CustomButtonBig textColor={'white'} buttonName={"Login"} buttonColor={Colors.priyaRed} buttonFunction={clickFunction} />
        </View>
    )
}