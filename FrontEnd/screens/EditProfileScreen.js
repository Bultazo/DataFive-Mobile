import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
} from "react-native";
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

//import ImagePicker from 'react-native-image-crop-picker';

const EditProfileScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);

  //Cette page représente la modification du profil qui se trouve en haut à droite de la page profil dans la naviation
 



 
  const [image, setImage] = useState(null);
  const [IsShowModel, SetIsShowModel] = useState(false);
  const [ShwoModel, SetShowModel] = useState(false);
  const [ErrorMessage, SetErrorMessage] = useState("");
  const [email, SetEmail] = useState(user.email);
  const [weight, SetWeight] = useState(user.weight);
  const [size, SetSize] = useState(user.size);
  const [SuccessMessage, SetSuccessMessage] = useState("");
  const [id, setId] = useState(user.id);
  const [pseudo, setPseudo] = useState(user.pseudo);

  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  });

  const modification = (e) => {
    e.preventDefault();

    if (
      email.length == 0 ||
      size.length == 0 ||
      weight.lenght == 0 
    ) {
      SetErrorMessage("Remplissez les champs correctement !"),
        SetIsShowModel(true);
    } else {

      axios.put("http://192.168.43.17:3002/profile", {

          id: id,
          email: email,
          pseudo: pseudo,
          size: size,
          weight: weight,
          image: image

        })
        .then((response) => {

          const arrayData = Object.values(response.data);
          const status = arrayData[0];
          const message = arrayData[1];
          console.log(status)
          console.log(message)

          if (status == "success"){
            const MyNewUser = response.data.data[0];

            setUser(MyNewUser);
            SetSuccessMessage("Votre Profil a bien été modifié !"),
              SetIsShowModel(true);

          }else if (message == "Pseudo déja utilisé !") {
            SetErrorMessage("Le pseudo est déja utilisé !"),
            SetShowModel(true);
       
          }else {
            SetErrorMessage("Une erreur est survenue !"),
            SetShowModel(true);
          }
           

          
          
         

          

        });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setImage(result.uri);
      console.log("Nothing");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 25 }}>
        <TouchableOpacity
          onPress={() => {
            pickImage();
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "#fc874f",
              alignItems: "center",
              justifyContent: "center",
              width: 146,
              height: 146,
              borderRadius: 185,
            }}
            >
            {
              <ImageBackground
                source={{
                  uri: user.image,
                }}
                style={{
                  flex: 1,
                  borderRadius: 185,
                  height: 146,
                  width: 146,
                }}
                imageStyle={{
                  flex: 1,
                  borderRadius: 185,
                  height: 146,
                  width: 146,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="plus"
                    size={35}
                    color={"white"}
                    style={{
                      opacity: 0.7,

                      borderWidth: 1,
                      borderColor: "orange",
                      borderRadius: 50,
                    }}
                  />
                </View>
              </ImageBackground>
            }
          </View>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {user.name} {user.firstname}
        </Text>
      </View>

      <KeyboardAvoidingView>
        <AwesomeAlert
          show={ShwoModel}
          showProgress={false}
          title="Oups..."
          message={ErrorMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Annuler"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            SetShowModel(false);
          }}
        />

<AwesomeAlert
          show={IsShowModel}
          showProgress={false}
          title="Parfait !"
          message={SuccessMessage}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#008000"
          onConfirmPressed={() => {
            SetIsShowModel(false);
            navigation.navigate("Profil")

          }}
        />

        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={"white"} size={20} />
          <Input
            label="Email"
            defaultValue={email}
            onChangeText={(e) => SetEmail(e)}
            placeholderTextColor="white"
            autoCorrect={false}
            style={[
              {
                color: "orange",
              },
            ]}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={"white"} size={20} />
          <Input
            label="Pseudo"
            defaultValue={pseudo}
            onChangeText={(e) => setPseudo(e)}
            placeholderTextColor="white"
            autoCorrect={false}
            style={[
              {
                color: "orange",
              },
            ]}
          />
        </View>


        

     
        <View style={styles.action}>
          <FontAwesome name="balance-scale" color={"white"} size={20} />
          <Input
            label="Poids (Kg)"
            keyboardType = 'numeric'
            maxLength={3}
            onChangeText={(e) => SetWeight(e)}
            defaultValue={weight}
            placeholderTextColor="white"
            autoCorrect={false}
            style={[
              {
                color: "orange",
              },
            ]}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="text-height" color={"white"} size={20} />
          <Input
            label="Taille (Cm)"
            keyboardType = 'numeric'
            maxLength={3}
            onChangeText={(e) => SetSize(e)}
            defaultValue={size}
            placeholderTextColor="white"
            autoCorrect={false}
            style={[
              {
                color: "orange",
              },
            ]}
          />
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity
        style={styles.commandButton}
        onPress={(e) => modification(e)}
      >
        <Text style={styles.panelButtonTitle}>Modifier</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    backgroundColor: "#25282d",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF4500",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    marginTop: -5,
    flexDirection: "row",
    paddingHorizontal: 75,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    color: "#05375a",
  },
});
