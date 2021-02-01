import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../Provider";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  Alert,
  BackHandler,
} from "react-native";
import * as Animatable from "react-native-animatable";
import AwesomeAlert from "react-native-awesome-alerts";

import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { useRoute } from "@react-navigation/native";

//Cette page Login est obselette, la vrai page Login est "SignInScreen.js"



const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default function Login({ route, navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [IsShowModel, SetIsShowModel] = useState(false);
  const [ErrorMessage, SetErrorMessage] = useState("");


  //Je recupere une variable du MainScreen afin de montrer que le user n'a pas de token 
  //Une fois que cette variable est pleine on redirige le user vers le login avec une erreur de connexion !


            var stop = route.params;
             /*var ArraytrueStop = Object.values(stop);
              var TrueStop = ArraytrueStop[0];

const fares = Object.values(stop)[0];
console.log("regarde laaaaa",fares)
            console.log("encore un stop " , stop)*/


            if ( Object.values(stop)[0]) {

               
              Alert.alert('Erreur Connexion', 'Veuillez Vous Reconnecter !',
              [
                
                      {
                        text: "Ok",
                        onPress: () => navigation.navigate("Login", {
                          stop : ""
                        }),
                        style: "cancel"
                      }
              ],
              {cancelable: false}
              ) 
              


              /* */
            }


            

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

          if (!arrayToken.length) {
            SetErrorMessage("Email ou mot de passe incorrect !"),
              SetIsShowModel(true);
          } else {
            navigation.navigate("HomeDrawer", {
              email: email,
              token: token,
            });
          }
          setUser(response.data.data[0]);
        })
        .then((error) => console.log(error));
    }
  };

  return (
    <ImageBackground
      source={require("../../images/bonom2.png")}
      style={styles.container}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.con}>
            <Image source={require("../../images/datafive.png")}></Image>
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
          <View style={{ marginTop: "35%" }}>
            <Input
              onChangeText={(e) => SetEmail(e)}
              color="white"
              label="Email"
              placeholder="example@gmail.com"
              placeholderTextColor="orange"
            />
            <Input
              color="white"
              onChangeText={(e) => SetPassword(e)}
              label="Password"
              placeholder="*******"
              placeholderTextColor="orange"
              secureTextEntry
            />
            <Button text="Connexion" onPress={(e) => verification(e)} />
          </View>
        </KeyboardAvoidingView>

        <Text
          onPress={() => navigation.navigate("Register")}
          style={{
            alignSelf: "center",
            color: "orange",
            paddingVertical: 30,
          }}
        >
          Vous êtes nouveau ?
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
  },

  con: {
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    backgroundColor: "rgba(0,0,0, 0.60)",
  },
  headerText: {
    marginTop: 50,
    color: "orange",
    fontWeight: "bold",
    fontSize: 34,
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 15,

    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontSize: 10,
    color: "white",
  },
  input: {
    color: "#353031",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 3,
    marginRight: 10,
    flex: 1,
  },
  error: {
    backgroundColor: "#cc0011",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
});
