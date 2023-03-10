import React from "react";
import Home from "./components/Home";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import style from "./style/style";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
<NavigationContainer>
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarStyle: { display: "none" },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Gameboard"
      component={Gameboard}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="gamepad-variant" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Scoreboard"
      component={Scoreboard}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="trophy" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
</NavigationContainer>
  );
}

