import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar, View, Text, Button, List, FlatList, TouchableOpacity, RefreshControl, TextInput} from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import { AuthContext } from "./Provider";


import { ListItem, Avatar } from 'react-native-elements'

//Page des statistiques


const StatsScreen = ({navigation}) => {


    const { user, setUser } = useContext(AuthContext);

    


    console.log(user.id)




    useEffect(() => {

     

                
      
      
        }, [] )

       

    return(

      
        <View style={styles.container}>
<SafeAreaView>

  


<View>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1, marginTop : 40}}>
                        <TouchableOpacity style = {{justifyContent: 'flex-start'}} onPress={()=>navigation.navigate('Statistiques', {
                  Variable: "Acceleration"
                })} >


<View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="run-fast"
                    size={60}
                    color="white"
                  />
       <Text style = {{color : "white", textAlign : "center", marginTop : 10}}>Accélération</Text>

                </View>


                </TouchableOpacity>

                    </View>
                    <View style={{flex:1, marginTop : 40}}>
                    <TouchableOpacity style={{justifyContent: 'flex-end'}}  onPress={()=>navigation.navigate('Statistiques', {
                  Variable: "Distance"
                })}>


<View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="map-marker-distance"
                    size={60}
                    color="white"
                  />
 <Text style = {{color : "white", textAlign : "center",marginTop : 10}}>Distance parcourue</Text>

                </View>


                </TouchableOpacity>

                    </View>
                </View>
            </View>


            <View>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1, marginTop : 40}}>
                        <TouchableOpacity style = {{justifyContent: 'flex-start'}}  onPress={()=>navigation.navigate('Statistiques', {
                  Variable: "Dribbles"
                })}>


<View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="soccer"
                    size={60}
                    color="white"
                  />
   <Text style = {{color : "white", textAlign : "center", marginTop : 10}}>Dribbles</Text>

                </View>


                </TouchableOpacity>

                    </View>
                    <View style={{flex:1, marginTop : 40}}>
                    <TouchableOpacity style={{justifyContent: 'flex-end'}}  onPress={()=>navigation.navigate('Statistiques', {
                  Variable: "Calories"
                })} >


<View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="cookie"
                    size={60}
                    color="white"
                  />
 <Text style = {{color : "white", textAlign : "center", marginTop : 10}}>Calories</Text>

                </View>


                </TouchableOpacity>

                    </View>
                </View>
            </View>




            <View>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1, marginTop : 40}}>
                        <TouchableOpacity style = {{justifyContent: 'flex-start'}}  onPress={()=>navigation.navigate('Statistiques', {
                  Variable: "Classement"
                })}>


<View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="trophy"
                    size={60}
                    color="white"
                  />
   <Text style = {{color : "white", textAlign : "center", marginTop : 10}}>Classement</Text>

                </View>


                </TouchableOpacity>

                    </View>
                    <View style={{flex:1, marginTop : 40}}>
                    <TouchableOpacity style={{justifyContent: 'flex-end'}}>


<View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="cookie"
                    size={60}
                    color="white"
                  />
 <Text style = {{color : "white", textAlign : "center", marginTop : 10}}>Status</Text>

                </View>


                </TouchableOpacity>

                    </View>
                </View>
            </View>









      

</SafeAreaView>
  
    
        </View>
    )
}

export default StatsScreen;

const styles = StyleSheet.create({
    container: {
        flex : 1,
       
        backgroundColor: '#25282d'

    },
    button: {
      backgroundColor: "#1F1B1A",
      padding: 10,
      width : 400,
      height: 90,
      marginTop: 15,
      borderRadius : 20,
      textAlign : 'center',
    
    },

    SquareShapeVieww: {

        width: 150,
        height: 140,
        backgroundColor: '#100F0E',
        marginTop : 60, 
        marginLeft : 240,
        opacity : 1,
        borderRadius: 20
      },

      SquareShapeView: {

        width: 150,
        height: 140,
        backgroundColor: '#100F0E',
        marginLeft : 20,
        opacity : 1,
        borderRadius: 20,
        marginTop : -540
      },

      categoryIcon: {
        borderWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: 135,
        height: 135,
        backgroundColor: "#100F0E" /* '#FF6347' */,
        borderRadius: 20,
        marginTop : 15
      },
})