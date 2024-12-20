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
            <View>
                <View style={styles.loginBackContent}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.companyName}>
                            Stay
                            <Text style={{ color: '#C6241F' }}>EASY</Text>
                        </Text>
                        {/* <Text style={{ fontFamily: 'Poppins_SemiBoldItalic', fontSize: (width / 38), left: (width / 4), bottom: (width / 20), color: 'gray' }}>AI powered by MES</Text> */}
                        <Image
                            source={require('../../../src/assets/images/Rectangle1.png')}
                            style={{ width: 13, height: 43, position: 'absolute', left: -20, bottom: 20 }}
                        />
                        <Image
                            source={require('../../../src/assets/images/Rectangle1.png')}
                            style={{ width: 13, height: 43, position: 'absolute', right: -20, top: 110 }}
                        />
                        <Image
                            source={require('../../../src/assets/images/loginimage.png')}
                            style={{ width: 258, height: 264, }}
                        />
                    </View>
                </View>
                <LoginForm />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    companyName: {
        fontSize: 36,
        padding: (width / 150),
        color: '#344454',
        fontFamily: 'Poppins',
        marginBottom: 20
    },
    loginBackContent: {
        gap: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});