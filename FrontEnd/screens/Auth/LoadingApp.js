import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,KeyboardAvoidingView
} from 'react-native';


//Cette page représente le chargement de l'application (c'est la premiere annimation de la page qui ensuite renvoie vers le splash screen)



import {Actions} from 'react-native-router-flux';

/* Logo */
import Logo from '../../images/ouai.png';
import Login from './Login';

const switchToAuth = () => {
  Actions.replace('auth')
};

class LoadinApp extends Component {
  static navigationOptions = {
    header:null, 
  }
  state = {
    LogoAnime: new Animated.Value(0),
    LogoText: new Animated.Value(0),
    loadingSpinner: false,
  };

  componentDidMount() {
    const {LogoAnime, LogoText} = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
      }).start(),
     

      Animated.timing(LogoText,{
        toValue: 1,
        duration: 4000,
        
      }),
    ]).start(() => {
      
      this.setState({
        loadingSpinner: true, 
      })
      this.props.navigation.navigate("SplashScreen", {
        stop : ""
      })
      ;
      setTimeout(switchToAuth, 1500);
    }); 
  }

  

  render() {
    return (
      <View style={styles.container}>  
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            top: this.state.LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <Image source={Logo} />

          {this.state.loadingSpinner ? (
            <ActivityIndicator
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                
                alignItems: 'center',
                justifyContent: 'center',
              }}
              size="large"
              color="#5257f2"
            />
          ) : null}
        </Animated.View>
        <Animated.View style={{opacity: this.state.LogoText}}>
          <Text style={styles.logoText}> DataFive </Text>
        </Animated.View>
      </View>
    );
  }
}

export default LoadinApp;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    color: 'orange',
    fontSize: 30,
    marginTop: 29.1,
    fontWeight: '300',
  },
});