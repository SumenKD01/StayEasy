import { Text, View, StyleSheet } from 'react-native';
import Login from "../../src/screens/RaiseComplaint/RaiseComplaint.js"
import CheckStatus from "../../src/screens/Home/CheckStatus.js"

export default function Index() {
  return (
    <View style={styles.container}>
      {/* <Login /> */}
      <CheckStatus />
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
