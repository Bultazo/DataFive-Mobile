import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar, View, Button, TouchableOpacity, Image, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import AwesomeAlert from "react-native-awesome-alerts";
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimePicker from 'react-native-simple-time-picker';
import { AuthContext } from "./Provider";
import axios from "axios";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
    RadioButton,
  } from "react-native-paper";


  //Page de réservation lorsque l'on passe par les centres et non par les matchs !


const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );


  const ApButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.apButtonContainer}>
      <Text style={styles.apButtonText}>{title}</Text>
    </TouchableOpacity>
  );
  const SearchCentresScreen = ({ route, navigation }) => {

    const MyInfos = route.params;
    const Infos = Object.values(MyInfos);
    const Info = Infos[0];
    console.log(Info);


    const [nomComplet, SetnomComplet] = useState("");

    const [addMatch, SetAddMatch] = useState(true);
    const [date, setDate] = useState('2021-05-21');
    const [IsShowModel, SetIsShowModel] = useState(false);
    const [ErrorMessage, SetErrorMessage] = useState("");
    const [SuccessMessage, SetSuccessMessage] = useState("");
    const [succMessage, SetSuccMessage] = useState("");
    const [Model, SetModel] = useState(false);
    const [ShowModel, SetShowModel] = useState(false);
    const [selectedHours, setSelectedHours] = useState(0);
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const [time, setTime] = useState("");
    const [codeMatch, SetCodeMatch] = useState("");
    const [EndTime, SetEndTime] = useState("");
    const [EndHours, SetEndHours] = useState(0);
    const [EndMinutes, SetEndMinutes] = useState(0);


    const [Centre, SetCentre] = useState("");


    const [MyDate, SetMyDate] = useState("");
    const [StartTime, SetStartTime] = useState("");
    const [Creator, SetCreator] = useState("");
    const [FinTime, SetFinTime] = useState("");

//je mets le array data en tant que tableau pcq en bas jai un foreach et ca crash :)
    const [ArrayData, SetMyData] = useState([]);

    const [MyId, SetMyId] = useState("");


    const [centreName, SetCentreName] = useState("");
    const [centreAdress, SetCentreAdress] = useState("");
    const [centreVille, SetCentreVille] = useState("");
    const [centreCode, SetCentreCode] = useState("");
    const [centrePhone, SetCentrePhone] = useState("");
    const [centreMail, SetCentreMail] = useState("");
    const [centreBoss, SetCentreBoss] = useState("");
    const [centreTerrain, SetCentreTerrain] = useState("");
    const [centrePrix, SetCentrePrix] = useState("");



    console.log(centreBoss)









  console.log(EndTime)
  const { user, setUser } = useContext(AuthContext);


  


     // Similar to componentDidMount and componentDidUpdate Method.
     useEffect(() => {

      
      
  axios.post("http://192.168.43.17:3002/centres", {
  }).then((response) => {
    console.log(response.data.data);

    const NewData = Object.values(response.data.data);
    console.log(NewData)


    console.log(ArrayData)

    if (!ArrayData || ArrayData.length == 0) {

      SetMyData(NewData)


    }else {
      console.log("pas besoin")
    }


    


          }).then(error => console.log(error))

      // Set the count variable value to Zero.


      axios.post("http://192.168.43.17:3002/GetCentres" , {

        id_centre : Info


        }).then((response) => {
            console.log(response.data.data);
            const Mycentres = Object.values(response.data.data[0])

            const LesCentres = Object.values(Mycentres);

            /* LesCentres[0] => id
               */

               SetCentreName(LesCentres[1]) & SetCentreAdress(LesCentres[2])
               & SetCentreVille(LesCentres[3]) & SetCentreCode(LesCentres[4])
               & SetCentrePhone(LesCentres[5]) & SetCentreMail(LesCentres[6])
               & SetCentreBoss(LesCentres[7]) & SetCentreTerrain(LesCentres[8])
               & SetCentrePrix(LesCentres[9])

            

          }).then(error => console.log(error))
  
  
    }, [] );









  const MatchAdd = (e) => {

    e.preventDefault()

    if(date.length == 0 || time.length == 0 || EndTime.length == 0) {
      SetErrorMessage("Veuillez remplir tous les champs !")
      SetIsShowModel(true)

    }else {
      axios.post("http://192.168.43.17:3002/create", {
        id: user.id,
        hour: time,
        centre: Info,
        hour_end : EndTime,
        date: date,
      }).then((response) => {
        console.log(response.data);
      

        const arrayData = Object.values(response.data);
        console.log(arrayData)
        const status = arrayData[0];
        console.log(status);
        const code = arrayData[1];
        console.log(code);

        if(status == "success") {
          SetSuccessMessage("Votre Match a bien été crée ! Voici le code du Match : " + code ),
          SetShowModel(true);
        }else{
            SetErrorMessage("Une erreur s'est produite !"),
              SetIsShowModel(true)
                  }
              }).then(error => console.log(error))
    }



    

  }




  const { colors } = useTheme();
    return(

      
        <View style={styles.container}>

          
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
          message={succMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Go"
          confirmButtonColor="green"
          onConfirmPressed={() => {
          navigation.navigate('SearchMatch', {
            codeMatch: codeMatch,
            MyDate : MyDate,
            StartTime : StartTime,
            Creator : Creator,
            FinTime : FinTime,
            CentreName: Centre,
            id_match : MyId
          });
          SetModel(false);
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
          }}
        />

            <View style={{marginTop : 10}}>

            <View style={{marginBottom : 15}}>

            <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginLeft: 20 }}>
                        <Title
                          style={[
                            styles.title,
                            {
                              marginTop: 15,
                              marginBottom: 5,
                            },
                          ]}
                        >
                          Centre : <Text style={{color: 'orange'}}>{centreName}</Text>
                        </Title>

                        <View style={styles.userInfoSection, {marginTop : 10}}>
        <View style={styles.row}>
          <Icon name="map-marker" color="#777777" size={20} />
          <Text style={{ color: "#fff", marginLeft: 20 }}>
            Adresse : <Text style={{color:'orange'}}>{centreAdress }</Text>
          </Text>
        
        </View>

        <View style={styles.row}>
          <Icon name="google-maps" color="#777777" size={20} />
          <Text style={{ color: "#fff", marginLeft: 20 }}>
            Ville / Code Postal : <Text style={{color:'orange'}}>{centreVille + ' ' + centreCode }</Text>

          </Text>
        
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#fff", marginLeft: 20 }}>Numéro Fixe : <Text style={{color:'orange'}}>0{centrePhone }</Text></Text>
        </View>
        <View style={styles.row}>
          <Icon name="human-male" color="#777777" size={20} />
          <Text style={{ color: "#fff", marginLeft: 20 }}>
            Gérant : <Text style={{color:'orange'}}>{centreBoss }</Text>
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="soccer-field" color="#777777" size={20} />
          <Text style={{ color: "#fff", marginLeft: 20 }}>
            Nombre de terrain : <Text style={{color:'orange'}}>{centreTerrain}</Text>       
          </Text>
        </View>


       

        <View style={styles.row}>
        <FontAwesome name="money" color={"#777777"} size={20} />

          <Text style={{ color: "#fff", marginLeft: 20 }}>Prix :
          <Text style={{color:'orange'}}> {centrePrix} € /Heure</Text> 
          </Text>
        </View>
      </View>
                      </View>
                    </View>
                  </View>
<AppButton title="Créer un match" onPress={() => SetAddMatch(!addMatch) } />


</View>

<View>




</View>

<ScrollView>

<View style={styles.cardsWrapper}>
        {addMatch ? (
         <Animatable.View 
         animation="fadeInUpBig"
         style={[styles.footer, {
             backgroundColor: "orange"
         }]}
     >
         <Text style={[styles.text_footer, {
             color: colors.text
         }]}>Date de Réservation</Text>
         <View style={styles.action}>
            


<DatePicker
style={styles.datePickerStyle}
       date={date} // Initial date from state
       mode="date" // The enum of date, datetime and time
       placeholder="select date"
       format="YYYY-MM-DD"
       minDate="1900-01-01"
       maxDate="2030-01-01"
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
         <Animatable.View animation="fadeInLeft" duration={500}>
         </Animatable.View>
         
         

         <Text style={[styles.text_footer, {
             color: colors.text,
             marginTop: 35
         }]}>Selectionnez l'heure de début</Text>
             
       
     
     
     <TimePicker
       selectedHours={selectedHours}
       //initial Hourse value
       selectedMinutes={selectedMinutes}
       //initial Minutes value
       onChange={(hours, minutes) => {
         setSelectedHours(hours);
         setSelectedMinutes(minutes);
         setTime(`${hours}:${minutes}`)
       }}
     />

<Text>
       Heure de début séléctionnée : {selectedHours}:{selectedMinutes}
     </Text>


     <Text style={[styles.text_footer, {
             color: colors.text,
             marginTop: 35
         }]}>Selectionnez l'heure de fin</Text>
             
       
     
     
     <TimePicker
       EndHours={EndHours}
       //initial Hourse value
       EndMinutes={EndMinutes}
       //initial Minutes value
       onChange={(hours, minutes) => {
         SetEndHours(hours);
         SetEndMinutes(minutes);
         SetEndTime(`${hours}:${minutes}`)
       }}
     />

<Text>
       Heure de fin séléctionnée : {EndHours}:{EndMinutes}
     </Text>



            
         <Animatable.View animation="fadeInLeft" duration={500}>
         </Animatable.View>
        
         <View style= {{marginTop : 5}}>

         <ApButton title="Valider" onPress = {(e) => MatchAdd(e)} />

         </View>

             
     </Animatable.View>
     ): null}


       
      </View>
      </ScrollView>

      

    


</View>
        </View>
    )
}

export default SearchCentresScreen;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: 'center',
        backgroundColor: '#25282d',

    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#FF8C00",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      apButtonContainer: {
        marginTop : 20,
        elevation: 8,
        backgroundColor: "green",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      apButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      footer: {
        marginTop : 30,
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
      textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: 'white',
    },
    text_footer: {
        color: 'white',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 5
    },
    datePickerStyle: {
    
        color: '#fff'  
       },

       DropDown: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        paddingBottom: 5
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: "500",
        color: "#fff",
      },
      userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        marginTop: 0,
      },
      row: {
        flexDirection: "row",
        marginBottom: 10,
      },
      cardsWrapper: {
        marginTop: -25,
        width: '90%',
        alignSelf: 'center',
      },
    
  

})