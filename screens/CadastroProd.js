import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default function CadastroProd({ navigation }) {
    return(
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                autoCapitalize="none"
                label="Nome"
                textAlign="center"
                activeOutlineColor="#00BFFF"
                style={styles.input}
            />

            <TextInput
                mode="outlined"
                autoCapitalize="none"
                label="Quantidade"
                textAlign="center"
                keyboardType="numeric"
                activeOutlineColor="#00BFFF"
                style={styles.input}
            />

            <View style={styles.IptPreco}>
                <TextInput
                    mode="outlined"
                    autoCapitalize="none"
                    label="Preço ant."
                    textAlign="center"
                    keyboardType="decimal-pad"
                    activeOutlineColor="#00BFFF"
                    style={styles.preco}
                />

                <TextInput
                    mode="outlined"
                    autoCapitalize="none"
                    label="Preço atu."
                    textAlign="center"
                    keyboardType="decimal-pad"
                    activeOutlineColor="#00BFFF"
                    style={styles.preco}
                />
            </View>

            <TextInput
                mode="outlined"
                autoCapitalize="none"
                label="Inf. Adicionais"
                textAlign="center"
                multiline
                numberOfLines={4}
                activeOutlineColor="#00BFFF"
                style={styles.text}
            />

            <View style={styles.botoes}>
                <Button
                style={styles.but}
                mode="contained"
                >Cadastro</Button>
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
    text: {
        fontSize: 20,
        margin: 5
    },
    preco:{
        height: 50,
        fontSize: 20,
        margin: 5,
        width: 150
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
    IptPreco:{
        flexDirection: 'row',
        justifyContent: 'space-between', 
    }
  });
  