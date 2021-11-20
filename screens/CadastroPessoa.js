import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function CadastroPessoa({ navigation }) {
    return(
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
                autoCapitalize="none"
                label="E-mail"
                textAlign="center"
                keyboardType="email-address"
                activeOutlineColor="#00BFFF"
                style={styles.input}
            />

            <TextInput
                mode="outlined"
                autoCapitalize="none"
                label="Password"
                secureTextEntry
                textAlign="center"
                activeOutlineColor="#00BFFF"
                style={styles.input}
            />

            <TextInput
                mode="outlined"
                autoCapitalize="none"
                label="Confirm Password"
                secureTextEntry
                textAlign="center"
                activeOutlineColor="#00BFFF"
                style={styles.input}
            />

            <View style={styles.botoes}>
                <Button
                style={styles.but}
                mode="contained"
                >Sing in</Button>
            </View>
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
    but:{
        backgroundColor: "#00BFFF",
        borderRadius: 50
    },
    botoes:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
  });
  