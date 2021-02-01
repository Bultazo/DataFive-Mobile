import React, { useState, useContext, useEffect, version } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  RadioButton,
} from "react-native-paper";
import { Input } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Spinner from 'react-native-loading-spinner-overlay';

import AnimatedSplash from "react-native-animated-splash-screen";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import AwesomeAlert from "react-native-awesome-alerts";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "./Provider";
import axios from "axios";
import AddMatchScreen from "./AddMatchScreen";



import FontAwesome from "react-native-vector-icons/FontAwesome";

import { LogBox } from "react-native";
import * as Progress from "react-native-progress";

import ProgressBar from "react-native-progress/Bar";

import ProgressCircle from "react-native-progress-circle";
import { TextInput } from "react-native-gesture-handler";

//Page de visualisation des statistiques en fonction de la variable selectionnée
const ViewStatsScreen = ({ route, navigation }) => {

    const { user, setUser } = useContext(AuthContext);


    const Variable = route.params.Variable





    const [DistanceAllPlayers, SetDistanceAllPlayers] = useState([])
    const [DribblesAllPlayers, SetDribblesAllPlayers] = useState([])
    const [AccelAllPlayers, SetAccelALlPlayers] = useState([])
    const [LesUsers, SetLesUsers] = useState([])






    const [Distance, SetDistance] = useState([]);
    const [Calories, SetCalories] = useState([]);
    const [Dribbles, SetDribbles] = useState([]);
    const [Acceleration, SetAcceleration] = useState([]);
    const [Buts, SetButs ] = useState([]);
  
    const [ScoreFinal, SetScoreFinal] = useState ("");
    const [ScoreA, SetScoreA] = useState("")
    const [ScoreB, SetScoreB] = useState("")
    const [date, SetDate] = useState("")
    const [NomCentre, SetNomCentre] = useState("")
    const [HeureDebut, SetHeureDebut] = useState("")
    const [HeureFin, SetHeureFin] = useState("")
    const [idMatch, SetIdMatch] = useState("")
    const [IdCentre, SetIdCentre] = useState("")
    
    const [PseudoMatch, SetPseudoMatch] = useState("")
    const [Createur, SetCreateur] = useState("")
  
    const [CentrePref, SetCentrePref] = useState([])
  
    const [CentreIdPref, SetCentreIdPref] = useState([])
  
    const screenWidth = Dimensions.get("window").width;

    const [DistanceLast, SetDistanceLast] = useState([]);
    const [CaloriesLast, SetCaloriesLast] = useState([]);
    const [DribblesLast, SetDribblesLast] = useState([]);
    const [AccelerationLast, SetAccelerationLast] = useState([]);
    const [ButsLast, SetButsLast ] = useState([]);

    const [BestPerformer , SetBestPerformer] = useState([])


    const [MoyAccel , SetMoyAccel] = useState("")
    const [MoyDribbles , SetMoyDribbles] = useState("")
    const [MoyCalories , SetMoyCalories] = useState("")
    const [MoyDistance , SetMoyDistance] = useState("")



    useEffect(()=> {

        if(!user) {
          console.log("ON PEUT PAS")
        } else {

          axios.post("http://192.168.43.17:3002/GetAllStats" , {
    
            id : user.id
          
          
            }).then((response) => {
          
  
              const DistanceData = response.data.Distance
              const CaloriesData = response.data.Calories
              const DribblesData = response.data.Dribbles
              const AccelerationData = response.data.Acceleration
              const ButsData = response.data.Buts



              SetDistance(DistanceData)
              SetCalories(CaloriesData)
              SetDribbles(DribblesData)
              SetAcceleration(AccelerationData)
              SetButs(ButsData)



              SetMoyDistance(response.data.MoyenneDistance)
              SetMoyAccel(response.data.MoyenneAcceleration)
              SetMoyDribbles(response.data.MoyenneDribbles)
              SetMoyCalories(response.data.MoyenneCalories)

          
              
          
          
          
              }).then(error => console.log(error))


              axios.post("http://192.168.43.17:3002/GetLastMatch" , {
    
                id : user.id
              
              
                }).then((response) => {
              
      
                console.log(response.data)
                const NewData = Object.values(response.data);
                console.log("CETS LE SCOOOOOOOOOOOOOOORE")

              const ScoreA =  NewData[0].score_A
              const ScoreB =  NewData[0].score_B
              const date =  NewData[0].date
              const DebutHeure = NewData[0].hour
              const FinHeure = NewData[0].hour_end
              const pseudo_match = NewData[0].pseudo_match
              const createur = NewData[0].created_by
              const id_match = NewData[0].id
              const idCentre = NewData[0].id_centre










                  const ScoreFinal = response.data.ScoreFinal

                  SetScoreFinal(ScoreFinal)
                  SetScoreA(ScoreA)
                  SetScoreB(ScoreB)
                  SetDate(date)

                  SetHeureDebut(DebutHeure)
                  SetHeureFin(FinHeure)
                  SetPseudoMatch(pseudo_match)
                  SetCreateur(createur)
                  SetIdMatch(id_match)
                  SetIdCentre(idCentre)

                  const NomDuCentre = response.data.Centre
                  SetNomCentre(NomDuCentre)


                  const DistanceData = response.data.Distance
                  const CaloriesData = response.data.Calories
                  const DribblesData = response.data.Dribbles
                  const AccelerationData = response.data.Acceleration
                  const ButsData = response.data.Buts
    
    
                 SetDistanceLast(DistanceData)
                  SetCaloriesLast(CaloriesData)
                  SetDribblesLast(DribblesData)
                  SetAccelerationLast(AccelerationData)
                  SetButsLast(ButsData)




                  var DistanceArray = []
                  var DribblesArray = []
                  var AccelerationArray = []
                  var UsersArray = []

                  for (var i = 0; i < response.data.MyData.length; i++) {
                    var MesKm = response.data.MyData[i].km_parcourus;
                    var MesDribbles = response.data.MyData[i].changement_appui
                    var MesAcceleration = response.data.MyData[i].acceleration


                    console.log(MesKm);
                    DistanceArray.push(MesKm);
                    DribblesArray.push(MesDribbles)
                    AccelerationArray.push(MesAcceleration)
                  }


                  for (var i = 0; i < response.data.MyUsers.length; i++) {
                    
                    var MesUsers = response.data.MyUsers[i]


                   
                  UsersArray.push(MesUsers)
                  }

                  SetBestPerformer(response.data.Performeur)






                  SetDistanceAllPlayers(DistanceArray)
                  SetDribblesAllPlayers(DribblesArray)
                  SetAccelALlPlayers(AccelerationArray)
                  SetLesUsers(UsersArray)
                  }).then(error => console.log(error))



              
  

        }

      }, [user])



      var TotalDistance = Distance.reduce((a, b) => a + b , 0)
      var TotalAcceleration = Acceleration.reduce((a, b) => a + b , 0)
      var TotalDribbles = Dribbles.reduce((a, b) => a + b , 0)
      var TotalButs = Buts.reduce((a, b) => a + b , 0)
      var TotalCalories = Calories.reduce((a, b) => a + b , 0)
      
      console.log("CEST LA DISTAAAANNNNCCCEEEEEEEEEEE")
      console.log(DistanceAllPlayers)

      var MesChampionsArray = []

      for (var i=0; i<BestPerformer.length; i++) {
        var MesChampions =  BestPerformer[i].Name
        MesChampionsArray.push(MesChampions)

      }

      console.log(MesChampionsArray)



 var dernierePlace = MesChampionsArray[2]
 var secondePlace = MesChampionsArray[1]
 var premierePlace = MesChampionsArray[0]
      



      
      
      
      
      
      
      var nombrecannetteNonArrondi = TotalCalories / 140
      var nombreCanette = Math.round(nombrecannetteNonArrondi)
      
      
      var nombreCaloriesFastFood = TotalCalories / 700
      var nombreMenus = Math.round(nombreCaloriesFastFood);
      
      
      var NombreTerrainsNonarrondi = TotalDistance / 400
      var NombreTerrains = Math.round(NombreTerrainsNonarrondi);
      
      
      
      
      var DistanceLatest = DistanceLast.reduce((a, b) => a + b , 0)
      var AccelerationLatest = AccelerationLast.reduce((a, b) => a + b , 0)
      var DribblesLatest = DribblesLast.reduce((a, b) => a + b , 0)
      var ButsLatest = ButsLast.reduce((a, b) => a + b , 0)
      var CaloriesLatest = CaloriesLast.reduce((a, b) => a + b , 0)
      
      var NmbCanettenon = CaloriesLast / 140
      var nmbCanette = Math.round(NmbCanettenon);
      
      
      var CaloriesFastFood = CaloriesLast / 700
      var Menus = Math.round(CaloriesFastFood)
      
      
      
      var NombreTerrainsNon = DistanceLast / 400
      var Terrains = Math.round(NombreTerrainsNon)


    





if (Variable == "Acceleration") {

    return (

        <View style = {styles.container}>

<View style={styles.slide1, {marginTop : 40, alignItems : "center"}}>
    

<Text style={{ color:'orange', fontSize :20, marginBottom: 20}}>Statistiques du dernier match : </Text>

        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>


       <MaterialCommunityIcons name="run-fast" size={30}  style={{height: 50, width: 150,marginLeft : 90}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 5, color : 'white', marginLeft : 40}}>Vous avez fait {AccelerationLatest} accelérations.</Text>

       </View>
       <View style={{flex:2, marginLeft : 15}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{AccelerationLatest} Accelérations </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Accelérations effectuées</Text>

        </View>



        <View style={styles.slide1, {marginTop : 100, alignItems : "center"}}>
    

<Text style={{ color:'#3680c9', fontSize :20, marginBottom: 20}}>Statistiques globales : </Text>



        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>


       <MaterialCommunityIcons name="run-fast" size={30}  style={{height: 50, width: 150,marginLeft : 90}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 5, color : 'white', marginLeft : 40}}>Vous avez fait {TotalAcceleration} accelérations.</Text>
              <Text style={ {width:350, textAlign : 'center', marginTop : 5, color : 'white', marginLeft : 40}}>Avec en moyenne {MoyAccel} accelération par match !</Text>


       </View>
       <View style={{flex:2, marginLeft : 15}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalAcceleration} Accelérations </Text>
       </View>


      

   </View>
   <Text style = {{  color: '#3680c9',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Accelérations effectuées</Text>

        </View>
    
        </View>
    
    );

}



if (Variable == "Calories") {

    return (

        <View style = {styles.container}>

<View style={styles.slide1, {marginTop : 40, alignItems : "center"}}>
    

<Text style={{ color:'orange', fontSize :20, marginBottom: 20}}>Statistiques du dernier match : </Text>

        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>


       <MaterialCommunityIcons name="run-fast" size={30}  style={{height: 50, width: 150,marginLeft : 90}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 5, color : 'white', marginLeft : 40}}>Vous avez dépensé l'quivalent de {nmbCanette} canettes de coca ou de {Menus} menus fast-food.</Text>

       </View>
       <View style={{flex:2, marginLeft : 15}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{CaloriesLatest} Calories </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Calories brulées</Text>

        </View>



        <View style={styles.slide1, {marginTop : 100, alignItems : "center"}}>
    

<Text style={{ color:'#3680c9', fontSize :20, marginBottom: 20}}>Statistiques globales : </Text>

        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>


       <MaterialCommunityIcons name="run-fast" size={30}  style={{height: 50, width: 150,marginLeft : 90}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 5, color : 'white', marginLeft : 40}}>Vous avez dépensé l'quivalent de {nombreCanette} canettes de coca ou de {nombreMenus} menus fast-food.</Text>
              <Text style={ {width:350, textAlign : 'center', marginTop : 5, color : 'white', marginLeft : 40}}>Avec en moyenne {MoyCalories} calories par match !</Text>

       </View>
       <View style={{flex:2, marginLeft : 15}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalCalories} Calories </Text>
       </View>


      

   </View>
   <Text style = {{  color: '#3680c9',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Accelérations effectuées</Text>

        </View>
    
        </View>
    
    );

}



if (Variable == "Dribbles") {

    return (

        <View style = {styles.container}>

<View style={styles.slide1, {marginTop : 40, alignItems : "center"}}>
    

<Text style={{ color:'orange', fontSize :20, marginBottom: 20}}>Statistiques du dernier match : </Text>

        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>


       <MaterialCommunityIcons name="run-fast" size={30}  style={{height: 50, width: 150,marginLeft : 90}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 5, color : 'white', marginLeft : 40}}>Vous avez éfféctué {DribblesLatest} durant le dernier match !</Text>

       </View>
       <View style={{flex:2, marginLeft : 15}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{DribblesLatest} Dribbles </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Dribbles efféctués</Text>

        </View>



        <View style={styles.slide1, {marginTop : 100, alignItems : "center"}}>
    

<Text style={{ color:'#3680c9', fontSize :20, marginBottom: 20}}>Statistiques globales : </Text>

        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>


       <MaterialCommunityIcons name="run-fast" size={30}  style={{height: 50, width: 150,marginLeft : 90}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 5, color : 'white', marginLeft : 40}}>Vous avez éfféctué {TotalDribbles} durant tous vos matchs !</Text>
              <Text style={ {width:350, textAlign : 'center', marginTop : 5, color : 'white', marginLeft : 40}}>Avec en moyenne {MoyDribbles} dribbles par match !</Text>

       </View>
       <View style={{flex:2, marginLeft : 15}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalDribbles} Dribbles </Text>
       </View>


      

   </View>
   <Text style = {{  color: '#3680c9',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Dribbles effectués</Text>

        </View>
    
        </View>
    
    );

}



if (Variable == "Distance") {

    return (

        <View style = {styles.container}>

<View style={styles.slide1, {marginTop : 40, alignItems : "center"}}>
    

<Text style={{ color:'orange', fontSize :20, marginBottom: 20}}>Statistiques du dernier match : </Text>

        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>


       <MaterialCommunityIcons name="run-fast" size={30}  style={{height: 50, width: 150,marginLeft : 90}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 5, color : 'white', marginLeft : 40}}>Vous avez parcouru {DistanceLatest} mètres durant tous vos matchs ! soit l'équivalent de {Terrains} tours de stade.</Text>
              
       </View>
       <View style={{flex:2, marginLeft : 15}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{DistanceLatest} mètres </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Distance parcourue</Text>

        </View>



        <View style={styles.slide1, {marginTop : 100, alignItems : "center"}}>
    

<Text style={{ color:'#3680c9', fontSize :20, marginBottom: 20}}>Statistiques globales : </Text>

        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>


       <MaterialCommunityIcons name="run-fast" size={30}  style={{height: 50, width: 150,marginLeft : 90}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 5, color : 'white', marginLeft : 40}}>Vous avez parcouru {TotalDistance} mètres durant tous vos matchs ! soit l'équivalent de {NombreTerrains} tours de stade.</Text>
              <Text style={ {width:350, textAlign : 'center', marginTop : 5, color : 'white', marginLeft : 40}}>Avec en moyenne {MoyDistance} mètres par match !</Text>

       </View>
       <View style={{flex:2, marginLeft : 15}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalDistance} mètres </Text>
       </View>


      

   </View>
   <Text style = {{  color: '#3680c9',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Distance parcourue</Text>

        </View>
    
        </View>
    
    );

}



if (Variable == "Classement") {

    return (
      <ScrollView>

        <View style = {styles.container}>




          


          <Text style={{ fontSize: 20, color: "white", textAlign: "center", marginTop : 10}}>Comparaison des statistques du dernier match : </Text>

            <View style = {{margintop : 50 }}>


              
            <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="numeric-1-box"
                    size={35}
                    color="white"
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Première Place : {premierePlace}</Text>


                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                    <View style={styles.categoryIcon2}>
                  <MaterialCommunityIcons
                    name="numeric-2-box"
                    size={35}
                    color="white"
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Seconde Place : {secondePlace}</Text>
                    </View>
                    <View style={{flex:1}}>
                    <View style={styles.categoryIcon3}>
                  <MaterialCommunityIcons
                    name="numeric-3-box"
                    size={35}
                    color="white"
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Troisième Place : {dernierePlace}</Text>

                    </View>
                </View>

                <View style = {{margintop : 30}}>

                <Text
                  style={{ fontSize: 20, color: "orange", textAlign: "center", marginBottom : 10}}
                >
                  Distance (en mètres)
                </Text>

                <BarChart

                

  data={{
    
    labels: LesUsers,
    datasets: [
      {
        data: DistanceAllPlayers,
      },

   
    ],

  }}
 
  style = {{backgroundColor : "blue"}}
  width={screenWidth}
  fromZero = {true}
  height={220}
  yAxisLabel="m"
  withInnerLines = {true}
  chartConfig={{
    fillShadowGradient:'skyblue',
    fillShadowGradientOpacity:1,
    backgroundGradientFrom: "orange",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "orange",
  backgroundGradientToOpacity: 0.6,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.9,
  useShadowColorFromDataset: false }}
  
  verticalLabelRotation={0}
  showBarTops	= {true}
/>




<Text
                  style={{ fontSize: 20, color: "orange", textAlign: "center", marginBottom : 10}}
                >
                  Dribbles
                </Text>

                <BarChart

                

  data={{
    
    labels: LesUsers,
    datasets: [
      {
        data: DribblesAllPlayers,
      },

   
    ],

  }}
 
  style = {{backgroundColor : "blue"}}
  width={screenWidth}
  fromZero = {true}
  height={220}
  yAxisLabel=""
  withInnerLines = {true}
  chartConfig={{
    fillShadowGradient:'red',
    fillShadowGradientOpacity:1,
    backgroundGradientFrom: "orange",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "green",
  backgroundGradientToOpacity: 0.6,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.9,
  useShadowColorFromDataset: false }}
  
  verticalLabelRotation={0}
  showBarTops	= {true}
/>




<Text
                  style={{ fontSize: 20, color: "orange", textAlign: "center", marginBottom : 10}}
                >
                  Accélérations
                </Text>

                <BarChart

                

  data={{
    
    labels: LesUsers,
    datasets: [
      {
        data: AccelAllPlayers,
      },

   
    ],

  }}
 
  style = {{backgroundColor : "blue"}}
  width={screenWidth}
  fromZero = {true}
  height={220}
  yAxisLabel=""
  withInnerLines = {true}
  chartConfig={{
    fillShadowGradient:'black',
    fillShadowGradientOpacity:1,
    backgroundGradientFrom: "orange",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "orange",
  backgroundGradientToOpacity: 0.6,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.9,
  useShadowColorFromDataset: false }}
  
  verticalLabelRotation={0}
  showBarTops	= {true}
/>
                
          
              </View>

      </View>

      </View>


      </ScrollView>

    
    );

}



}





export default ViewStatsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
  
      backgroundColor: "#25282d",
    },


    sliderContainer: {
        height: 200,
        width: '100%',
        marginTop: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
      },
    
      sliderContainerr: {
        height: 200,
        width: '100%',
        marginTop: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
      },
    
    
      wrapper: {height : 150},
    
      slide: {
        flex: 0.5,
        justifyContent: 'center',
        borderRadius: 8,
        alignItems: 'center',
    
        
      },
      fortext: {
    
      },
      nextButton : {
    
        fontSize : 50,
        color : 'orange',
        marginBottom :45
      },
    
      prevButton : {
    
        fontSize : 50,
        color : 'orange',
        marginBottom :45
    
      },
    
      slide1: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
       
      },
      slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1E'
      },
      slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1E'
      },
      categoryIcon3: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: 'blue' /* '#FF6347' */,
        borderRadius: 50,
      },
      textnew: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
      },
    
      textneww: {
        color: 'orange',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign : 'center',
        marginBottom : 20
      },
    
      column:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 10,
    
      },
      sliderImage: {
        height: '105%',
        width: '110%',
        alignSelf: 'center',
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        borderRadius: 8,
        alignItems: 'center',
      },
    
      sliderImage2: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      trone : {
        height: '110%',
        width: '110%',
      },
      categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
        
      },
      categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
      },
      categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#FFD700' /* '#FF6347' */,
        borderRadius: 50,
      },
      categoryIcon2: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#C0C0C0' /* '#FF6347' */,
        borderRadius: 50,
      },

      categoryIcon3: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#614e1a' /* '#FF6347' */,
        borderRadius: 50,
      },

      categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: 'white',
      },
      cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
      },
      card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      },
      cardImgWrapper: {
        flex: 1,
      },
      cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
      },
      cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
      },
      cardTitle: {
        fontWeight: 'bold',
      },
      cardDetails: {
        fontSize: 12,
        color: '#444',
      },
      title: {
        color: '#05375a',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom : 50
     },
    text: {
        color: 'white',
        marginTop:5
    },
    footer: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
        marginTop :15  
    },

})