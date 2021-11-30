import React, {useState, useEffect} from "react";
import { StyleSheet, View, Image, Platform, ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {Button} from "react-native-elements";
import {TextInput} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';

const flyers = {
  flayer1:"../img/Flyer/Modelo1-1.jpg",
  flayer2:"../img/Flyer/Modelo1-2.jpg",
  flayer3:"../img/Flyer/Modelo1-3.jpg",
  flayer4:"../img/Flyer/Modelo1-4.jpg",
  flayer5:"../img/Flyer/Modelo1-5.jpg",
  flayer6:"../img/Flyer/Modelo2-1.png",
  flayer7:"../img/Flyer/Modelo3-1.png",
}

export default function CriarCatalogo({ navigation}) {

    const [image, setImage] = useState({ ...flyers });
  
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
        setImage(result.uri);
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
            <View style={styles.containerInput}>
                <LinearGradient 
                colors={['#FFF', "rgba(62, 170, 204, 1)"]}
                start={{x: 0.0, y: 0.80}} end={{x: 0.0, y: 1.0}}
                style={styles.gradientInput2}
                >
                <TextInput
                    mode="outlined"
                    activeOutlineColor="rgba(62, 170, 204, 1)"
                    autoCapitalize="none"
                    outlineColor="#FFF"
                    theme={{ colors: { placeholder: "#ccc"} }}
                    underlineColor="#fff"
                    style={styles.formInput2}
                    label="nº selec."
                /></LinearGradient>
                <LinearGradient 
                colors={['#FFF', "rgba(62, 170, 204, 1)"]}
                start={{x: 0.0, y: 0.80}} end={{x: 0.0, y: 1.0}}
                style={styles.gradientInput2}
                >
                <TextInput
                    mode="outlined"
                    activeOutlineColor="rgba(62, 170, 204, 1)"
                    autoCapitalize="none"
                    outlineColor="#FFF"
                    theme={{ colors: { placeholder: "#ccc"} }}
                    underlineColor="#fff"
                    style={styles.formInput2}
                    label="nº layout"
                /></LinearGradient>
            </View>
            <View style={styles.containerImage}>
                <Image source={{ uri: image.flayer1 }} style={{backgroundColor: "#CCC",marginBottom: -20, width: 220, height: 300 }} />
            </View>
            <View style={styles.containerButton}>
                <Button title="exportar" titleStyle={{ color: 'white', fontSize:19 }}   onPress={() => navigation.navigate("Login")} buttonStyle={styles.buttonLogin}/>
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
        marginBottom: 10,
        
    },
    formInput2: {
        backgroundColor: "#fff",
        width: 120,
        height: 50,
        fontSize:19,
        marginBottom: 1.5,
        zIndex:40,
    },
    gradientInput2: {
        height: 59,
        borderBottomRightRadius: 5, 
        borderBottomLeftRadius: 5, 
        width: 121,
        paddingLeft:0.5,
        marginBottom: 0,
        
    },
    containerInput:{
        marginTop:40,
        justifyContent: "space-between",
        flexDirection: "row",
        width: 260,
    },
    containerButton:{
        justifyContent: "center",
        flexDirection: "row",
        width: 260,
    },

    containerImage:{
        justifyContent: "center",
        flexDirection: "row",
        width: 260,
        marginTop: 30,
    },
    
    buttonLogin: {
        backgroundColor: "rgba(62, 170, 204, 1)",
        marginTop: 20,
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
  
  });