import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#EC4899',
        tabBarInactiveTintColor: '#8B8B8B',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="home" size={focused ? 30 : 20} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="novo"
        options={{
          headerShown: false,
          title: 'Cadastrar novo',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="pluscircleo" size={focused ? 30 : 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gestante"
        options={{
          headerShown: false,
          title: 'gestante',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user" size={focused ? 30 : 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user" size={focused ? 30 : 20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
