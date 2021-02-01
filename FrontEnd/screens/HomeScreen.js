import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView, ImageBackground, TextInput

} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';




import ImagesCombineLibrary from 'react-native-images-combine';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

import { AuthContext } from "./Provider";
const Button = ({ text, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.test}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LogBox } from "react-native";

//Cette page représente le Home, la page d'accueil de l'application

const HomeScreen = ({navigation}) => {

  const [showMatch, SetShowMatch] = useState(true);
  const [recompense, setRecompense] = useState(false);
  const [sante, setSante] = useState(false);

  LogBox.ignoreAllLogs();




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


  const [DistanceLast, SetDistanceLast] = useState([]);
  const [CaloriesLast, SetCaloriesLast] = useState([]);
  const [DribblesLast, SetDribblesLast] = useState([]);
  const [AccelerationLast, SetAccelerationLast] = useState([]);
  const [ButsLast, SetButsLast ] = useState([]);







  const { user, setUser } = useContext(AuthContext);





      

      useEffect(()=> {

        if(!user) {
          console.log("Impossible")
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

          
              
          
          
          
              }).then(error => console.log(error))


              axios.post("http://192.168.43.17:3002/GetLastMatch" , {
    
                id : user.id
              
              
                }).then((response) => {
              
      
                console.log(response.data)
                const NewData = Object.values(response.data);

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
    

    
              
              
              
                  }).then(error => console.log(error))



                  axios.post("http://192.168.43.17:3002/MostFrequentCenter" , {
    
                    id_user : user.id
                  
                  
                    }).then((response) => {
                  
                    const NewData = Object.values(response.data.data);
                    console.log(response.data.data)



                    var IdArray = []
                    var NameArray = []

                    for (var i = 0; i < NewData.length; i++) {
                      var MesId = NewData[i].id;
                      IdArray.push(MesId);
                    }


                    for (var i = 0; i < NewData.length; i++) {
                      var MesNames = NewData[i].Name;
                      NameArray.push(MesNames);
                    }




                    console.log(IdArray)
                    console.log(NameArray)


                    SetCentrePref(NameArray)
                    SetCentreIdPref(IdArray)



            












             
                  
                  
                  
                      }).then(error => console.log(error))



                  





              
  

        }

      }, [user])


     


       
    

     

  






   



var TotalDistance = Distance.reduce((a, b) => a + b , 0)
var TotalAcceleration = Acceleration.reduce((a, b) => a + b , 0)
var TotalDribbles = Dribbles.reduce((a, b) => a + b , 0)
var TotalButs = Buts.reduce((a, b) => a + b , 0)
var TotalCalories = Calories.reduce((a, b) => a + b , 0)










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

 
  
  
  
  const theme = useTheme();
  const { colors } = useTheme();



  



if (user == null) {
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={styles.sliderContainer}>
            <ImageBackground
              source={require('../images/Acceuil.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            > 
<Text style={{textAlign: "center", fontWeight : "bold",color: "white"}}>Bonjour</Text>             
<ImageBackground
            source={require('../images/trone.png')}
            style={{
              height: '60%',
              width: '100%',
              marginRight : 150,
            
            }}
            resizeMode="contain"
          >
            <Image
              style={{
                marginTop: '4.5%',
                alignSelf: 'center',
                height: '30%',
                width: '100%'
              }}
              resizeMode="contain"
              source={ require('../images/vrai.png')}
            />
          </ImageBackground> 
            </ImageBackground>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Restaurant'})
          }>
          <View style={styles.categoryIcon}>
            <Ionicons name="ios-restaurant" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Fastfood Center'})
          }>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={35}
              color="#FF6347"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Fastfood Center</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="food" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Snacks Corner</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.categoryContainer, {marginTop: 10}]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Fontisto name="hotel" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Hotels</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Ionicons name="md-restaurant" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Dineouts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name="expand-more" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Show More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          }}>
        </Text>
      </View>
      <View>
        
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: '#1C1C1E'
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: 'white'
            }]}>2502 mètres !</Text>
            <Text style={styles.text}>Connecte toi avec ton compte !</Text>
                <Button text="Connexion" onPress={()=>navigation.navigate('SignInScreen', {
                  stop: ""
                })} />


        </Animatable.View>
      </View>
      
    </ScrollView>
  );
   }
      else {    
        
        var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

var birthdate = new Date(user.date_naissance);
var days = String(birthdate.getDate()).padStart(2, '0');
var months = String(birthdate.getMonth() + 1).padStart(2, '0'); //January is 0!
var years = birthdate.getFullYear();


birthdate = years + '-' + months + '-' + days;


var age = yyyy - years;
var m = mm - months;



var RealDate = new Date(date);
var dd = String(RealDate.getDate()).padStart(2, '0');
var mm = String(RealDate.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = RealDate.getFullYear();

RealDate = dd + '/' + mm ;








 





if (m <0 ||( m === 0 && dd < days)) {
  age--;
}
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
        
      <View style={styles.sliderContainer}>

      <ImageBackground
              source={require('../images/Acceuil.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            > 
           

           <Text style={{textAlign: "center",fontSize: 28, marginBottom: 120, fontWeight : "bold",color: "white"}}>{user.name} {user.firstname}</Text> 
           <View style={{position: 'absolute', top : 80}}>
           <Text style={{textAlign: "center",fontSize: 15,marginLeft:140,fontWeight : "bold",color: "white"}}>{user.size} cm</Text> 
           <Text style={{textAlign: "center",fontSize: 15,marginLeft:140,fontWeight : "bold",color: "white"}}>{user.weight} Kg</Text> 
           <Text style={{textAlign: "center",fontSize: 15,marginLeft:140,fontWeight : "bold",color: "white"}}>{age} ans</Text> 
           </View>

<View style={{position: 'absolute', top: 60, left: 60}}>
<ImageBackground
            source={require('../images/trone.png')}
            style={{
              height: '120%',
    width: '130%',
    justifyContent: 'center',
    
            
          }}
            resizeMode="contain"
          >



         
<Avatar.Image 
 style={{
  marginTop: '4.5%',
  alignSelf: 'center',
  marginLeft : 35,
}}
resizeMode="contain"
              source={{
                uri: user.image,
              }}
              size={60}
            />
          </ImageBackground>

          </View>

            
            </ImageBackground>
            </View>

         

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}

          onPress={() => SetShowMatch(!showMatch) & setRecompense(false) & setSante(false) }
          
          >
          <View style={styles.categoryIcon}>
            <Ionicons name="ios-calendar" size={35} color="white" />
          </View>
          <Text style={styles.categoryBtnTxt}>Dernier Match</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => 
            
            setRecompense(!recompense)  & SetShowMatch(false) & setSante(false)}
          > 
          <View style={styles.categoryIcon}>
            <Ionicons
              name="ios-medal"
              size={35}
              color="white"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Récompenses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => setSante(!sante) & SetShowMatch(false) & setRecompense(false )}
>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="heart-outline" size={35} color="white" />
          </View>
          <Text style={styles.categoryBtnTxt}>Santé</Text>
        </TouchableOpacity>
      </View>

      {showMatch ? ( 
      <View>
      
      <View style={styles.cardsWrapper}>
        <TouchableOpacity onPress={() =>  { navigation.navigate("SearchMatch", {

codeMatch: PseudoMatch,
MyDate : date,
StartTime : HeureDebut,
Creator : Createur,
FinTime : HeureFin,
idCentre: IdCentre,
id_match : idMatch,
ScoreA : ScoreA,
ScoreB : ScoreB

        }); }}


        >
        
       <View style={{flexDirection:"row", marginLeft : 45, marginTop :-10}}>
       <View style={{flex:1}}>
          <Text style={{justifyContent: 'flex-start', color: "orange", fontSize : 40}}>{ScoreA} <Text style={{color:'white'}}>- {ScoreB}</Text></Text>
          <Text style={{marginLeft : 30,color : '#28D4A2', fontSize : 20 }}>{ScoreFinal}</Text>


      
       </View>
       <View style={{flex:1}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize : 27, marginTop : 5}}>{RealDate}</Text>
       <Text style={{color:'white', fontSize : 20, marginTop : 12, marginRight : 20,}}>{NomCentre}</Text>

       </View>
   </View>

   </TouchableOpacity>

   </View>

   
   
   <View style = {{marginTop : 10}}>
        
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: '#1C1C1E'
            }]}
            animation="fadeInUpBig"
        >

<TouchableOpacity  onPress={()=>navigation.navigate('Stats')}>

            <Text style={styles.textneww}>Statistiques du dernier match</Text>

            </TouchableOpacity>


            <Swiper dot={
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,.3)',
                width: 7,
                height: 7,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: 'orange',
                width: 7,
                height: 7,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          paginationStyle={{
            top: 180,
            color : 'orange'
          }}autoplay = {true} style={styles.wrapper} showsButtons={false} nextButton = {<Text style={styles.nextButton}>›</Text>	} autoplayTimeout = "4" prevButton = {<Text style={styles.prevButton}>‹</Text>	}>
        <View style={styles.slide1}>
        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>

       <MaterialCommunityIcons name="map-marker-distance" size={30}  style={{height: 50, width: 150,marginLeft : 80}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez couru l'équivalent de {Terrains} terrains de Football</Text>

       </View>
       <View style={{flex:1, marginRight:70}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{DistanceLatest} mètres </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Distance parcourue</Text>

        </View>
        <View style={styles.slide2}>

        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>

       <MaterialCommunityIcons name="cookie" size={35}  style={{height: 50, width: 150,marginLeft : 80}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez dépensé l'équivalent de {nmbCanette} cannettes de coca ou {Menus} menus fast-food</Text>

       </View>
       <View style={{flex:1, marginRight:70}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{CaloriesLatest} Calories </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Calories perdues</Text>

        </View>

        <View style={styles.slide3}>

<View style={{flexDirection:"row"}}>
<View style={{flex:1, marginLeft : 1}}>

<Ionicons name ="ios-football" size = {35} style={{height: 50, width: 150,marginLeft : 80}} color = "white"></Ionicons>

      <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez effectué {DribblesLatest} dribbles durant tous vos matchs</Text>

</View>
<View style={{flex:1, marginRight:70}}>
<Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{DribblesLatest} Dribbles </Text>
</View>




</View>
<Text style = {{  color: 'orange',
fontSize: 20,
fontWeight: 'bold', marginTop : 15}}>Dribbles effectués</Text>

</View>




<View style={styles.slide3}>

<View style={{flexDirection:"row"}}>
<View style={{flex:1, marginLeft : 1}}>

<MaterialCommunityIcons name ="target" size = {35} style={{height: 50, width: 150,marginLeft : 80}} color = "white"/>

      <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez marqué {ButsLatest} buts durant le dernier match</Text>

</View>
<View style={{flex:0.8, marginRight:70}}>
<Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{ButsLatest} Buts </Text>
</View>




</View>
<Text style = {{  color: 'orange',
fontSize: 20,
fontWeight: 'bold', marginTop : 15}}>Buts marqués</Text>

</View>


<View style={styles.slide1}>
        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>

       <MaterialCommunityIcons name="run-fast" size={30}  style={{height: 50, width: 150,marginLeft : 80}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez fait {AccelerationLatest} accelérations.</Text>

       </View>
       <View style={{flex:2, marginLeft : 15}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{AccelerationLatest} Accelérations </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Accelérations effectuées</Text>

        </View>


 

       
      </Swiper> 

          



                <Button text="" onPress={()=>navigation.navigate('SignInScreen', {
                  stop: ""
                })} />


        </Animatable.View>
      </View>
      </View>
      ): null}

      {recompense ? (
        <View>
      <View style={styles.cardsWrapper}>
        
        <View style={{flexDirection:"row", marginLeft : 20}}>
        <View style={{flex:1}}>
        <Image source = {require('../images/chrono.png')} style={{resizeMode: "contain",height: 41, width: 50,}}></Image>  
            <Text style={{marginLeft : -30,color : 'white', fontSize : 18 }}>Droit au but</Text>
 
 
       
        </View>
        <View style={{flex:1,  marginRight : 15}}  >
          <Image source = {require('../images/ballonfeuu.png')} style={{resizeMode: "contain",height: 41, width: 130, marginRight : 50}}></Image>  
            <Text style={{color : 'white', fontSize : 18, }}>Tir cannon</Text>
 
        </View>

        <View style={{flex:1,  marginRight : 1}}  >
          <Image source = {require('../images/champion.png')} style={{resizeMode: "contain",height: 41, width: 120,}}></Image>  
            <Text style={{color : 'white', fontSize : 18, marginLeft: 17}}>Champion</Text>
 
        </View>
    </View>

    <Text style = {{color : "orange", textAlign : 'center',  marginTop : 20}}>Vos centres favoris : </Text>

    <View style={{flexDirection:"row", marginLeft : 20, marginTop : 20}}>



        <View style={{flex:1}}>
          <TouchableOpacity onPress={() => { navigation.navigate("SearchCentre", {
            infos: CentreIdPref[0],
          });}}>
        <Image source = {require('../images/Centre1.png')} style={{resizeMode: "contain",height: 60, width: 50,}}></Image>  
            <Text style={{color : 'white', fontSize : 18 }}>{CentrePref[0]}</Text>
            </TouchableOpacity>
 
       
        </View>
        <View style={{flex:1,  marginRight : 15}}  >
          <TouchableOpacity onPress={() => { navigation.navigate("SearchCentre", {
            infos: CentreIdPref[1],
          });}}>
          <Image source = {require('../images/Centre2.png')} style={{resizeMode: "contain",height: 60, width: 130, marginRight : 50}}></Image>  
            <Text style={{color : 'white', fontSize : 18, }}>{CentrePref[1]}</Text>
            </TouchableOpacity>
        </View>

        <View style={{flex:1,  marginRight : 1}}  >
        <TouchableOpacity onPress={() => { navigation.navigate("SearchCentre", {
            infos: CentreIdPref[2],
          });}}>

          <Image source = {require('../images/Centre1.png')} style={{resizeMode: "contain",height: 60, width: 120,}}></Image>  
            <Text style={{color : 'white', fontSize : 18, marginLeft: 17}}>{CentrePref[2]}</Text>
 </TouchableOpacity>
        </View>
    </View>

      </View>

      <View style = {{marginTop : 15}}>
        
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: '#1C1C1E'
            }]}
            animation="fadeInUpBig"
        >
           
           <TouchableOpacity  onPress={()=>navigation.navigate('Stats')}>

<Text style={styles.textneww}>Statistiques globales </Text>

</TouchableOpacity>
            <Swiper dot={
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,.3)',
                width: 7,
                height: 7,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: 'orange',
                width: 7,
                height: 7,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          paginationStyle={{
            top: 180,
            color : 'orange'
          }}autoplay = {true} style={styles.wrapper} showsButtons={false} nextButton = {<Text style={styles.nextButton}>›</Text>	} autoplayTimeout = "4" prevButton = {<Text style={styles.prevButton}>‹</Text>	}>
        <View style={styles.slide1}>
        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>

       <MaterialCommunityIcons name="map-marker-distance" size={30}  style={{height: 50, width: 150,marginLeft : 80}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez couru l'équivalent de {NombreTerrains} terrains de Football</Text>

       </View>
       <View style={{flex:1, marginRight:70}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalDistance} mètres </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Distance parcourue</Text>

        </View>
        <View style={styles.slide2}>

        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>

       <MaterialCommunityIcons name="cookie" size={35}  style={{height: 50, width: 150,marginLeft : 80}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez dépensé l'équivalent de {nombreCanette} cannettes de coca ou {nombreMenus} menus fast-food</Text>

       </View>
       <View style={{flex:1, marginRight:70}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalCalories} Calories </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Calories perdues</Text>

        </View>

        <View style={styles.slide3}>

<View style={{flexDirection:"row"}}>
<View style={{flex:1, marginLeft : 1}}>

<Ionicons name ="ios-football" size = {35} style={{height: 50, width: 150,marginLeft : 80}} color = "white"></Ionicons>

      <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez effectué {TotalDribbles} dribbles durant tous vos matchs</Text>

</View>
<View style={{flex:1, marginRight:70}}>
<Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalDribbles} Dribbles </Text>
</View>




</View>
<Text style = {{  color: 'orange',
fontSize: 20,
fontWeight: 'bold', marginTop : 15}}>Dribbles effectués</Text>

</View>




<View style={styles.slide3}>

<View style={{flexDirection:"row"}}>
<View style={{flex:1, marginLeft : 1}}>

<MaterialCommunityIcons name ="target" size = {35} style={{height: 50, width: 150,marginLeft : 80}} color = "white"/>

      <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez marqué {TotalButs} buts durant tous vos matchs</Text>

</View>
<View style={{flex:0.8, marginRight:70}}>
<Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalButs} Buts </Text>
</View>




</View>
<Text style = {{  color: 'orange',
fontSize: 20,
fontWeight: 'bold', marginTop : 15}}>Buts marqués</Text>

</View>


<View style={styles.slide1}>
        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>

       <MaterialCommunityIcons name="run-fast" size={30}  style={{height: 50, width: 150,marginLeft : 80}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez couru l'équivalent de {NombreTerrains} terrains de Football</Text>

       </View>
       <View style={{flex:2, marginLeft : 15}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalAcceleration} Accelérations </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Accelérations effectuées</Text>

        </View>


 

       
      </Swiper> 
          



                <Button text="" onPress={()=>navigation.navigate('SignInScreen', {
                  stop: ""
                })} />


        </Animatable.View>
      </View>

      </View>

): null }





      {sante ? (
        <View>
      <View style={styles.cardsWrapper}>
       
       <View style={{flexDirection:"row", marginBottom : 20}}>
       <View style={{flex:1, marginLeft : 13}}>

       <Image source = {require('../images/cookies.png')} style={{resizeMode: "contain",height: 41, width: 200,}}></Image>  

              <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez dépensé l'équivalent de {nombreCanette} cannettes de coca ou {nombreMenus} menus fast-food</Text>

       </View>
       <View style={{flex:1, marginRight:70}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalCalories} calories </Text>
       </View>

   </View>

   

   

   

      </View>

         
      <View style = {{marginTop : -10}}>
        
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: '#1C1C1E'
            }]}
            animation="fadeInUpBig"
        >
           
           <TouchableOpacity  onPress={()=>navigation.navigate('Stats')}>

<Text style={styles.textneww}>Statistiques globales</Text>

</TouchableOpacity>
            <Swiper dot={
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,.3)',
                width: 7,
                height: 7,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: 'orange',
                width: 7,
                height: 7,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          paginationStyle={{
            top: 180,
            color : 'orange'
          }}autoplay = {true} style={styles.wrapper} showsButtons={false} nextButton = {<Text style={styles.nextButton}>›</Text>	} autoplayTimeout = "4" prevButton = {<Text style={styles.prevButton}>‹</Text>	}>
        <View style={styles.slide1}>
        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>

       <MaterialCommunityIcons name="map-marker-distance" size={30}  style={{height: 50, width: 150,marginLeft : 80}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez couru l'équivalent de {NombreTerrains} terrains de Football</Text>

       </View>
       <View style={{flex:1, marginRight:70}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalDistance} mètres </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Distance parcourue</Text>

        </View>
        <View style={styles.slide2}>

        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>

       <MaterialCommunityIcons name="cookie" size={35}  style={{height: 50, width: 150,marginLeft : 80}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez dépensé l'équivalent de {nombreCanette} cannettes de coca ou {nombreMenus} menus fast-food</Text>

       </View>
       <View style={{flex:1, marginRight:70}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalCalories} Calories </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Calories perdues</Text>

        </View>

        <View style={styles.slide3}>

<View style={{flexDirection:"row"}}>
<View style={{flex:1, marginLeft : 1}}>

<Ionicons name ="ios-football" size = {35} style={{height: 50, width: 150,marginLeft : 80}} color = "white"></Ionicons>

      <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez effectué {TotalDribbles} dribbles durant tous vos matchs</Text>

</View>
<View style={{flex:1, marginRight:70}}>
<Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalDribbles} Dribbles </Text>
</View>




</View>
<Text style = {{  color: 'orange',
fontSize: 20,
fontWeight: 'bold', marginTop : 15}}>Dribbles effectués</Text>

</View>




<View style={styles.slide3}>

<View style={{flexDirection:"row"}}>
<View style={{flex:1, marginLeft : 1}}>

<MaterialCommunityIcons name ="target" size = {35} style={{height: 50, width: 150,marginLeft : 80}} color = "white"/>

      <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez marqué {TotalButs} buts durant tous vos matchs</Text>

</View>
<View style={{flex:0.8, marginRight:70}}>
<Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalButs} Buts </Text>
</View>




</View>
<Text style = {{  color: 'orange',
fontSize: 20,
fontWeight: 'bold', marginTop : 15}}>Buts marqués</Text>

</View>


<View style={styles.slide1}>
        <View style={{flexDirection:"row"}}>
       <View style={{flex:1, marginLeft : 1}}>

       <MaterialCommunityIcons name="run-fast" size={30}  style={{height: 50, width: 150,marginLeft : 80}} color="white" />

              <Text style={ {width:350, textAlign : 'center', marginTop : 15, color : 'white'}}>Vous avez couru l'équivalent de {NombreTerrains} terrains de Football</Text>

       </View>
       <View style={{flex:2, marginLeft : 15}}>
       <Text style={{justifyContent: 'flex-end', color:'white', fontSize :20}}>{TotalAcceleration} Accelérations </Text>
       </View>


      

   </View>
   <Text style = {{  color: 'orange',
    fontSize: 20,
    fontWeight: 'bold', marginTop : 15}}>Accelerations effectuées</Text>

        </View>


 

       
      </Swiper> 
          



                <Button text="" onPress={()=>navigation.navigate('SignInScreen', {
                  stop: ""
                })} />


        </Animatable.View>
      </View>

      </View>

): null }

     




   
      
    </ScrollView>
  );

              }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25282d"
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
    justifyContent: 'center',
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
    backgroundColor: 'orange' /* '#FF6347' */,
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
});