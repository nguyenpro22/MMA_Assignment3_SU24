import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home-outline" : "home"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="FavoriteScreen"
        options={{
          title: "Favorite",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "heart-outline" : "heart"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
