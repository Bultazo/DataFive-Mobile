import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar, View, Text, Button, TouchableOpacity, Image, TextInput } from 'react-native';
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

import RadioButton from 'react-native-customizable-radio-button';

import RadioGroup from 'react-native-radio-button-group';
import RadioButtonRN from 'radio-buttons-react-native';

import SearchBar from "react-native-dynamic-search-bar";



//Cette page représente l'ajout et la réservation d'un match 
//Elle représente aussila page ou il est possible de rejoindre un match  




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
const AddMatchScreen = ({navigation}) => {

    const [addMatch, SetAddMatch] = useState(true);
    const [joinMatch, SetJoinMatch] = useState(false);
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

    const [NewArray, SetNewArray] = useState([]);

    const [Centre, SetCentre] = useState("");
    const [CentreName, SetNameCentre] = useState(""); 
    const [Centres, SetCentres] = useState([]);



    const [MyDate, SetMyDate] = useState("");
    const [StartTime, SetStartTime] = useState("");
    const [Creator, SetCreator] = useState("");
    const [FinTime, SetFinTime] = useState("");
    const [scoreA, SetScoreA] = useState("");
    const [scoreB, SetScoreB] = useState("");


//je mets le array data en tant que tableau pcq en bas jai un foreach et ca crash :)
    const [ArrayData, SetMyData] = useState([]);

    const [MyId, SetMyId] = useState("");

    const [selectedOption, SetSelectedOption] = useState(null)


    const [ArrayButtonRadio, SetArrayButtonRadio] = useState([]);



    //UseContext me permet de récupérer les informations de l'utilisateur dans nimporte quelle page de l'application 
    //L'utilisateur est stocké au niveau du Login (Front)

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

      SetMyData(NewData) & SetCentres(response.data.data)


    }else {
      console.log("pas besoin")
    }


    


          }).then(error => console.log(error))

  
  
    }, [] );


    const options = [
      {
        id: 1, // required
        text: 'Most High Pay', //required
      },
      {
        id: 2,
        text: 'Most Perfomance',
      },
    ];

   const onValueChange = (item) => {
      console.log(item);
    };






    //fonction d'ajout d'un match 
  const MatchAdd = (e) => {

    e.preventDefault()

    if(date.length == 0 || time.length == 0 || EndTime.length == 0 || Centre.length == 0) {
      SetErrorMessage("Veuillez remplir tous les champs !")
      SetIsShowModel(true)

    }else {
      axios.post("http://192.168.43.17:3002/create", {
        id: user.id,
        hour: time,
        centre: Centre,
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
          //ce sont des messages préparés pour les animation en fonction de la réponse du serveur 
          SetSuccessMessage("Votre Match a bien été crée ! Voici le code du Match : " + code ),
          SetShowModel(true);
        }else{
            SetErrorMessage("Une erreur s'est produite !"),
              SetIsShowModel(true)
                  }
              }).then(error => console.log(error))
    }



    

  }



  //fonction de recherche de match grace au pseudo du match (ce sera mieux explique au niveau du Back-end)
  const SearchMatch = (e) => {

    e.preventDefault()

    if(codeMatch.length == 0) {
      SetErrorMessage("Veuillez remplir tous les champs !")
      SetIsShowModel(true)

    }else {
      axios.post("http://192.168.43.17:3002/search", {
        pseudo_match : codeMatch,
        
      }).then((response) => {
        console.log(response.data);
      

        const arrayData = Object.values(response.data);
        console.log(arrayData)
        const status = arrayData[0];
        const created = arrayData[1]
        const created_by = Object.values(created[0])
        const Pseudo_creator = created_by[0]
        SetCreator(Pseudo_creator)

        if(response.data.data) {

          const Data = response.data.data[0];
          const DataObject = Object.values(Data);
  
          /*Le DataObject[0] = id dans la table match
            DataObject[1] = date 
            [2] = heure de début
            [3] = heure de fin 
            [4 , 5] = score A et B
            [6] = created by
            [7] = pseudo_match
          */

          SetMyId(DataObject[0])

         

          var TrueDate = new Date(DataObject[1]);
var days = String(TrueDate.getDate()).padStart(2, '0');
var months = String(TrueDate.getMonth() + 1).padStart(2, '0'); //January is 0!
var years = TrueDate.getFullYear();
TrueDate = years + '-' + months + '-' + days;

  
  
          SetMyDate(TrueDate)
          SetStartTime(DataObject[2])
          SetFinTime(DataObject[3])
          SetCentre(DataObject[8])
          SetScoreA(DataObject[4])
          SetScoreB(DataObject[5])



        }
        
       

        console.log(status)
      

        if(status == "success") {
          SetSuccMessage("Recherche aboutie" ),
          SetModel(true);
        }else if (status == "wrong") {


          SetErrorMessage("Aucun match n'est associé à ce code !"),
              SetIsShowModel(true)

        }
        
        else{
            SetErrorMessage("Une erreur s'est produite !"),
              SetIsShowModel(true)
                  }
              }).then(error => console.log(error))
    }
  }


  const SearchCentre = (text) => {

    axios.post("http://192.168.43.17:3002/SearchCentres" , {

    text: text

    }).then((response) => {
        console.log(response.data.data);
        const Mycentres = Object.values(response.data.data)

        const LesCentres = Object.values(Mycentres);

        console.log(LesCentres)

        SetCentres(response.data.data)
      }).then(error => console.log(error))
    
}
  const { colors } = useTheme();

  var DateOfTheDay = new Date()
  var d = String(DateOfTheDay.getDate()).padStart(2, '0');
var m = String(DateOfTheDay.getMonth() + 1).padStart(2, '0'); //January is 0!
var y = DateOfTheDay.getFullYear();
DateOfTheDay = y + '-' + m + '-' + d;

console.log(DateOfTheDay)
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
            id_match : MyId,
            scoreA : scoreA,
            scoreB: scoreB

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
            navigation.navigate("Matchs")
          }}
        />

            <View style={{marginTop : 25}}>

            <View style={{marginBottom : 15}}>

<AppButton title="Créer un match" onPress={() => SetAddMatch(!addMatch) & SetJoinMatch(false)} />


</View>

<View>


<AppButton title="Rejoindre un match" onPress={() => SetJoinMatch(!joinMatch) & SetAddMatch(false)} />


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
       date={DateOfTheDay} // Initial date from state
       mode="date" // The enum of date, datetime and time
       placeholder="select date"
       format="YYYY-MM-DD"
       minDate= {DateOfTheDay}
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

<View>

{/*ArrayData.forEach(function (element, index) {
  
  if(index == 0) {

   // NewArray.splice(0,NewArray.length) 
    ArrayButtonRadio.splice(0, ArrayButtonRadio.length)


  };




//NewArray.push({label: element.name+ " " + element.adress + " " + element.city + " " + element.postal_code, value: element.id});
ArrayButtonRadio.push({label : element.name+ " " + element.adress + " " + element.city + " " + element.postal_code })
})*/}
  








</View>

<SearchBar style={{marginTop:10}}
  placeholder="Chercher un centre"
  onChangeText={text => {
    SearchCentre(text)
  }}
  onPressCancel={() => {
    this.filterList("");
  }}
  onPress={() => alert("onPress")}
/>

{
    Centres.forEach(function (element, index) {
        if (index == 0) {
            ArrayButtonRadio.splice(0, ArrayButtonRadio.length);
        }
        ArrayButtonRadio.push({label : element.name + " " + element.adress + " " + element.city + " " + element.postal_code, value : element.id})
    })
}


<RadioButtonRN
  data={ArrayButtonRadio}
  selectedBtn={(e)=> SetCentre(Object.values(e)[1]) & SetNameCentre(Object.values(e)[0])}
  icon={
    <FontAwesome
      name="check-circle"
      size={25}
      color="#2c9dd1"
    />
  }
/>

            
         <Animatable.View animation="fadeInLeft" duration={500}>
         </Animatable.View>
        
         <View style= {{marginTop : 110}}>

         <ApButton title="Valider" onPress = {(e) => MatchAdd(e)} />

         </View>

             <Text
             onPress={() => SetJoinMatch(!joinMatch) & SetAddMatch(false)}
      
       style={{
         alignSelf: "center",
         color: "black",
         paddingVertical: 30,
         marginRight:200
       }}
     >
       
       Rejoindre un match ?
     </Text>
     </Animatable.View>
     ): null}


       
      </View>
      </ScrollView>

      
      <View style={styles.cardsWrapper}>
        {joinMatch ? (
        
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: "orange"
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Rechercher un match </Text>
            <View style={styles.action}>
               

            <TextInput 
                    placeholder="Code du match"
                    placeholderTextColor="#05375a"
                    style={[styles.textInput, {
                        color: colors.text,
                        marginTop : 5
                    }]}
                    autoCapitalize="none"
                   // onChangeText={(val) => handlePasswordChange(val)}
                   onChangeText={(e)=> SetCodeMatch(e)}
                />
               
                
            </View>
            <Animatable.View animation="fadeInLeft" duration={500}>
            </Animatable.View>
            
            


             
            

            <ApButton title="Chercher" onPress = {(e) => SearchMatch(e)} />



                <Text
          onPress={() => SetAddMatch(!addMatch) & SetJoinMatch(false)}
          style={{
            alignSelf: "center",
            color: "black",
            paddingVertical: 30,
            marginRight:200
          }}
        >
          
          Créer un match ?
        </Text>
        </Animatable.View>
        
        
        ): null }

      </View>

    


</View>
        </View>
    )
}

export default AddMatchScreen;

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
  

})