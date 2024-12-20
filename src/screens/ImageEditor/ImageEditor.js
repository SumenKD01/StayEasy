import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { CustomButton } from './CustomButton';
import { Camera } from 'expo-camera';
import Canvas from './Canvas';
import { StatusBar } from 'expo-status-bar';
import CameraCompNew from './CameraCompNew';

export default function ImageEditor() {
  const [startCamera, setStartCamera] = useState(false);
  const [imageGot, setImageGot] = useState(null);
  const [isDoodleVisible, setIsDoodleVisible] = useState(false);
  const [loaded] = useFonts({
    'Young-Serif': require('../../assets/fonts/YoungSerif-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  function cameraCloser() {
    setStartCamera(false);
  }

  const onDoodleModalClose = () => {
    setIsDoodleVisible(false);
  }

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  }

  const __pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (result.uri) {
      setImageGot(result.uri);
      setIsDoodleVisible(true);
    }
    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <LinearGradient colors={['#132043', '#1F4172', '#F1B4BB', '#FDF0F0']} style={styles.container}>
      {!startCamera &&
        <>
          <Text style={[styles.heading, { fontFamily: 'Young-Serif' }]}>Welcome to Image Editor!</Text>
          <View style={{ gap: 10 }}>
            <CustomButton textRecieved={'Choose Picture'} imageRecieved={require('../../assets/icons/folder.png')} functionRecieved={__pickImageAsync} />
            <CustomButton textRecieved={'Open Camera'} imageRecieved={require('../../assets/icons/photo-camera-interface-symbol-for-button.png')} functionRecieved={__startCamera} />
          </View>
        </>
      }
      {startCamera &&
        <CameraCompNew styleButton={styles.clickButton} cameraCloserFunc={cameraCloser} />
      }
      <Canvas isVisible={isDoodleVisible} onClose={onDoodleModalClose} styleButton={styles.clickButton} bgPass={imageGot} styleButtonIcon={styles.buttonIcon} />
      <StatusBar style='light' />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 60,
    justifyContent: 'space-around'
  },
  heading: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white'
  },
  clickButton: {
    minWidth: 50,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#14274e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    padding: 10
  }
});
