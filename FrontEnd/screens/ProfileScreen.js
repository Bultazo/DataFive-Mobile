import React, {useState, useContext} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
//Page représentant la page profil de l'application
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from "./Provider";

const ProfileScreen = ({navigation}) => {

const { user, setUser } = useContext(AuthContext);

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
if (m <0 ||( m === 0 && dd < days)) {
  age--;
}

return (

        <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image 
              source={{
                uri: user.image,
              }}
              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop:15,
                marginBottom: 5,
              }]}>{user.name} {user.firstname}</Title>
              <Caption style={styles.caption}>@{user.pseudo}</Caption>
            </View>
          </View>
        </View>
  
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="human-male-height-variant" color="#777777" size={20}/>
            <Text style={{color:"#fff", marginLeft: 20}}>{user.size} cm</Text>
          </View>
          <View style={styles.row}>
            <Icon name="weight-gram" color="#777777" size={20}/>
            <Text style={{color:"#fff", marginLeft: 20}}>{user.weight} Kg</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20}/>
            <Text style={{color:"#fff", marginLeft: 20}}>{user.email}</Text>
          </View>

          <View style={styles.row}>
            <Icon name="face-agent" color="#777777" size={20}/>
            <Text style={{color:"#fff", marginLeft: 20}}>{age} ans</Text>
          </View>
        </View>
  
       { /*<View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox, {
              borderRightColor: '#dddddd',
              borderRightWidth: 1
            }]}>
              <Title>₹140.50</Title>
              <Caption>Wallet</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title>12</Title>
              <Caption>Matchs</Caption>
            </View>
        </View>
        */}
        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="heart-outline" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Your Favorites</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Payment</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={()=>{}}>
            <View style={styles.menuItem}>
              <Icon name="share-outline" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Tell Your Friends</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {navigation.navigate("Settings")}}>
            <View style={styles.menuItem}>
              <Icon name="settings-outline" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Paramètres</Text>
            </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
    );
};

export default ProfileScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop : 0,
      backgroundColor: '#25282d'
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color : '#fff'
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
      color : '#fff'

    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
  });
