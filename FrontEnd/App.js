import * as React from "react";
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
  Button,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { IconButton, Colors } from "react-native-paper";
import { AuthProvider } from "./screens/Provider";

import DetailsScreen from "./screens/DetailsScreen";
import HomeScreen from "./screens/HomeScreen";
import LoadingApp from "./screens/Auth/LoadingApp";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import CompleteInfo from "./screens/Auth/CompleteInfo";
import MainTabScreen from "./screens/MainTabScreen";
import Settings from "./screens/Settings";
import ImagePicker from './screens/ImagePicker';
import EditProfilScreen from './screens/EditProfileScreen'
import Profil from './screens/ProfileScreen'
import SearchMatchScreen from './screens/SearchMatchScreen'

import { DrawerContent } from "./screens/DrawerContent";
import Complete from "./screens/Auth/CompleteInfo";

import SignInScreen from "./screens/Auth/SignInScreen";
import SignupScreen from "./screens/Auth/SignupScreen";
import SplashScreen from "./screens/Auth/SplashScreen";
import CentresScreen from "./screens/CentresScreen"


//Le App.js représente simplment le routeur de l'application en declarant les pages existantes de l'application ici

import * as SecureStore from "expo-secure-store";
/*
const getToken = () => {
  return SecureStore.getItemAsync("secure_token");
};
<Stack.Screen name="Edit" component={EditProfilScreen} />

getToken().then((token) => console.log("front App Token" + token));*/

import RootStackScreen from './screens/RootStackScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
      <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >




          <Stack.Screen name="LoadingApp" component={LoadingApp} />

          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
      
      swipeEnabled: false, // to disable swipe gesture for a specific page(s)
  }}/>

          <Stack.Screen name="SignInScreen" component={SignInScreen} options={{
      
      swipeEnabled: false, drawerContent: false// to disable swipe gesture for a specific page(s)
  }}/>
         <Stack.Screen name="SignUpScreen" component={SignupScreen} options={{
     
     swipeEnabled: false, // to disable swipe gesture for a specific page(s)
 }}  />

<Stack.Screen name="CompleteInfo" component={Complete} options={{
     
     swipeEnabled: false, // to disable swipe gesture for a specific page(s)
 }}  />


<Stack.Screen name="SearchMatch" component={SearchMatchScreen} options={{
     
     swipeEnabled: false, // to disable swipe gesture for a specific page(s)
 }}  />






         
   
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="Profil" component={Profil} />
          <Drawer.Screen name="Login" component={Login} />

          <Drawer.Screen name="CentresScreen" component={CentresScreen} />



          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Drawer" component={DrawerContent} />
        </Drawer.Navigator>
      

      
      </NavigationContainer>
    </AuthProvider>
  );
 

};

export default App;
