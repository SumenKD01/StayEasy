import { Stack } from "expo-router";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/redux/store';


export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="index" options={{ title: 'Login' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
