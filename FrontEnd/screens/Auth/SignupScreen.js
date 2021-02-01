import React, { useState, useRef, useEffect } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
//cette page représente la page inscription de l'application 



const Button = ({ text, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.test}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

const SignupScreen = ({navigation}) => {

    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [passwordConfirm, Setconfirm] = useState("");
    const [IsShowModel, SetIsShowModel] = useState(false);
    const [ErrorMessage, SetErrorMessage] = useState("");
    const [SuccessMessage, SetSuccessMessage] = useState("");



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

              const arrayData = Object.values(response.data)
              const status = arrayData[0]
    
              if (status == "success") {

                SetSuccessMessage("Un Email de confirmation viens d'être envoyé, veuillez le confirmer !"),
              SetIsShowModel(true);

              


                
              } else if (response.data == false) {
                SetErrorMessage("Il existe déja un email pour ce compte !"),
                  SetIsShowModel(true);
              }
            });
        }
      };



    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => { 
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='black' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Inscrivez vous !</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Votre email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    //onChangeText={(val) => textInputChange(val)}
                    onChangeText={(e) => SetEmail(e)}

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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Mot de passe</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Votre mot de passe"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                   // onChangeText={(val) => handlePasswordChange(val)}
                   onChangeText={(e) => SetPassword(e)}

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
            navigation.navigate("CompleteInfo", {
                email: email,
              });

          }}
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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirmez le mot de passe</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirmez le mot de passe"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                   // onChangeText={(val) => handleConfirmPasswordChange(val)}
                   onChangeText={(e) => Setconfirm(e)}

                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
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
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    En vous inscrivant vous acceptez les
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}conditions d'utilisation</Text>
         
            </View>
           
                <TouchableOpacity
                        onPress={(e) => verification(e)}
                        style={[styles.test, {
                        borderColor: 'black',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white'
                    }]}>Inscription</Text>
                </TouchableOpacity>
            
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignupScreen;

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
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: 'orange',
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    test: {
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 50,
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