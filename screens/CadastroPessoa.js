import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import openDB from "../db";
const db = openDB();

export default function CadastroPessoa({ navigation }) {
    const [pessoa, setPESSOAS] = useState([]);
    const [loading, setLoading] = useState(true);

    function saveUsuario(pessoa) {
        db.transaction(tx => {
        tx.executeSql("INSERT INTO PESSOAS (USER, EMAIL, PASSWORD, IMG_PESSOA) VALUES(?, ?)", [pessoa.user, pessoa.email, pessoa.password, pessoa.img_pessoa], (_, rs) => {
            console.log(`Novo usuario salvo: ${rs.insertId}`);
            recuperaUsuarios();
        });
        });
    }

    function removeUsuario(id) {
        db.transaction(tx => {
        tx.executeSql("DELETE FROM PESSOAS WHERE ID_PESSOA = ?", [id], (_, rs) => {
            recuperaUsuarios();
        });
        });
    }

    function recuperaUsuarios(id) {
        db.transaction(tx => {
        tx.executeSql("SELECT * FROM PESSOAS WHERE ID_PESSOA = ?", [id], (_, rs) => {
            setPESSOAS(rs.rows._array);
            setLoading(false);
        });
        });
    }

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
  