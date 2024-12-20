import React, { useRef, useState } from 'react';
import { Image, Modal, StyleSheet, SafeAreaView, View } from 'react-native';
import { SketchCanvas } from 'rn-perfect-sketch-canvas';
import { captureRef } from 'react-native-view-shot';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { ColorPicker } from './ColorPicker';
import { CustomButton } from './CustomButton';
import EmojiPicker from './EmojiPicker';
import EmojiList from './EmojiList';
import EmojiSticker from './EmojiSticker';
import TextInsert from './TextInsert';
import EnterTextForm from './EnterTextForm';

export default function Canvas({ isVisible, onClose, bgPass }) {
    const [status, requestPermission] = MediaLibrary.usePermissions();
    
    const [planeCanvas, setPlaneCanvas] = useState(3);
    const [planeStick, setPlaneStick] = useState(2);
    
    const canvasRef = useRef(null);
    const editImageRef = useRef();
    
    const [colorPickerView, setColorPickerView] = useState(false);
    const [color, setColor] = useState('black');
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [emojis, setEmojis] = useState([]);
    const [emojiCount, setEmojiCount] = useState(0);
    
    const [editTextView, setEditTextView] = useState(false);
    const [textsGiven, setTextsGiven] = useState([]);
    const [textsCount, setTextsCount] = useState(0);

    const addEmoji = (imageURL) => {
        setEmojis([...emojis, { emoji: imageURL, id: emojiCount }]);
        setEmojiCount(emojiCount + 1);
        setPlaneStick(3);
        setPlaneCanvas(2);
    };

    const reverseThePlanes = () => {
        setPlaneStick(2);
        setPlaneCanvas(3);
    }

    if (status === null) {
        requestPermission();
    }

    const onAddSticker = () => {
        setIsModalVisible(true);
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    function colorPickerToggle() {
        colorPickerView ? setColorPickerView(false) : setColorPickerView(true);
    }

    function colorChanger(colorPassed) {
        setColor(colorPassed);
        setColorPickerView(false);
        setPlaneStick(2);
        setPlaneCanvas(3);
    }


    function textEditorViewer() {
        setEditTextView((editTextView === true) ? false : true);
    }

    function insertText(valueCame) {
        setTextsGiven([...textsGiven, { text: valueCame.text, id: textsCount, color: valueCame.color, size: valueCame.size }]);
        setTextsCount(textsCount + 1);
        setPlaneStick(3);
        setPlaneCanvas(2);
    }

    function resetFunc() {
        canvasRef.current?.reset();
        setPlaneStick(2);
        setPlaneCanvas(3);
        setEmojiCount(0);
        setEmojis([]);
        setTextsGiven([]);
        setTextsCount(0);
        setColor('black');
        setColorPickerView(false);
    }

    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(editImageRef, {
                height: 400,
                quality: 1,
            });

            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                alert("Saved!");
            }
            resetFunc();
        } catch (e) {
            console.log(e);
        }
    };

    function closeTheModal() {
        resetFunc();
        onClose();
    }

    return (
        <Modal style={{ flex: 1 }} animationType="slide" transparent={false} visible={isVisible}>
            <SafeAreaView style={styles.container} ref={editImageRef} collapsable={false}>
                <GestureHandlerRootView style={styles.container}>
                    <Image source={{ uri: bgPass }} style={[styles.image, { transform: [{ scaleX: -1 }] }]} />
                    <View style={[styles.image, { zIndex: planeStick }]}>
                        {emojis.map((emojiData) => (
                            <EmojiSticker
                                key={emojiData.id}
                                stickerSource={emojiData.emoji}
                                imageSize={20}
                            />
                        ))}
                        {textsGiven.map((textData) => (
                            <TextInsert
                                key={textData.id}
                                textSource={textData.text}
                                colorSource={textData.color}
                                sizeSource={textData.size}
                                textSize={10}
                            />
                        ))}
                    </View>
                    <View style={[styles.image, { zIndex: planeCanvas }]}>
                        <SketchCanvas
                            ref={canvasRef}
                            strokeColor={color}
                            strokeWidth={8}
                            containerStyle={styles.container}
                        />
                    </View>
                </GestureHandlerRootView>
            </SafeAreaView>
            {planeCanvas === 3 &&
                <View style={styles.lastContainer}>
                    <CustomButton textRecieved={'Reset'} imageRecieved={require('../../assets/icons/reload.png')} functionRecieved={resetFunc} />
                    <CustomButton textRecieved={'Save'} imageRecieved={require('../../assets/icons/download-file.png')} functionRecieved={onSaveImageAsync} />
                    <CustomButton textRecieved={planeCanvas===3?'Choose Color':'Doodle'} imageRecieved={require('../../assets/icons/marker.png')} functionRecieved={colorPickerToggle} />
                    <CustomButton textRecieved={'Add Text'} imageRecieved={require('../../assets/icons/marker.png')} functionRecieved={textEditorViewer} />
                    <CustomButton textRecieved={'Mark'} imageRecieved={require('../../assets/icons/smile-plus.png')} functionRecieved={onAddSticker} />
                    <CustomButton textRecieved={'Close'} imageRecieved={require('../../assets/icons/close.png')} functionRecieved={closeTheModal} />
                </View>
            }
            {planeCanvas === 2 &&
                <CustomButton textRecieved={'Fix'} functionRecieved={reverseThePlanes} />
            }
            {colorPickerView &&
                <ColorPicker colorChanger={colorChanger} />
            }
            {editTextView &&
                <EnterTextForm closeEditorView={textEditorViewer} textSetFunc={insertText} />
            }
            <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                <EmojiList onSelect={addEmoji} onCloseModal={onModalClose} />
            </EmojiPicker>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 360,
        height: 720,
        flex: 1,
        position: 'absolute'
    },
    buttonIcon: {
        width: 20,
        height: 20
    },
    closeButton: {
        width: 40,
        height: 40,
        backgroundColor: '#14274e',
        position: 'absolute',
        right: 0,
        padding: 10
    },
    lastContainer: {
        position: 'absolute',
        bottom: 0,
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 10
    }
});