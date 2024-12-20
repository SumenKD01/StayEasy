import { StyleSheet, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';


export default function TextInsert({ textSource, colorSource, sizeSource }) {
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

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

    const textStyling = {
        color: colorSource,
        fontSize: Number(sizeSource)
    }

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={animatedStyle1}>
                <GestureDetector gesture={pinchGesture}>
                    <Animated.View style={[styles.box, animatedStyle2]} >
                        <Text style={textStyling}>{textSource}</Text>
                    </Animated.View>
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    box: {
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    }
});
