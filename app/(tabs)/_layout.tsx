import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ffd33d',
                headerStyle: {
                    backgroundColor: '#25292e',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#25292e',
                },
                headerShown: false
            }}>
            <Tabs.Screen name="index" options={{
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                )
            }} />
            <Tabs.Screen name="notification" options={{
                title: 'Notifications',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'notifications-sharp' : 'notifications-outline'} color={color} size={24} />
                )
            }} />
            <Tabs.Screen name="profile" options={{
                title: 'Profile',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={color} size={24} />
                )
            }} />
            <Tabs.Screen name="sidemenu" options={{
                title: 'Menu',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'menu-sharp' : 'menu-outline'} color={color} size={24} />
                )
            }} />
        </Tabs>
    );
}
