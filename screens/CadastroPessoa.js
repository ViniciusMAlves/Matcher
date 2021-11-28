import React, {useState, useEffect} from "react";
import { StyleSheet, View,Image} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {Button} from "react-native-elements";
import {TextInput} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';

import openDB from "../db";

const db = openDB();

const EMPTY_PESSOA = {
  USER: "",
  EMAIL: "",
  PASSWORD: "",
  IMG_PESSOA: "",
};

function FormCadastro({onSaveCadastro}){
  const [pessoa, setPessoa] = useState({ ...EMPTY_PESSOA }); 
  const [image2, setImage2] = useState(null);
  
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage2(result.uri);
      }
    };
  
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
                onChangeText={user => setPessoa({ ...pessoa, user})}
            /></LinearGradient>
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
                keyboardType="email-address"
                underlineColor="#fff"
                style={styles.formInput}
                label="email"
                onChangeText={email => setPessoa({ ...pessoa, email})}
                keyboardType="email-address"
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
                label="comfirm password"                
                onChangeText={password => setPessoa({ ...pessoa, password})}
            /></LinearGradient>
            <View style={styles.containerImage}>
                {image2 && <Image source={{ uri: image2 }} style={{ width: 70, height: 70 }} />}
            </View>
            <LinearGradient 
            colors={['#FFF', "rgba(62, 170, 204, 1)"]}
            start={{x: 0.0, y: 0.80}} end={{x: 0.0, y: 1.0}}
            style={styles.gradientInput}
            >
            <Button
                onPress={pickImage}
                title="selecione a foto"
                style={styles.formTextImage}
                titleStyle={{ color: 'rgba(62, 170, 204, 1)', fontSize:19 }} 
                buttonStyle={styles.formButtonImage}
            /></LinearGradient>
            <View style={styles.containerButton}>
                <Button title="sign up" titleStyle={{ color: 'white', fontSize:19 }}   onPress={() => {onSaveCadastro(pessoa)}} buttonStyle={styles.buttonLogin}/>
            </View>
      </View>
    </View>
    );
}

export default function CadastroPessoa({ navigation}) {
    const [loading, setLoading] = useState(true);

    function savePessoa(pessoa) {
      db.transaction(tx => { 
        tx.executeSql("INSERT INTO PESSOAS (USER, EMAIL, PASSWORD, IMG_PESSOA) VALUES(?, ?, ?, ?)", [pessoa.user, pessoa.email, pessoa.password, pessoa.img_pessoa], (_, rs) => {
          console.log(`Novo usuario salvo: ${rs.insertId}`);
          recuperaPessoa();
        });
      });
    }
  
    function removePessoa(id) {
      db.transaction(tx => {
        tx.executeSql("DELETE FROM PESSOAS WHERE ID_PESSOA = ?", [id], (_, rs) => {
          recuperaPessoa();
        });
      });
    }
  
    function recuperaPessoa() {
      db.transaction(tx => {
        tx.executeSql("SELECT * FROM PESSOAS ORDER BY NOME ASC", [], (_, rs) => {
          setPessoa(rs.rows._array);
          setLoading(false);
        });
      });
    }

    function buscaPessoa(id) {
      db.transaction(tx => {
        tx.executeSql("SELECT * FROM PESSOAS WHERE ID_PESSOA = ?", [id], (_, rs) => {
          setPessoa(rs.rows._array);
          setLoading(false);
        });
      });
    }
  
  
    useEffect(() => {
      recuperaPessoa();
    }, []);
  
    
  
  
    return (
    <View style={styles.principal}>  
      <FormCadastro onSaveCadastro={savePessoa} />        
    </View>
    );    
}
  
  const styles = StyleSheet.create({

    secundaria: {
      height: 310,
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
        marginTop:-50,
        zIndex:2
    },
    form: {
        backgroundColor: "#fff",
        borderRadius:20,
        marginBottom:40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: -240,
        zIndex:100,
        height: 510,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems:"center",
        shadowColor: '#000000',
        elevation: 5
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
        borderBottomRightRadius: 5, 
        borderBottomLeftRadius: 5, 
        width: 266,
        paddingLeft:0.5,
        marginBottom: 5,
        
    },

    containerButton:{
        justifyContent: "center",
        flexDirection: "row",
        width: 260,
    },
    
    buttonLogin: {
        backgroundColor: "rgba(62, 170, 204, 1)",
        marginTop: 30,
        width:220,
        height:45,
        borderRadius:25,
        color: "#000",
        shadowColor: "#000"
    },
    formButtonImage: {
        backgroundColor: "#fff",
        width: 264.5,
        marginLeft:0.25,
        height: 58,
        fontSize:19,
        zIndex:40,
        
    },
    containerImage:{
        justifyContent: "center",
        flexDirection: "row",
        width: 260,
        marginTop: 20,
    },
    
  });
