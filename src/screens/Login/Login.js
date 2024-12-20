import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';

const width = Dimensions.get('window').width;

export default Login = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Poppins: require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
                Poppins_Regular: require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
                Poppins_LightItalic: require('../../assets/fonts/Poppins/Poppins-LightItalic.ttf'),
                Poppins_SemiBoldItalic: require('../../assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
                Poppins_MediumItalic: require('../../assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
                Poppins_SemiBold: require('../../assets/fonts/Poppins/Poppins-SemiBold.ttf')
            });
            setFontLoaded(true);
        }
        loadFonts();
    }, []);

    useEffect(() => {
		async function prepare() {
			await SplashScreen.preventAutoHideAsync();
		}
		prepare();
	}, []);

	if (!fontLoaded) {
		return null;
	} else {
		SplashScreen.hideAsync();
	}

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/loginImage1.png')} style={[styles.backgroundImage,{opacity: 1}]}>
                <View style={styles.loginBackContent}>
                    <View>
                        <Text style={styles.companyName}>
                            StayEASY
                            <Text style={{ fontFamily: 'Poppins', fontSize: (width / 40), left: 50, bottom: 20}}>v1.0.0</Text>
                        </Text>
                        <Text style={{ fontFamily: 'Poppins_SemiBoldItalic', fontSize: (width / 38), left: (width/4), bottom: (width / 20), color: 'gray' }}>AI powered by MES</Text>
                    </View>
                    <Image source={require('../../assets/images/loginImage2.png')} style={styles.logo} />
                </View>
                <LoginForm />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    logo: {
        width: 3 * (width / 4),
        height: 3 * (width / 4),
    },
    companyName: {
        fontSize: (width / 10),
        padding: (width / 150),
        color: '#004A8E',
        fontFamily: 'Poppins',
        borderRadius: 10,
        paddingHorizontal: (width/18),
        backgroundColor: 'linear-gradient(180deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%)',
        alignSelf: 'center'
    },
    loginBackContent: {
        gap: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});