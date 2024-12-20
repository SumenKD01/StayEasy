import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useEffect, useRef, useState } from 'react';

import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from 'react-native-view-shot';
import CameraPreview from './CameraPreview';
import Canvas from './Canvas';
import * as Device from 'expo-device';
import { CustomButton } from './CustomButton';
import * as Notifications from 'expo-notifications';
// import NewCanvas from './NewCanvas';
import { Modal } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export function CameraComp({ cameraCloserFunc }) {
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [isDoodleVisible, setIsDoodleVisible] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [cameraView, setCameraView] = useState(0);
    const imageRef = useRef();
    let cameraRef = null;

    // const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [color, setColor] = useState('royalblue');

    const showAlert = () => {
        setAlertVisible(true);
    };

    const closeAlert = () => {
        setAlertVisible(false);
    };

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
                        <ActivityIndicator size="large" color={color} />
                        <Text style={{ marginTop: 20 }}>{message}</Text>
                    </View>
                </View>
            </Modal>
        );
    };

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    if (status === null) {
        requestPermission();
    }


    const onDoodleModal = () => {
        setIsDoodleVisible(true);
    }

    const onDoodleModalClose = () => {
        setIsDoodleVisible(false);
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

    const cameraToggle = () => {
        setCameraView(cameraView === 0 ? 1 : 0);
    }

    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(imageRef, {
                height: 440,
                quality: 1,
            });

            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                alert("Saved!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
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
                </>
                :
                <>
                
                    <Camera
                        style={{ flex: 1, width: "130%" }}
                        ref={(ref) => (cameraRef = ref)}
                        type={
                            cameraView === 0 ? CameraType.front : CameraType.back
                        }
                    ></Camera>
                    <View style={styles.cameraOptions}>
                        <CustomButton imageRecieved={require('../../assets/icons/front-camera.png')} textRecieved={'Change Camera'} functionRecieved={cameraToggle} />
                        <CustomButton imageRecieved={require('../../assets/icons/capture.png')} textRecieved={'Capture'} functionRecieved={__takePicture} />
                        {/* <CustomButton textRecieved={'Push Notification'} functionRecieved={async () => {
                            await schedulePushNotification();
                        }} /> */}
                        <CustomAlert
                            visible={isAlertVisible}
                            message="Loading image...."
                            onClose={closeAlert}
                        />
                    </View>
                </>
            }
        </>
    )
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

Notifications.scheduleNotificationAsync({
    content: {
        title: 'Notification when Changes are done',
        body: "There is nothing to be proud of that."
    },
    trigger: null,
});

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Image saved successfully into your gallery",
            body: "Near Miss Image sent to the repository",
        },
        trigger: null,
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 700
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
    },
});