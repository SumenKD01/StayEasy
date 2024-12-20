import { View, ImageBackground} from "react-native";


export default function CameraPreview({photo}){
    return (
        <View
            style={{
                backgroundColor: 'transparent',
                flex: 1,
                width: '100%',
                height: '100%'
            }}
        >
            <ImageBackground
                source={{ uri: photo }}
                style={{
                    flex: 1,
                    transform: [{ scaleX: -1 }]
                }}
            />
        </View>
    )
};