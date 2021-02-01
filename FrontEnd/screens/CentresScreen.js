import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar, View, Text, Button, List, FlatList, TouchableOpacity,RefreshControl } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import axios from "axios";

import { ListItem, Avatar } from 'react-native-elements'
import { LogBox } from 'react-native';




//Cette page représente la page des centres dans la navigation de lappli
const CentresScreen = ({navigation}) => {


  LogBox.ignoreAllLogs();
    const [Centres, SetCentres] = useState([]);
    const [NewArray, SetNewArray] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      if (NewArray.length < 10000) { 
            axios.post("http://192.168.43.17:3002/centres", {
          }).then((response) => {
            SetCentres(response.data.data)
            setRefreshing(false)
          }).then(error => console.log(error))
      }
      else{
        ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
        setRefreshing(false)
      }
    }, [refreshing]);


    useEffect(() => {

        axios.post("http://192.168.43.17:3002/centres" , {


        }).then((response) => {
            console.log(response.data.data);
            const Mycentres = Object.values(response.data.data)

            const LesCentres = Object.values(Mycentres);

            console.log(LesCentres)

            SetCentres(response.data.data)
          }).then(error => console.log(error))

    }, [])


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
    console.log(Centres)


    return(

      
        <View style={styles.container}>

        
<SafeAreaView>

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
            NewArray.splice(0, NewArray.length);
        }
        NewArray.push({key : element.name + " " + element.adress + " " + element.city + " " + element.postal_code, value: element.id})
    })
}



      <FlatList
        data={NewArray}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (



          
          <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("SearchCentre", {
            infos: item.value,
          });}} >
            <Text style={{marginTop:12, color : 'white'}} >-{item.key}</Text>
            </TouchableOpacity>
          )}
      />

</SafeAreaView>
        </View>
    )
}

export default CentresScreen;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#25282d',

    },
    button: {
      alignItems: "center",
      backgroundColor: "#1F1B1A",
      padding: 10,
      width : 400,
      height: 80,
      marginTop: 15,
      borderRadius : 20,
      textAlign : 'center',
      alignContent: 'center',
      alignItems : 'center'
    },
})