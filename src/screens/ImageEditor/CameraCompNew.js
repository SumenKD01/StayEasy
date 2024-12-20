import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Modal } from 'react-native';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from './CustomButton';
import CameraPreview from './CameraPreview';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import Canvas from './Canvas';

export default function CameraCompNew({cameraCloserFunc}) {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [isDoodleVisible, setIsDoodleVisible] = useState(false);
    const imageRef = useRef();
    let cameraRef = null;

    const showAlert = () => {
        setAlertVisible(true);
    };

    const closeAlert = () => {
        setAlertVisible(false);
    };

    if (!permission) {
        // Camera permissions are still loading.
        return (
            <View>
                <Text>Loading....</Text>
            </View>
        );
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const __retakePicture = () => {
        setAlertVisible(false);
        setCapturedImage(null);
        setPreviewVisible(false);
    }

    const __takePicture = async () => {
        if (cameraRef) {
            showAlert();
            const photo = await cameraRef.takePictureAsync();
            setPreviewVisible(true);
            setCapturedImage(photo.uri);
        }
    }

    const CustomAlert = ({ visible, message, onClose }) => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color={'red'} />
                        <Text style={{ marginTop: 20 }}>{message}</Text>
                    </View>
                </View>
            </Modal>
        );
    };

    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(imageRef, {
                height: 440,
                quality: 1,
            });

            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                alert("Saved!");
                await schedulePushNotification();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onDoodleModal = () => {
        setIsDoodleVisible(true);
    }

    const onDoodleModalClose = () => {
        setIsDoodleVisible(false);
    }

    return (
        <View style={styles.container}>
            {previewVisible ?
                <>
                    {!capturedImage &&
                        <>
                            <Text>Loading....</Text>
                        </>
                    }
                    {capturedImage &&
                        <>
                            <GestureHandlerRootView style={styles.container} >
                                <View ref={imageRef} collapsable={false} style={styles.container}>
                                    <CameraPreview photo={capturedImage} />
                                </View>
                            </GestureHandlerRootView>
                            <View style={styles.takenPictureOptions}>
                                <CustomButton textRecieved={'Retake'} imageRecieved={require('../../assets/icons/reload.png')} functionRecieved={__retakePicture} />
                                <CustomButton textRecieved={'Save'} imageRecieved={require('../../assets/icons/download-file.png')} functionRecieved={onSaveImageAsync} />
                                <CustomButton textRecieved={'Edit'} imageRecieved={require('../../assets/icons/edit-image.png')} functionRecieved={onDoodleModal} />
                                <CustomButton textRecieved={'Close'} imageRecieved={require('../../assets/icons/close.png')} functionRecieved={cameraCloserFunc} />
                            </View>
                            <Canvas isVisible={isDoodleVisible} onClose={onDoodleModalClose} bgPass={capturedImage} />
                        </>
                    }
                </> :
                <>
                    <CameraView style={styles.camera} facing={facing} ref={(ref) => (cameraRef = ref)}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                                <Text style={styles.text}>Flip Camera</Text>
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                    <View style={styles.cameraOptions}>
                        <CustomButton imageRecieved={require('../../assets/icons/front-camera.png')} textRecieved={'Change Camera'} functionRecieved={toggleCameraFacing} />
                        <CustomButton imageRecieved={require('../../assets/icons/capture.png')} textRecieved={'Capture'} functionRecieved={__takePicture} />
                        <CustomAlert
                            visible={isAlertVisible}
                            message="Loading image...."
                            onClose={closeAlert}
                        />
                    </View>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: Dimensions.get('screen').width
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        bottom: 60
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
    buttonIcon: {
        width: 20,
        height: 20
    },
    closeButton: {
        width: 40,
        height: 40,
        backgroundColor: '#132043',
        position: 'absolute',
        right: 10,
        top: 20,
        padding: 10
    },
    cameraOptions: {
        flexDirection: 'row',
        gap: 20,
        marginVertical: 10,
        position: 'absolute',
        bottom: -10,
        padding: 10,
        width: '100%',
        justifyContent: 'center'
    },
    takenPictureOptions: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 10,
        position: 'absolute',
        bottom: -10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 20,
        backgroundColor: 'white',
        elevation: 5,
    }
});
