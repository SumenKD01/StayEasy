import { Image, KeyboardAvoidingView, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import * as Animatable from 'react-native-animatable';
import * as Font from 'expo-font';
import { useEffect, useState } from "react";
import InputTextType from "../../components/TextInputs/InputTextType";
import APICall from "../../utils/APICall";
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from "react-native";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/actions/userActions';
import { useRouter } from "expo-router";


export default LoginForm = () => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const router = useRouter();
    const [authenticationLoader, setAuthenticationLoader] = useState(false);
    const [authenticationMessage, setAuthenticationMessage] = useState("Authenticating ......");
    const apiGot = "https://androidapi220230605081325.azurewebsites.net/api/approval/VerifyUserName";
    const dispatch = useDispatch();

    let formData;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            UserName: "",
            Password: ""
        },
    });

    function getUserInfo(dataGot, result) {
        if (result === "Got User Info") {
            dispatch(loginSuccess(dataGot));
        }
    }

    function resultFunc(resultCame) {
        console.log("Checked - ", resultCame);
        if (resultCame === "User Authentication Success") {
            let apiForUserInfo = "https://androidapi220230605081325.azurewebsites.net/api/approval/VerifyUserName1";
            setAuthenticationMessage("Authentication Successful");
            APICall(apiForUserInfo, formData, getUserInfo, "getUserInformation");
            setTimeout(() => {
                const path = "/(tabs)";
                router.push({ pathname: path });
                setAuthenticationLoader(false);
                setAuthenticationMessage("Authenticating ......");
            }, 2 * 1000);
        } else {
            setAuthenticationMessage("Authentication failed !! \n *Please enter details carefully*");
        }
    }

    function toggleAuthenticationModal() {
        setAuthenticationLoader(authenticationLoader ? false : true);
        setAuthenticationMessage("Authenticating ......");
    }

    const onSubmit = async (data) => {
        console.log("Data - ", data);
        formData = data;
        setAuthenticationLoader(true);
        console.log("Authentication Loading ...", authenticationLoader);
        APICall(apiGot, data, resultFunc, "checkAuthentication")
        reset();
    }

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Poppins: require('../../assets/fonts/Poppins/Poppins-Bold.ttf')
            });
            setFontLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null;
    }

    return (
        <Animatable.View animation={'slideInUp'} style={styles.formView} transparent >
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.formHeading}>Welcome</Text>
                <Text style={styles.formDesc}>Please enter the details below to continue.</Text>
            </View>
            <Controller
                control={control}
                name="UserName"
                rules={{
                    required: "Please enter your username !",
                }}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <View style={[styles.inputFieldContainer, { borderColor: errors.UserName ? 'red' : '#C1C1C1' }]}>
                            <View style={{ flex: 1 }}>
                                <Image source={require('../../assets/icons/userNameIcon.png')} style={{ width: 25, height: 25 }} />
                            </View>
                            <View style={{ flex: 11 }}>
                                <InputTextType style={{ backgroundColor: '#000' }} inputName={"Email Address"} changeValue={onChange} value={value} type={"email"} />
                            </View>
                        </View>
                        {
                            errors.UserName &&
                            <Text style={{ color: 'red', fontSize: 10, marginLeft: 20, marginTop: 2 }}>{errors.UserName.message}</Text>
                        }
                    </View>
                )}
            />
            <Controller
                control={control}
                name="Password"
                rules={{
                    required: "Please enter your password !",
                }}
                render={({ field: { onChange, value } }) => (
                    <KeyboardAvoidingView>
                        <View style={[styles.inputFieldContainer, { borderColor: errors.Password ? 'red' : '#C1C1C1' }]}>
                            <View style={{ flex: 1 }}>
                                <Image source={require('../../assets/icons/passwordIcon.png')} style={{ width: 25, height: 25 }} />
                            </View>
                            <View style={{ flex: 11 }}>
                                <InputTextType inputName={"Password"} changeValue={onChange} value={value} />
                            </View>
                        </View>
                        {
                            errors.Password &&
                            <Text style={{ color: 'red', fontSize: 10, marginLeft: 20, marginTop: 2 }}>{errors.Password.message}</Text>
                        }
                    </KeyboardAvoidingView>
                )}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {authenticationLoader &&
                <Modal visible={authenticationLoader} transparent>
                    <TouchableOpacity style={styles.messageModalBack} onPress={toggleAuthenticationModal} activeOpacity={1}>
                        <TouchableOpacity style={styles.messageBox} activeOpacity={1}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20, borderRadius: 10, backgroundColor: 'white', padding: 20 }}>
                                {!(authenticationMessage.includes("failed") || authenticationMessage.includes("Successful")) &&
                                    <ActivityIndicator size={'large'} color={['#4E729A', '#18C0C1']} />
                                }
                                {authenticationMessage.includes("failed") &&
                                    <Image source={require('../../assets/icons/exclamation.png')} style={styles.messageBoxIcon} />
                                }
                                {authenticationMessage.includes("Successful") &&
                                    <Image source={require('../../assets/icons/verified.png')} style={styles.messageBoxIcon} />
                                }
                                <Text style={{ color: authenticationMessage.includes("failed") ? 'red' : authenticationMessage.includes("Success") ? 'green' : 'black', textAlign: 'center' }}>{authenticationMessage}</Text>
                                {authenticationMessage.includes("failed") &&
                                    <TouchableOpacity style={{ backgroundColor: '#18C0C1', paddingVertical: 5, borderRadius: 10, paddingHorizontal: 10 }} onPress={toggleAuthenticationModal}>
                                        <Text style={{ fontFamily: 'Poppins_Regular', color: 'white' }}>OK</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
            }
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    formView: {
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 20,
        gap: 18,
        overflow: 'hidden'
    },
    formHeading: {
        fontSize: 30,
        color: '#2D4094',
        textAlign: 'center',
        fontFamily: 'Poppins',
        marginBottom: -5
    },
    formDesc: {
        fontSize: 14,
        color: '#858181',
        textAlign: 'center',
        fontWeight: '400'
    },
    loginButton: {
        backgroundColor: '#C6241F',
        borderRadius: 50,
        padding: 5,
        margin: 20,
        shadowColor: '#C6241F',
        elevation: 8,
    },
    buttonText: {
        fontFamily: 'Poppins',
        fontSize: 24,
        color: 'white',
        textAlign: 'center'
    },
    inputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 2,
        marginHorizontal: 20,
        backgroundColor: '#FAFAFA'
    },
    messageBox: {
        width: '80%',
        top: '40%',
        alignSelf: 'center',
        padding: 10
    },
    messageModalBack: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flex: 1
    },
    messageBoxIcon: {
        height: 40,
        width: 40
    }
});