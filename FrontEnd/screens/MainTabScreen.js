import React, {useState, useContext} from 'react';
import { useRoute } from "@react-navigation/native";
import { Text, Button } from "react-native-paper";

import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "./Provider";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';

import * as SecureStore from "expo-secure-store";

import StatsScreen from "./StatsScreen"

import DetailsScreen from "./DetailsScreen";
import HomeScreen from "./HomeScreen";
import ExploreScreen from "./ExploreScreen";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import AddMatchScreen from "./AddMatchScreen";
import SearchMatchScreen from "./SearchMatchScreen"
import Settings from "./Settings";
import {View} from "react-native"
import ViewStatsScreen from "./ViewStatsScreen"

import CentresScreen from "./CentresScreen"
import SearchCentresScreen from "./SearchCentresScreen"

import AwesomeAlert from "react-native-awesome-alerts";
import { TouchableOpacity } from 'react-native-gesture-handler';




const Tab = createMaterialBottomTabNavigator();

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfilStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const CentresStack = createStackNavigator();
const StatsStack = createStackNavigator();


var stop = false;



//Cette page représente la page qui gere la navigation dans l'application avec les différentes pages
//tel que home, matchs, centres, profil et stats mais aussi les pages qui sont issus d'autres pages tel que Profil et Edit Profil 
function MainTabScreen({ navigation }) {


 const getToken = () => {
   return SecureStore.getItemAsync("secure_token");
 };


 getToken(stop).then((token) => {


   if (token == null) {
     
     stop = true;
      console.log("In the Get Token : ", stop);
      navigation.navigate("SignInScreen", {
        stop : stop
      });

   }else {
    stop = false;
     console.log("In the else :" ,stop )
   }

   return stop;


 });

 getToken(stop);
 



  const route = useRoute(); 
  const token = route.params.token;
  const email = route.params.email;
  console.log(token, email);

  


  if(stop == false) {
    return (
    
      <Tab.Navigator initialRouteName="Home" activeColor="#fff">
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: "Home",
            tabBarColor: "orange",
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home" color={color} size={26} />
            ),
          }}
        />


        <Tab.Screen
          name="Matchs"
          component={DetailsStackScreen}
          options={{
            tabBarLabel: "Matchs",
            tabBarColor: "#FF8C00",
  
            tabBarIcon: ({ color }) => (
              <Icon name="ios-football" color={color} size={26} />
            ),
          }}
        />


        <Tab.Screen
          name="Centres"
          component={CentresStackScreen}
          options={{
            tabBarLabel: "Centres",
            tabBarColor: "#FF4500",
  
            tabBarIcon: ({ color }) => (
              <Icons name="pokeball" color={color} size={26} />
            ),
          }}
        />


<Tab.Screen
          name="Stats"
          component={StatsStackScreen}
          options={{
            tabBarLabel: "Stats",
            tabBarColor: "#FF6347",
  
            tabBarIcon: ({ color }) => (
              <Icons name="chart-line" color={color} size={26} />
            ),
          }}
        />



<Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: "Profil",
            tabBarColor: "#FF7F50",
  
            tabBarIcon: ({ color }) => (
              <Icon name="ios-person" color={color} size={26} />
            ),
          }}
        />







      </Tab.Navigator>
    );

  } else if (stop == true ) {
    return (
      <Text style={{ 
        textAlign: 'center',
       }}>Pas d'acces</Text>
      

      
    );
  }
  
}

const HomeStackScreen = ({ navigation }) => {
  // Check it with variable stats //popup persistent 

 
  const { user, setUser } = useContext(AuthContext);

  if (user == null) {
    return (
      <HomeStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "orange",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerTitleAlign: "center",
            headerLeft: () => (
              <View style={{marginLeft:10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="orange"
                onPress={() => {
                  navigation.openDrawer();
                }} 
              />
              </View>
            ),
            headerRight: () => (
  
              <Avatar.Image 
              source={{
                
              }}
              size={30}
            />
  
            ),
          }}
        />
  
        
  
      </HomeStack.Navigator>
    );

  } else {

    return (
      <HomeStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "orange",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerTitleAlign: "center",
            headerLeft: () => (
              <View style={{marginLeft:10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="orange"
                onPress={() => {
                  navigation.openDrawer();
                }} 
              />
              </View>
            ),
            headerRight: () => (
              
                <View style={{flexDirection: 'row', marginRight:10}}>



<Icon.Button name="ios-settings" size={25}  backgroundColor="orange"
 color="#333" size={25} onPress={() => navigation.navigate("Settingss")}
 />




                <TouchableOpacity style={{paddingHorizontal: 10, marginTop: 3}} onPress={() => {navigation.navigate("Profile");
}}> 

              <Avatar.Image 
              source={{
                uri: user.image,
              }}
              size={33}
            />
            </TouchableOpacity>
  
  </View>
            ),

          }

        }
        />

<HomeStack.Screen 

name="SearchMatch"
options={{
  title: "Réservation",
  headerTitleAlign: "center",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#FF8C00",
  },


}}
component={SearchMatchScreen}




/>
  
<CentresStack.Screen
      name="SearchCentre"
      options={{
        title: "Réservation",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#FF6347",
        },


      }}
      component={SearchCentresScreen}
    />


      
<SettingsStack.Screen 

name="Settingss"
options={{
  title: "Paramètres",
  headerTitleAlign: "center",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "orange",
  },


}}
component={Settings}




/>

        
  
      </HomeStack.Navigator>
    );
  }
    
 
     
  



};


  // Check it with variable stats //popup persistent 

 


  
const SettingsStackScreen = ({ navigation }) => {
  // Check it with variable stats //popup persistent 

 

    
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#009387",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => {
                navigation.openDrawer();
              }}
            ></Icon.Button>
          ),
        }}
      />

      

    </SettingsStack.Navigator>
  );
     
  



};



const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#FF8C00",
        shadowColor: "#fff", //IOS
        elevation: 0, //Android
      },
      headerTintColor: "#fff",
      alignItems: "center",

      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <DetailsStack.Screen
      name="Matchs"
      component={DetailsScreen}
      options={{
        title: "Matchs",
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#FF8C00"
            onPress={() => {
              navigation.openDrawer();
            }}
          ></Icon.Button>
        ),

        headerRight: () => (
          <MaterialCommunityIcons.Button
            name="plus"
            size={25}
            backgroundColor="#FF8C00"
            color="#fff"
            onPress={() => {
              navigation.navigate("AddMatch");
            }}
          />


          
        ),
      }}
    />

    

<DetailsStack.Screen 

name="AddMatch"
options={{
  title: "Ajout/Joindre un Match",
  headerTitleAlign: "center",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#FF8C00",
  },


}}
component={AddMatchScreen}




/>

<DetailsStack.Screen 

name="SearchMatch"
options={{
  title: "Réservation",
  headerTitleAlign: "center",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#FF8C00",
  },


}}
component={SearchMatchScreen}




/>

<SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => {
                navigation.openDrawer();
              }}
            ></Icon.Button>
          ),
        }}
      />

  </DetailsStack.Navigator>


);

const ProfileStackScreen = ({ navigation }) => (
  <ProfilStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#FF7F50",
        shadowColor: "#fff", //IOS
        elevation: 0, //Android
      },
      headerTintColor: "#000",
      alignItems: "center",

      /*headerTitleStyle: {
        fontWeight: 'bold',
      }*/
    }}
  >
    <ProfilStack.Screen
      name="Profil"
      component={ProfileScreen}
      options={{
        title: "Profil",
        headerTintColor: "white",

        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#FF7F50"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}
          ></Icon.Button>
        ),

        headerRight: () => (
          <MaterialCommunityIcons.Button
            name="account-edit"
            size={25}
            backgroundColor="#FF7F50"
            color="#fff"
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          />
        ),
      }}
    />

    <ProfilStack.Screen
      name="EditProfile"
      options={{
        title: "Modifier votre profil",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#FF7F50",
        },


      }}
      component={EditProfileScreen}
    />

<SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Paramètres",
          headerTitleAlign: "center",
          headerTintColor: "white",

       
        }}
      />



  </ProfilStack.Navigator>
);



const StatsStackScreen = ({ navigation }) => (
  <StatsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#FF6347",
        shadowColor: "#fff", //IOS
        elevation: 0, //Android
      },
      headerTintColor: "#000",
      alignItems: "center",

      /*headerTitleStyle: {
        fontWeight: 'bold',
      }*/
    }}
  >
    <StatsStack.Screen
      name="Stats"
      component={StatsScreen}
      options={{
        title: "Statistiques",
        headerTintColor: "white",

        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#FF6347"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}
          ></Icon.Button>
        ),

       
      }}
    />


<StatsStack.Screen
      name="Statistiques"
      options={{
        title: "Visualisation des stats",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#FF6347",
        },


      }}
      component={ViewStatsScreen}
    />





  </StatsStack.Navigator>
);




const CentresStackScreen = ({ navigation }) => (
  <CentresStack.Navigator
    screenOptions={{
      headerStyle: {
        
        backgroundColor: "#FF4500",
        shadowColor: "#fff", //IOS
        elevation: 0, //Android
      },
      headerTintColor: "#000",
      alignItems: "center",

      /*headerTitleStyle: {
        fontWeight: 'bold',
      }*/
    }}
  >
    <CentresStack.Screen
      name="Centres"
      component={CentresScreen}
      options={{
        title: "Centres",
        headerTintColor: "white",

        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#FF4500"
            color="#fff"
            onPress={() => {
              navigation.openDrawer();
            }}
          ></Icon.Button>
        ),

       
      }}
    />



<CentresStack.Screen
      name="SearchCentre"
      options={{
        title: "Réservation",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#FF6347",
        },


      }}
      component={SearchCentresScreen}
    />


    
  </CentresStack.Navigator>
);




export default MainTabScreen;
