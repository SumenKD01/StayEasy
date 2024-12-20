import { View, Image, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';


// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// const SIZE = 80;


export default function EmojiSticker({ stickerSource }) {
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const scale = useSharedValue(0.5);
    const savedScale = useSharedValue(0.5);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const context = useSharedValue({ x: 0, y: 0 });

    const panGesture = Gesture.Pan()
        .onStart(() => {
            context.value = { x: translateX.value, y: translateY.value }
        })
        .onUpdate((event) => {
            translateX.value = event.translationX + context.value.x;
            translateY.value = event.translationY + context.value.y;
        });

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

    const animatedStyle1 = useAnimatedStyle(() => ({
        position: 'absolute',
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }));


    const animatedStyle2 = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));


    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={animatedStyle1}>
                <GestureDetector gesture={pinchGesture}>
                    <AnimatedImage
                        source={stickerSource}
                        resizeMode="contain"
                        style={[animatedStyle2]}
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}
