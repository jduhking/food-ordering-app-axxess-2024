import React from 'react';
import { Tabs } from 'expo-router';
import { HomeIcon } from '@/icons/home';


export default function TabLayout() {

  return (
    <Tabs screenOptions={{ headerShown: false}}>
      <Tabs.Screen
            name="home/index"
            options={{
                title: 'Home',
                href: '/home',
                tabBarIcon: () => <HomeIcon size={32}/>,
                tabBarShowLabel: false
            }}
            />
    </Tabs>
  );
}
