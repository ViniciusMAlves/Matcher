import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import CadastroPessoa from './CadastroPessoa';

import openDB from "../db";

const db = openDB();

export default function Login({ navigation }) {
    return (
      <View style={styles.container}>
        <TextInput
            mode="outlined"
            autoCapitalize="none"
            label="User"
            textAlign="center"
            activeOutlineColor="#00BFFF"
            style={styles.input}
        />

        <TextInput
            mode="outlined"
            label="Passwoerd"
            autoCapitalize="none"
            secureTextEntry
            activeOutlineColor="#00BFFF"
            style={styles.input}
        />
        <View style={styles.botoes}>
        <Button
          style={styles.but}
          mode="contained"
        >Login</Button>
        <Button
          style={styles.but}
          mode="contained"
          onPress={() => navigation.navigate("CadastroPessoa")}
        >Sing in</Button>
        </View>
        
        <Button
          style={styles.button}
          mode="text"
        >
          Esqueci a senha
        </Button>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      padding: 10
    },
    input: {
      height: 50,
      fontSize: 20,
      margin: 5
    },
    botoes:{
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    button: {
      alignSelf: "center",
      justifyContent: "center",
      color: "#00BFFF"
    },
    but:{
      backgroundColor: "#00BFFF",
      borderRadius: 50
    }
  });
  