import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView, SafeAreaView
} from "react-native";



import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
  } from 'react-native-paper';
import { Input } from "react-native-elements";

import axios from "axios";

import AwesomeAlert from "react-native-awesome-alerts";

import { AuthContext } from "./Provider";

import { zizou } from "../images/zizou.png";

import { useTheme } from "react-native-paper";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";


import "react-native-gesture-handler";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

const Settings = ({route, navigation}) => {
    const { user, setUser } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [Actualpassword, SetActualPassword] = useState("");
    const [password, SetPassword] = useState("");
    const [passwordConfirm, Setconfirm] = useState("");
    const [IsShowModel, SetIsShowModel] = useState(false);
    const [Model, SetModel] = useState(false);

    const [ErrorMessage, SetErrorMessage] = useState("");
    const [SuccessMessage, SetSuccessMessage] = useState("");

    const [showpassword, Setshowpassword] = useState(true);



    const ChangementPassword = (e) => {
      e.preventDefault();

      if (Actualpassword.length == 0 || password.length == 0 || passwordConfirm.length == 0) {

        SetErrorMessage("Veuillez remplir tous les champs !"),
        SetIsShowModel(true);

      } else if (password != passwordConfirm) {

        SetErrorMessage("Les mots de passes ne sont pas identiques !"),
            SetIsShowModel(true);

      } else {

        axios
            .put("http://192.168.43.17:3002/ModifyPassword", {
              id_user: user.id,
              password: Actualpassword,
              newpassword: password,
            })
            .then((response) => {
              console.log(response.data);

              const arrayData = Object.values(response.data)
              const status = arrayData[0]
              
    
              if (status == "success") {

                SetSuccessMessage("Votre mot de passe a été modifié avec succés !"),
              SetModel(true);

              


                
              } else if (status == "failed") {
                SetErrorMessage("Votre mot de passe actuel est inccorect !"),
                  SetIsShowModel(true);
              }
            });

        

      }
    }



    const { colors } = useTheme();

    
    return (

        <SafeAreaView style={styles.container}>

          

<View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image 
              source={{
                uri: user.image,
              }}
              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop:15,
                marginBottom: 5,
              }]}>{user.name} {user.firstname}</Title>
              <Caption style={styles.caption}></Caption>
            </View>
          </View>
        </View>

        <KeyboardAvoidingView>

        <TouchableOpacity

          onPress={() => Setshowpassword(!showpassword)  }
          
          >
      
          <Text style={{color : "orange", textAlign : 'center', fontSize : 17}}>Modifier le mot de passe</Text>
        </TouchableOpacity>


        {showpassword ? ( 
<View style = {{marginTop : 10}}>

 


     

        <Text style={[styles.text_footer, {
                color: "white"
            }]}>Mot de passe actuel</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="lock"
                    color={"orange"}
                    size={22}
                />

                <TextInput 
                    placeholder="Votre mot de passe"
                    placeholderTextColor="orange"
                    style={[styles.textInput, {
                        color: "white"
                    }]}
                    autoCapitalize="none"
                    //onChangeText={(val) => textInputChange(val)}
                    onChangeText={(e) => SetActualPassword(e)}
                    secureTextEntry
                    
                />

</View>


<AwesomeAlert
            show={IsShowModel}
            showProgress={false}
            title="Oups..."
            message={ErrorMessage}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Annuler"
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              SetIsShowModel(false);
            }}
          />


<AwesomeAlert
          show={Model}
          showProgress={false}
          title="Parfait !"
          message={SuccessMessage}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#008000"
          onConfirmPressed={() => {
            SetModel(false);
            navigation.navigate("Home")
          }}
        />


<Text style={[styles.text_footer, {
                color: "white"
            }]}>Nouveau mot de passe</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="lock"
                    color={"orange"}
                    size={22}
                />

                <TextInput 
                    placeholder="Votre nouveau mot de passe"
                    placeholderTextColor="orange"
                    style={[styles.textInput, {
                        color: "white"
                    }]}
                    autoCapitalize="none"
                    //onChangeText={(val) => textInputChange(val)}
                    onChangeText={(e) => SetPassword(e)}
                    secureTextEntry
                />

</View>


<Text style={[styles.text_footer, {
                color: "white"
            }]}>Confirmez nouveau mot de passe</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="lock"
                    color={"orange"}
                    size={22}
                />

                <TextInput 
                    placeholder="Confirmer le nouveau mot de passe"
                    placeholderTextColor="orange"
                    style={[styles.textInput, {
                        color: "white"
                    }]}
                    autoCapitalize="none"
                    secureTextEntry
                    //onChangeText={(val) => textInputChange(val)}
                    onChangeText={(e) => Setconfirm(e)}
                    
                />

</View>

<TouchableOpacity
                        onPress={(e) => ChangementPassword(e)}
                        style={[styles.test, {
                        borderColor: 'orange',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white'
                    }]}>Valider</Text>
                </TouchableOpacity>


            </View>
            ): null}
                  </KeyboardAvoidingView>



      </SafeAreaView>


        
      


    );
};

export default Settings;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop : 0,
      backgroundColor: '#25282d'
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color : '#fff'
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
    header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18, 
      marginTop : 10
  },
  action: {
      flexDirection: 'row',
      marginTop: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  test: {
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      borderRadius: 10,
      marginTop: 20,
      height:50,
      width:150,
      marginLeft:210

    },
    buttonText: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
    },
  });
