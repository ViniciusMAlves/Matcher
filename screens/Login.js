import React from "react";
import { StyleSheet, View,Image} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {Button} from "react-native-elements";
import {TextInput} from "react-native-paper";

import openDB from "../db";

const db = openDB();

export default function Login({ navigation}) {
    const [pessoa, setPessoa] = useState({ ...EMPTY_PESSOA }); 

    function verificaLogin(user, pass) {
        db.transaction(tx => {
          tx.executeSql("SELECT FIRST 1 1 FROM PESSOAS WHERE USER = ? PASSWORD = ?", [user, pass], (_, rs) => {
            setPessoa(rs.rows._array);
          });
        });
      }
  
    return (
    <View style={styles.principal}>
      <View style={styles.secundaria}>
        <Image 
            style={styles.stretch}
            source={require('../img/logo.png')}
        />
      </View>
      <View style={styles.form}>
            <LinearGradient 
                    colors={['#FFF', "rgba(62, 170, 204, 1)"]}
                    start={{x: 0.0, y: 0.80}} end={{x: 0.0, y: 1.0}}
                    style={styles.gradientInput}
            >
            <TextInput
                mode="outlined"
                autoCapitalize="none"
                activeOutlineColor="rgba(62, 170, 204, 1)"
                theme={{ colors: { placeholder: "#ccc"} }}
                outlineColor="#FFF"
                underlineColor="#fff"
                style={styles.formInput}
                label="user"
            /></LinearGradient>
            <LinearGradient 
                colors={['#FFF', "rgba(62, 170, 204, 1)"]}
                start={{x: 0.0, y: 0.80}} end={{x: 0.0, y: 1.0}}
                style={styles.gradientInput}
            >
            <TextInput
                mode="outlined"
                activeOutlineColor="rgba(62, 170, 204, 1)"
                autoCapitalize="none"
                outlineColor="#FFF"
                theme={{ colors: { placeholder: "#ccc"} }}
                underlineColor="#fff"
                secureTextEntry
                style={styles.formInput}
                label="password"
            /></LinearGradient>
            <View style={styles.containerButton}>
                <Button title="login" titleStyle={{ color: 'white', fontSize:19 }}  onPress={() => navigation.navigate("CadastroProd")} buttonStyle={styles.buttonLogin}/>
                <Button title="sign up" titleStyle={{ color: 'white', fontSize:19 }}   onPress={() => navigation.navigate("CadastroPessoa")} buttonStyle={styles.buttonLogin}/>
            </View>
      </View>
    </View>
    );
    
    }
  
  const styles = StyleSheet.create({

    secundaria: {
      height: 200,
      alignItems: 'center',
      justifyContent:"center",
      backgroundColor: "rgba(62, 170, 204, 1)",
      padding: 14,
    },

    principal: {
        height: 500,
        flex: 1,
        backgroundColor: "#FFF",
        paddingBottom: 450,
    },
    stretch: {
        display: "flex",
        justifyContent: "center",
        marginTop:150,
        zIndex:2
    },
    form: {
        marginBottom:40,
        marginTop: 100,
        zIndex:100,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems:"center"
    },
    formInput: {
        backgroundColor: "#fff",
        width: 265,
        height: 50,
        fontSize:19,
        marginBottom: 1.5,
        zIndex:40,
    },
    gradientInput: {
        height: 59,
        borderBottomRightRadius: 4, 
        borderBottomLeftRadius: 4, 
        width: 266,
        paddingLeft:0.5,
        marginBottom: 30,
    },

    containerButton:{
        justifyContent: "space-between",
        flexDirection: "row",
        width: 260,
    },
    
    buttonLogin: {
        backgroundColor: "rgba(62, 170, 204, 1)",
        marginTop: 30,
        width:110,
        height:45,
        borderRadius:25,
        color: "#000",
        shadowColor: "#000"
    },
  
  });
