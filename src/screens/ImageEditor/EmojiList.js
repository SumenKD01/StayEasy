import { useState } from 'react';
import { Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native';


export default function EmojiList({ onSelect, onCloseModal }) {
    const [emoji] = useState([
        require('../../assets/emojis/circle.png'),
        require('../../assets/emojis/close.png'),
        require('../../assets/emojis/right-arrow.png'),
        require('../../assets/emojis/left-arrow.png'),
        require('../../assets/emojis/down-arrow.png'),
        require('../../assets/emojis/up-arrow.png')
    ]);

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            onSelect(item);
                            onCloseModal();
                        }}>
                        <Image source={item} key={index} style={styles.image} />
                    </TouchableOpacity>
                );
            }}
        />
    );
}

const styles = {
    image: {
        width: 100,
        height: 100,
        margin: 20,
    },
}
