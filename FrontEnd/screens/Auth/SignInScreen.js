import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../Provider";

import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert, ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";




import { useTheme } from 'react-native-paper';
/*

import { AuthContext } from '../components/context';

import Users from '../model/users';*/

const SignInScreen = ({route, navigation}) => {

    //Cette page représente la page Login !



    //Fonction Login
    const { user, setUser } = useContext(AuthContext);
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [IsShowModel, SetIsShowModel] = useState(false);
    const [ErrorMessage, SetErrorMessage] = useState("");
    const [SuccessMessage, SetSuccessMessage] = useState("");
    const [showmodel, SetShowmodel] = useState(false);

    



    var stop = route.params;
 


    //Cette condition permet la verification que l'utilisateur est bel est bien en posséssion de son token 
    //Car lorsque l'on clique sur le bouton decconnexion, nous sommes automatiquement redirigé vers le login 
    //Cependant pour eviter que l'utilisateur navigue sur l'application sans son token (Appuis sur le bouton decconnexion ensuite sur le bouton retour d'android)
//Une fois qu'il sera redirigé vers le login sans son token une alerte se déclenchera !
   if ( Object.values(stop)[0]) {

      
     Alert.alert('Erreur Connexion', 'Veuillez Vous Reconnecter !',
     [
       
             {
               text: "Ok",
               onPress: () => navigation.navigate("SignInScreen", {
                 stop : ""
               }),
               style: "cancel"
             }
     ],
     {cancelable: false}
     ) 
     


     /* */
   }

  

   //fonction login
   const verification = (e) => {
    e.preventDefault();

    if (email.length == 0 || password.length == 0) {
      SetErrorMessage("Remplissez les champs correctement !"),
        SetIsShowModel(true);
    } else {
      axios
        .post("http://192.168.43.17:3002/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          const arrayData = Object.values(response.data)
              const status = arrayData[0]
              const message = arrayData[1]
              console.log("cest le status")
              console.log(status)
              console.log("cest le message")
              console.log(message)



               if (status == "failed" & message == "not verified") {
                SetSuccessMessage("Email non vérifié, veuillez confirmer l'email !"),
                SetShowmodel(true);
              } 

          else if (status == "wrong" & message == "wrong password") {
            SetErrorMessage("Email ou mot de passe incorrect !"),
              SetIsShowModel(true);
          } else {
          const tooken = response.data;
          const arrayToken = Object.values(tooken);
          const token = JSON.stringify(arrayToken[0]);
              console.log("cest ce que je cherche")
          console.log(response.data.data[0])

          const setToken = (token) => {
            return SecureStore.setItemAsync("secure_token", token);
          };
          setToken(token);
          const getToken = () => {
            return SecureStore.getItemAsync("secure_token");
          };
          getToken().then((token) => console.log("Le deuxieme token " + token));

     
            navigation.navigate("HomeDrawer", {
              email: email,
              token: token,
            });
        
          setUser(response.data.data[0]);
        }
        })
        .then((error) => console.log(error));
    }
  };









    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();


    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

   
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='black' barStyle="light-content"/>

        <View style={styles.header}>
            
            <Text style={styles.text_header}>Bienvenue !</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: "orange"
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />

<AwesomeAlert
          show={showmodel}
          showProgress={false}
          title="Aie ..."
          message={SuccessMessage}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            SetShowmodel(false);

          }}
        />

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
                <TextInput 
                    placeholder="Votre email"
                    placeholderTextColor="#05375a"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    //onChangeText={(val) => textInputChange(val)}
                    onChangeText = {(e) => SetEmail(e)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Mot de passe</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder=" Votre mot de passe"
                    placeholderTextColor="#05375a"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                   // onChangeText={(val) => handlePasswordChange(val)}
                   onChangeText={(e)=> SetPassword(e)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            

            
            <TouchableOpacity
                    onPress={(e) => verification(e)}
                    style={[styles.test, {
                        borderColor: 'black',
                        borderWidth: 1,
                        marginTop: 35
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white'
                    }]}>Connexion</Text>
                </TouchableOpacity>


                <Text
          onPress={() => navigation.navigate("SignUpScreen")}
          style={{
            alignSelf: "center",
            color: "black",
            paddingVertical: 30,
            marginRight:200
          }}
        >
          
          Vous êtes nouveau ?
        </Text>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'black'
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
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
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