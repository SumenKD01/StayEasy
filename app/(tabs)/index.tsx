import { Text, View, StyleSheet } from 'react-native';
import Login from "../../src/screens/Home/RaiseComplaint/RaiseComplaint.js"
import * as DocumentPicker from 'expo-document-picker';

export default function Index() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    fontSize: 20,
    color: '#fff',
  },
});
