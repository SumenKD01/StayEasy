import { useFonts } from 'expo-font';
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

export const CustomButton = ({ imageRecieved, functionRecieved, textRecieved }) => {

    const [loaded] = useFonts({
        'Young-Serif': require('../../assets/fonts/YoungSerif-Regular.ttf'),
      });
    
      if (!loaded) {
        return null;
      }

    return (
        <TouchableOpacity style={styles.clickButton} onPress={functionRecieved}>
            {imageRecieved &&
                <Image source={imageRecieved} style={styles.buttonIcon} />
            }
            {textRecieved &&
                <Text style={{color:'white', fontFamily: 'Young-Serif'}}>{textRecieved}</Text>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonIcon: {
        width: 20,
        height: 20
    },
    clickButton: {
        minWidth: 30,
        paddingHorizontal: 10,
        borderRadius: 4,
        backgroundColor: '#14274e',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        gap: 5
    }
});