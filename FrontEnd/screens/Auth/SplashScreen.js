import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image, TouchableHighlight, ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';

const Button = ({ text, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.test}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };
  
  //cette page représente la page qui vient juste avant le login et register mais celle apres le Loading.js


const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='black' barStyle="light-content"/>
        <View style={styles.header}>
          <ImageBackground style= {styles.backimage} source = {require('../../images/bonom.png')}>
          
</ImageBackground>
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: 'orange'
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Mesure ta performance !</Text>
            <Text style={styles.text}>Connecte toi avec ton compte !</Text>
          



                <Button text="Connexion" onPress={()=>navigation.navigate('SignInScreen', {
                  stop: ""
                })} />


        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'black'
  },
  backimage: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 200,
    backgroundColor: "rgba(0,0,0, 0.60)",
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: 'orange',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'black',
      marginTop:5
  },

  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },

  test: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 50,
    height:50,
    width:150,
    marginLeft:210
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});