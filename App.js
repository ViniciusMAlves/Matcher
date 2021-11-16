import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import LoginScreen from "./screens/Login";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function ThemedApp() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}