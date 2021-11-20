import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import LoginScreen from "./screens/Login";
import CadastroPessoaScreen from "./screens/CadastroPessoa";
import CadastroProdScreen from "./screens/CadastroProd";
import CatalogoScreen from "./screens/Catalogo";
import CriaCatalogoScreen from "./screens/CriaCatalogo";
import ListaProdScreen from "./screens/ListaProd";
import ProdutoScreen from "./screens/Produto";
import UsuarioScreen from "./screens/Usuario";


const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen} options={{  headerShown: false, title: "Login" }} />
      <Tab.Screen name="CadastroPessoa" component={CadastroPessoaScreen} options={{ title: "Sing in" }} />
      <Tab.Screen name="CadastroProd" component={CadastroProdScreen} options={{ title: "Cadastro Prod." }} />
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