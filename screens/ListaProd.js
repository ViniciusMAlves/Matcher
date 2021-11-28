import React, {useState, useEffect} from "react";
import { StyleSheet, View,Image, ScrollView} from "react-native";
import {Button} from "react-native-elements";
import { Provider as PaperProvider, Text, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { Appbar } from 'react-native-paper';
import openDB from "../db";

const db = openDB();

const EMPTY_PRODUT = {  
  ID_PRODUT: 0,
  ID_PESSOA: 0,
  NOME: "",
  QUANT: 0,
  PRECO_ANT: 0.0,
  PRECO_ATU: 0.0,
  OBS: "",
  IMG_PROD: "",
};

function Produt(prod){
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
    <View style={styles.secundaria}>
      <Image 
          style={styles.stretch}          
      />
    </View>  
  );
}

export default function ListaProduto({ route, navigation}) {
    const { userId } = route.params;
    const [produtos, setProdut] = useState([]);

    function recuperaProdutos() {
      db.transaction(tx => {
        tx.executeSql("SELECT * FROM PRODUTOS WHERE ID_PESSOA = ? ORDER BY NOME ASC", [userId], (_, rs) => {
          setProdut(rs.rows._array);
          console.log('Busca por produtos');
        });
      });
    } 

    useEffect(() => {
      recuperaProdutos();
    }, []);
  
    return(   

      <View style={styles.principal}>     
        <Appbar.Header backgroundColor='white'>
          <Appbar.Action icon="person" onPress={() => navigation.navigate("Usuario", { userId:userId })}  />          
          <Appbar.Content title= "Lista de Produtos" />
          <Appbar.Action icon="add" onPress={() => navigation.navigate("CadastroProd", { userId:userId })}  />
        </Appbar.Header>

        <View style={styles.principal}>     
          <ScrollView style={{ flex: 1 }}>
            {produtos.map(prod => (
              <Produt key={prod.id} produt={prod} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.form}>            
            <View style={styles.containerButton}>
              <Button title="criar catalogo" 
                      titleStyle={{ color: 'white', fontSize:19 }}   
                      onPress={() => navigation.navigate("CriarCatalogo")} 
                      buttonStyle={styles.buttonLogin}
              />
            </View>
      </View>
        
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
        flexDirection: "column",
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
        marginBottom: 5,
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
        width: 100,
        marginTop: -100,
    },

    containerScrollView:{
        flex: 1,
        marginLeft: -14, 
        marginRight: -14,
        marginBottom: -14,
        marginTop: 20,
        height:200,
    },
  });
