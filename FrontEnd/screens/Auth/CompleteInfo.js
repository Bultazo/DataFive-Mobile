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
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';




const Button = ({ text, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.test}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  //Cette page représente le complément d'informations suivant la page inscription, une fois que toutes les infos sont remplies au niveau de l'inscription, cette page apparaitera

const CompleteInfo = ({route, navigation}) => {

    //Declaration de tous les states necessaire au fonctionnement de cette page

  const [date, setDate] = useState('09-10-2020');
  const [name, SetName] = useState("");
  const [firstname, SetFirstname] = useState("");
  const [gender, SetGender] = useState("");
  const [weight, SetWeight] = useState("");
  const [size , SetSize] = useState("");
  const [IsShowModel , SetIsShowModel] = useState(false);
  const [ErrorMessage, SetErrorMessage] = useState("");
  const [SuccessMessage, SetSuccessMessage] = useState("");
  const [ShowModel , SetShowModel] = useState(false);





  const emaill = route.params;
  const emaile = Object.values(emaill);
  const email = emaile[0];
  console.log(email);


  //Fonction verification que l'on retrouvera tout au long du projet, c'est grace a cette fonction qui récupère les valeurs des inputs 
  //et qui les envois au back-end (serveur node js) gràca à axios 


  const verification = (e) => {
    e.preventDefault()

    if(date.length == 0|| size.length == 0 || weight.length == 0 || name.length ==0 || firstname.length == 0  ) {

        SetErrorMessage("Veuillez remplir tous les champs !"),
        SetIsShowModel(true)
        
    }else {
        axios.post("http://192.168.43.17:3002/complete", {
            email: email,
            name: name,
            firstname: firstname,
            gender: gender,
            date: date,
            weight: weight,
            size: size,
            
        }).then((response) => {
            console.log(response.data);

            const arrayData = Object.values(response.data);
            console.log(arrayData)
            const status = arrayData[0];
            console.log(status);

            if(status == "success") {

              SetSuccessMessage("Votre Profil a bien été crée !"),
              SetShowModel(true);
            }else{
                SetErrorMessage("Une erreur s'est produite !"),
                  SetIsShowModel(true)
                      }
                  }).then(error => console.log(error))

    }
   

}




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
            <Text style={styles.text_header}>Dernière étape ...</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>

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
          show={ShowModel}
          showProgress={false}
          title="Parfait !"
          message={SuccessMessage}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#008000"
          onConfirmPressed={() => {
            SetShowModel(false);
            navigation.navigate("SignInScreen")
          }}
        />

            <Text style={styles.text_footer}>Nom</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    onChangeText = {(e) => SetName(e)}

                    placeholder="Nom"
                    style={styles.textInput}
                    autoCapitalize="none"
                    //onChangeText={(val) => textInputChange(val)}

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
            }]}>Prénom</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                  onChangeText = {(e) => SetFirstname(e)}

                    placeholder="Prénom"
                    style={styles.textInput}
                    autoCapitalize="none"
                    //onChangeText={(val) => textInputChange(val)}

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
            }]}>Date de Naissance</Text>
            <View style={styles.DropDown}>
                    
<DatePicker
style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="1900-01-01"
          maxDate="2020-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
              
            },
            dateInput: {
              marginLeft: 36,

            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
                        </View>


            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Poids</Text>
            <View style={styles.action}>
            <FontAwesome name="balance-scale" color="#05375a" size={20} />

                <TextInput 
                keyboardType = 'numeric'
                maxLength={3}

                    placeholder="En kg"
                    style={styles.textInput}
                    autoCapitalize="none"
                    //onChangeText={(val) => textInputChange(val)}
                    onChangeText = {(e) => SetWeight(e)}

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
            }]}>Taille</Text>
            <View style={styles.action}>
                <FontAwesome 
                   name="text-height"
                   maxLength={3}
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                keyboardType = 'numeric'
                    placeholder="En cm"
                    maxLength={3}

                    onChangeText = {(e) => SetSize(e)}

                    style={styles.textInput}
                    autoCapitalize="none"
                    //onChangeText={(val) => textInputChange(val)}

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
            }]}>Genre</Text>

            
            
            <DropDownPicker  placeholder="Genre"  placeholderTextColor="orange"


items={[


    {label: 'Homme', value: 'Homme'},
    {label: 'Femme', value: 'Femme'},
    {label: 'Autre', value: 'Autre'}

]}
containerStyle={{height: 40}}
style={{backgroundColor: 'white'}}
dropDownStyle={{backgroundColor: 'white'}}
onChangeItem={(e)=> SetGender(Object.values(e)[0])}

/>


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
                    }]}>Valider</Text>
                </TouchableOpacity>
            
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default CompleteInfo;

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
    Genre:{

      color: "black"

    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: 'orange',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    datePickerStyle: {
    
      color: '#fff'  
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

    DropDown: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
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
        marginTop: 140
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