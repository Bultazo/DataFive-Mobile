import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import AwesomeAlert from "react-native-awesome-alerts";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
//Cette page Register est obselette, la vrai pagr Inscription est la page (SignUpScreen.js)

const Error = ({ display = false }) => {
  const viewElement = useRef(null);

  useEffect(() => {
    if (display) {
      viewElement.current.animate("shake", 500, "linear");
    } else {
      viewElement.current.animate("bounceOut", 500);
    }
  }, [display]);

  const viewStyles = [styles.error, { opacity: 0 }];

  if (display) {
    viewStyles.push({ opacity: 1 });
  }

  return (
    <Animatable.View style={viewStyles} ref={viewElement}>
      <Text style={styles.errorText}>X</Text>
    </Animatable.View>
  );
};
/*
const Input = ({ label, error, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={styles.row}>
        <TextInput autoCapitalize="none" style={styles.input} {...props} />

        <Error display={error} />
      </View>
    </View>
  );
};*/

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default function Register({ navigation }) {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordConfirm, Setconfirm] = useState("");
  const [IsShowModel, SetIsShowModel] = useState(false);
  const [ErrorMessage, SetErrorMessage] = useState("");

  const verification = (e) => {
    e.preventDefault();

    if (
      email.length == 0 ||
      password.length == 0 ||
      passwordConfirm.length == 0
    ) {
      SetErrorMessage("Veuillez remplir tous les champs !"),
        SetIsShowModel(true);
    } else if (password != passwordConfirm) {
      SetErrorMessage("Les mots de passes ne sont pas identiques !"),
        SetIsShowModel(true);
    } else {
      axios
        .post("http://192.168.43.17:3002/inscription", {
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data == true) {
            navigation.navigate("CompleteInfo", {
              email: email,
            });
          } else if (response.data == false) {
            SetErrorMessage("Il existe déja un email pour ce compte !"),
              SetIsShowModel(true);
          }
        });
    }
  };

  return (
    <ImageBackground
      source={require("../../images/bonom2.png")}
      style={styles.containner}
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

          <Input
            leftIcon={<Icon name="user" size={24} color="white" />}
            onChangeText={(e) => SetEmail(e)}
            color="white"
            label="Email"
            placeholder="example@gmail.com"
            placeholderTextColor="orange"
          />
          <Input
            style={styles.inputLabel}
            leftIcon={<Icon name="lock" size={24} color="white" />}
            color="white"
            onChangeText={(e) => SetPassword(e)}
            label="Mot de passe"
            placeholder="*******"
            placeholderTextColor="orange"
            secureTextEntry
          />

          <Input
            leftIcon={<Icon name="lock" size={24} color="white" />}
            color="white"
            onChangeText={(e) => Setconfirm(e)}
            label="Confirmer le mot de passe"
            placeholder="*******"
            placeholderTextColor="orange"
            secureTextEntry
          />
        </KeyboardAvoidingView>

        <Button text="Inscription" onPress={(e) => verification(e)} />
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
    color: "orange",
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
