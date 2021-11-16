import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function Home({ navigation }) {
    return (
      <View style={styles.container}>
        <TextInput
            mode="outlined"
            autoCapitalize="none"
            label="E-mail"
            textAlign="center"
            activeOutlineColor="orange"
            style={styles.input}
        />

        <TextInput
            mode="outlined"
            label="Senha"
            autoCapitalize="none"
            secureTextEntry
            activeOutlineColor="orange"
            style={styles.input}
        />
        <Button
          style={styles.result}
          icon="arrow-right"
          mode="contained"
        >
          Logar
        </Button>
        <Button
          style={styles.result}
          icon="arrow-right"
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
  
    },
    input: {
      height: 50,
      fontSize: 20,
      margin: 5
    },
    button: {
      marginTop: 10,
      width: "75%",
      height: 40,
      alignSelf: "center",
      justifyContent: "center",
    },
    result: {
      marginTop: 10,
      alignItems: "center",
    }
  });
  