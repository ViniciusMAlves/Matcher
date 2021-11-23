import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import openDB from "../db";
const db = openDB();

export default function CadastroProd({ navigation }) {
    const [produtos, setPRODUTOS] = useState([]);
    const [loading, setLoading] = useState(true);

    function saveProduto(produtos) {
        db.transaction(tx => {
        tx.executeSql("INSERT INTO PRODUTOS (ID_PESSOA, NOME, QUANT, PRECO_ANT, PRECO_ATU, OBS, IMG_PROD) VALUES(?, ?)", [produtos.id_pessoa, produtos.nome, produtos.quant, produtos.preco_ant, produtos.preco_atu, produtos.obs, produtos.img_prod], (_, rs) => {
            console.log(`Novo usuario salvo: ${rs.insertId}`);
            recuperaProduto();
        });
        });
    }

    function removeProduto(id) {
        db.transaction(tx => {
        tx.executeSql("DELETE FROM PRODUTOS WHERE ID_PRODUT = ?", [id], (_, rs) => {
            recuperaProduto();
        });
        });
    }

    function recuperaProduto(id) {
        db.transaction(tx => {
        tx.executeSql("SELECT * FROM PRODUTOS WHERE ID_PRODUT = ?", [id], (_, rs) => {
            setProduto(rs.rows._array);
            setLoading(false);
        });
        });
    }


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
  