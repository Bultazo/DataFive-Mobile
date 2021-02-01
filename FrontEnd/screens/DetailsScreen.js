import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar, View, Text, Button, List, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import axios from "axios";


import { AuthContext } from "./Provider";


import { ListItem, Avatar } from 'react-native-elements'


//Ce screen représente la page des matchs dans la navigation de la meme maniere que celle des centres

const DetailsScreen = ({navigation}) => {

    const [Matchs, SetMatchs] = useState([]);
    const [NewArray, SetNewArray] = useState([]);

    const [refreshing, setRefreshing] = useState(false);





    const { user, setUser } = useContext(AuthContext);


    console.log(user.id)


    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      if (NewArray.length < 1000) { 
            axios.post("http://192.168.43.17:3002/GetMatchs", {
            id_user : user.id
          }).then((response) => {
            SetMatchs(response.data.data)
            setRefreshing(false)
          }).then(error => console.log(error))
      }
      else{
        ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
        setRefreshing(false)
      }
    }, [refreshing]); 


    useEffect(() => {

      
      
      axios.post("http://192.168.43.17:3002/GetMatchs", {
        id_user : user.id
      }).then((response) => {
    
        const NewData = Object.values(response.data.data);
        console.log(NewData)

            SetMatchs(response.data.data)
    
              }).then(error => console.log(error))



    
    
          // Set the count variable value to Zero.



                
      
      
        }, [] )

        const SearchMatchs = (text) => {

          axios.post("http://192.168.43.17:3002/SearchMatchs" , {
  
          text: text,
          id_user : user.id

  
          }).then((response) => {
              console.log("cest les Matchs que je cherche !")
              console.log(response.data.data);
              const MyMatchs = Object.values(response.data.data)
  
              const LesMatchs = Object.values(MyMatchs);
  
              console.log(LesMatchs)
  
              SetMatchs(response.data.data)
            }).then(error => console.log(error))
          
      }
      console.log(Matchs)

    return(

      
        <View style={styles.container}>
<SafeAreaView>

            
      <SearchBar style={{marginTop:10}}
  placeholder="Chercher un match"
  onChangeText={text => {
    SearchMatchs(text)
  }}
  onPressCancel={() => {
    this.filterList("");
  }}
  onPress={() => alert("onPress")}
/>



{
    Matchs.forEach(function (element, index) {
        if (index == 0) {
            NewArray.splice(0, NewArray.length);
        }
        NewArray.push({key :  element.date, scoreA :  element.score_A , scoreB : element.score_B, codeMatch: element.pseudo_match, StartTime: element.hour, Creator: element.created_by, FinTime: element.hour_end, idCentre : element.id_centre, idMatch : element.id })

    })
}



      <FlatList
        data={NewArray}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (

 

          
          <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("SearchMatch", {
            codeMatch: item.codeMatch,
            MyDate : item.key,
            StartTime : item.StartTime,
            Creator : item.Creator,
            FinTime : item.FinTime,
            idCentre: item.idCentre,
            id_match : item.idMatch,
            ScoreA : item.scoreA,
            ScoreB : item.scoreB
          });}}  >

<View style={{flexDirection:"row"}}>
                    <View style={{flex : 0.75}}>
                      <Text style={{justifyContent:"flex-start", marginTop:40, color :'white', marginLeft : 15}}>Equipe 1</Text>
                    </View>
                    <View style={{flex:1}}>
                    <Text style={{ color : '#D6E33D', marginLeft : 30, justifyContent : 'flex-end'}} >{item.key}</Text>

         <Text style={{ color : '#28CE9E', fontSize : 35, justifyContent : 'flex-end'}} > {item.scoreA} - <Text style={{ color : '#28CE9E'}}>{item.scoreB}</Text>  </Text>  

                    </View>
                    <View style={{flex : 0.6}}>
                      <Text style={{justifyContent:"flex-end", marginTop:40, color :'white', marginLeft : 15}}>Equipe 2</Text>
                    </View>

                   
                </View>
            

           
            </TouchableOpacity>
          )}
      />

</SafeAreaView>
  
    
        </View>
    )
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
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
})