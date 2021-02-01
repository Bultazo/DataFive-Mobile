import React from "react";
import { useContext, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "./Provider";

import * as SecureStore from "expo-secure-store";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { color } from "react-native-reanimated";
import { createPortal } from "react-dom";

export function DrawerContent({ navigation }, props) {
  const { user, setUser } = useContext(AuthContext);


  //Cette page représente le menu déroulant sur le coté de l'application




  if (SecureStore.getItemAsync('secure_token') == null) {
    console.log("Erreur");
    SecureStore.deleteItemAsync('secure_token')
     navigation.navigate("SignInScreen")
  }

  const getToken = () => {
    return SecureStore.getItemAsync('secure_token');
}

getToken().then(token=> console.log("My token "+ token));    




  const logout = (e) => {
    e.preventDefault();
    
    SecureStore.deleteItemAsync('secure_token').then(()=> {
        navigation.navigate("SignInScreen");
    })
         
  };

  if (user == null) {
    console.log("Vous devez vous recconecter !");
    user==null
  } else {
    console.log("It's Ok");
  }

  if (user == null) {

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ marginTop: 15, flexDirection: "row" }}>
              <Avatar.Image
                source={require("../images/boy.png")} //il faut mettre limage de notre user
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
  <Title style={styles.title}> </Title>
                {/* ICI dans le Titile on ajoute le nom et le prenom de la personne connecté ! */}
  <Caption style={styles.caption}></Caption>
              </View>
            </View>

            <View style={styles.row}></View>

            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="ios-home" color={color} size={size} />
                )}
                label="Home"
                onPress={() => {
                  navigation.navigate("Home");
                }}
                //ICI on ajoute la fonction de deconnexion qui nous redirige vers le login
              />

              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="ios-person" color={color} size={size} />
                )}
                label="Profil"
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              />

              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="ios-settings" color={color} size={size} />
                )}
                label="Paramètres"
                onPress={() => {
                  navigation.navigate("Settings");
                }}
              />

              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="ios-calendar" color={color} size={size} />
                )}
                label="Mes Packs Data5"
                onPress={() => {}}
              />
            </Drawer.Section>

            <Drawer.Section title="Preferences"></Drawer.Section>
          </View>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="md-exit" color={color} size={size} />
          )}
          label="Déconnexion"
          onPress={(e) => logout(e)}
          //ICI on ajoute la fonction de deconnexion qui nous redirige vers le login
        />
      </Drawer.Section>
    </View>
  );
}
else {

  
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ marginTop: 15, flexDirection: "row" }}>
              <Avatar.Image
                source={{
                  uri: user.image,
                }}  //il faut mettre limage de notre user
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
  <Title style={styles.title}>{user.name} {user.firstname}</Title>
                {/* ICI dans le Titile on ajoute le nom et le prenom de la personne connecté ! */}
              <Caption style={styles.caption}>@{user.pseudo}</Caption>
              </View>
            </View>

            <View style={styles.row}></View>

            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="ios-home" color={color} size={size} />
                )}
                label="Home"
                onPress={() => {
                  navigation.navigate("Home");
                }}
                //ICI on ajoute la fonction de deconnexion qui nous redirige vers le login
              />

              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="ios-person" color={color} size={size} />
                )}
                label="Profil"
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              />

<DrawerItem
                icon={({ color, size }) => (
                  <Icons name="pokeball" color={color} size={size} />
                )}
                label="Centres"
                onPress={() => {
                  navigation.navigate("Centres");
                }}
              />

<DrawerItem
                icon={({ color, size }) => (
                  <Icons name="chart-line" color={color} size={size} />
                )}
                label="Statistiques"
                onPress={() => {
                  navigation.navigate("Stats");
                }}
              />

              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="ios-settings" color={color} size={size} />
                )}
                label="Paramètres"
                onPress={() => {
                  navigation.navigate("Settings");
                }}
              />




              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="ios-calendar" color={color} size={size} />
                )}
                label="Mes Packs Data5"
                onPress={() => {}}
              />
            </Drawer.Section>

            <Drawer.Section title="Preferences"></Drawer.Section>
          </View>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="md-exit" color={color} size={size} />
          )}
          label="Déconnexion"
          onPress={(e) => logout(e)}
          //ICI on ajoute la fonction de deconnexion qui nous redirige vers le login
        />
      </Drawer.Section>
    </View>
  );
  
}
} 

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },

  userInfoSection: {
    paddingLeft: 20,

  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },

  caption: {
    fontSize: 14,
    lineHeight: 14,
    
  },

  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    
  },

  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
    
  },

  drawerSection: {
    marginTop: 15,
    
  },

  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    
  },

  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
