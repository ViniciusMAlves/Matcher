import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/Login";
import CadastroPessoaScreen from "./screens/CadastroPessoa";
import CadastroProdScreen from "./screens/CadastroProd";
import CatalogoScreen from "./screens/Catalogo";
import CriaCatalogoScreen from "./screens/CriaCatalogo";
import ListaProdScreen from "./screens/ListaProd";
import ProdutoScreen from "./screens/Produto";
import UsuarioScreen from "./screens/Usuario";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer styles={{display: "none"}}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, title: "Login" }} />
        <Stack.Screen name="CadastroPessoa" component={CadastroPessoaScreen} options={{title: "Sing in" }} />
        <Stack.Screen name="CadastroProd" component={CadastroProdScreen} options={{ title: "Cadastro Prod." }} />
        <Stack.Screen name="Usuario" component={UsuarioScreen} options={{ title: "Usuário" }} />
        <Stack.Screen name="Produto" component={ProdutoScreen} options={{ title: "Produto" }} />
        <Stack.Screen name="ListaProduto" component={ListaProdScreen} options={{ title: "Lista de Produtos" }} />
        <Stack.Screen name="CriarCatalogo" component={CriaCatalogoScreen} options={{ title: "Criar Catálogo" }} />
      </Stack.Navigator>
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
