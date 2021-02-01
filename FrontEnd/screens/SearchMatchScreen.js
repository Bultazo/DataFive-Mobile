import React, { useState, useContext, useEffect, version } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Animated
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  RadioButton,
} from "react-native-paper";
import { Input } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Spinner from 'react-native-loading-spinner-overlay';

import AnimatedSplash from "react-native-animated-splash-screen";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import AwesomeAlert from "react-native-awesome-alerts";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "./Provider";
import axios from "axios";
import AddMatchScreen from "./AddMatchScreen";



import FontAwesome from "react-native-vector-icons/FontAwesome";

import { LogBox } from "react-native";
import * as Progress from "react-native-progress";

import ProgressBar from "react-native-progress/Bar";

import ProgressCircle from "react-native-progress-circle";


//Cette page représente la page liés au matchs : 

/*

Elle permet de Rejoindre un match SI ce dernier dépasse la date d'aujourd'hui 
Elle permet aussi de quitter un match apres l'avoir rejoint, cependant si c'est le createur du match qui quitte ce dernier, ALORS la reservation sera supprimé !
Elle permet aussi au createur de renseigner le score du match apres que celui ci depasse la date de réservation !
Et enfin elle permet de visualiser les statistiques du joueur connecté 


*/
const ApButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.apButtonContainer}>
    <Text style={styles.apButtonText}>{title}</Text>
  </TouchableOpacity>
);

const SearchMatchScreen = ({ route, navigation, replace }) => {
  const { user, setUser } = useContext(AuthContext);

  LogBox.ignoreAllLogs();







  const [Visible, SetVisible] = useState(false)
  const [Loading, SetLoading] = useState(false)

  const [Moyenne, SetMoyenne] = useState([10,20,40,60,5,54,22]);
  

  const [scoreEkipA, SetScoreA] = useState("");
  const [scoreEkipB, SetScoreB] = useState("");

  const [NewModel, SetNewModel] = useState(false);
  const [newSuccess, SetNewSuccess] = useState("");
  const [ValidModel, SetValidModel] = useState(false);

  const [NonvalidScore, setNonValidScore] = useState("");
  const [nonValidModel, SetNonValidModel] = useState("");
  const [TableauTest, SetTableauTest] = useState([39, 45, 72, 20, 42, 15]);

  const [ShowGraph, SetShowGraph] = useState(true);
  const [Distance, SetDistance] = useState(false);
  const [Calories, SetCalories] = useState(false);
  const [ShowInteret, SetShowInteret] = useState(false);
  const [IntervalTime, SetIntervalTime] = useState([]);


  const [nmbCalories, SetNombreCalories] = useState("");
  const [nmbmettre, Setnmbmetre] = useState("");

  const [Team, SetTeam] = useState("");

  const code_du_Match = route.params;
  const Code = Object.values(code_du_Match);

  const CodeMatch = Code[0];

  const MaDate = Code[1];
  const StartTime = Code[2];
  const Creator = Code[3];
  const FinTime = Code[4];
  const NameCentres = Code[5];
  const id_match = Code[6];

  const ScoreA = Code[7];
  const ScoreB = Code[8];




  var DateOfTheDay = new Date();
  var d = String(DateOfTheDay.getDate()).padStart(2, "0");
  var m = String(DateOfTheDay.getMonth() + 1).padStart(2, "0"); //January is 0!
  var y = DateOfTheDay.getFullYear();
  DateOfTheDay = y + "-" + m + "-" + d;

  const [UserArray, setUserArray] = useState([]);

  const [UsersStats, SetUsersStat] = useState([]);

  const [NewArray, SetNewArray] = useState([]);

  const [VraiCentre, SetVraiCentre] = useState("");

  const [EkipArray, SetEkipArray] = useState([]);
  const [AnotherArray, SetAnotherArray] = useState([]);

  const [checked, setChecked] = React.useState(1);

  const [ShowModel, SetShowModel] = useState(false);
  const [SuccessMessage, SetSuccessMessage] = useState("");

  const [IsShowModel, SetIsShowModel] = useState(false);
  const [ErrorMessage, SetErrorMessage] = useState("");

  const [Model, SetModel] = useState(false);

  const [ErrMsg, SetErrMsg] = useState("");

  const [Result, SetResult] = useState("Defaite");

  const [Errormsg, SetErrormsg] = useState("");
  const [LeModel, SetLeModel] = useState(false);
  const [MyCreator, SetMyCreator] = useState("");

  const [Interet, SetInteret] = useState([]);

  const [Autorisation, SetAutorisation] = useState("true");

  const [ArrayJsonValue, SetArrayJsonValue] = useState([0, 0, 0, 0, 0, 0]);

 

 
  const screenWidth = Dimensions.get("window").width;

  //BON ici on devra recup les equipes de chaque joueurs, faut revoir la requete de GetPlayers !
  useEffect(() => {
    axios
      .post("http://192.168.43.17:3002/GetPlayers", {
        pseudo_match: CodeMatch,
      })
      .then((response) => {
        console.log("My Users !");
        console.log(response.data.data);
        const MyUsers = Object.values(response.data.data);
        console.log(MyUsers);

        setUserArray(MyUsers);

        const MyEkip = Object.values(response.data.data2);

        SetEkipArray(MyEkip);

        const Team = Object.values(response.data.ekip);
        SetTeam(Team[0].key);

        //Cest le createur pcq quand jenvoie depuis la page des matchs jpp pcq le createur est en nombre
        const LeCreateur = Object.values(response.data.MyCreator);

        SetMyCreator(LeCreateur[0].pseudo);
      })
      .then((error) => console.log(error));

    axios
      .post("http://192.168.43.17:3002/GetCentres", {
        id_centre: NameCentres,
      })
      .then((response) => {
        const MyUsers = Object.values(response.data.data);
        const LesCentres = Object.values(MyUsers[0]);

        SetVraiCentre(
          LesCentres[1] +
            " " +
            LesCentres[2] +
            " " +
            LesCentres[3] +
            " " +
            LesCentres[4]
        );
      })
      .then((error) => console.log(error));

    axios
      .post("http://192.168.43.17:3002/VerifyUser", {
        id: user.id,
        id_match: id_match,
      })
      .then((response) => {
        console.log(response.data);

        const arrayData = Object.values(response.data);
        console.log(arrayData);
        const status = arrayData[0];
        console.log(status);


        if (status == "wrong") {
          SetAutorisation("false");
        } else {
          SetErrorMessage("Une erreur s'est produite !"), SetIsShowModel(true);
        }
      })
      .then((error) => console.log(error));
    

    //Pour retourner une victoire ou une defaite

    if(MaDate < DateOfTheDay) {
      axios
      .post("http://192.168.43.17:3002/GetJson", {
        id: user.id,
        id_match: id_match,
      })
      .then((response) => {
        console.log(response.data);

        const arrayData = Object.values(response.data);
        var MyJson = Object.values(arrayData[0]);

        var MyNewJson = MyJson[0].json_data;
        var TMP = JSON.parse(MyNewJson);

        SetArrayJsonValue(TMP.jeuParMinute);
        SetMoyenne(response.data.Moyenne)
        SetIntervalTime(response.data.Interval)
      })
      .then((error) => console.log(error));

    axios
      .post("http://192.168.43.17:3002/GetStat", {
        id: user.id,
        id_match: id_match,
      })
      .then((response) => {
        console.log(response.data);

        const arrayData = Object.values(response.data);
        var MyStats = Object.values(arrayData[0]);

        SetNombreCalories(MyStats[0].calories);
        Setnmbmetre(MyStats[0].km_parcourus);

       



      })
      .then((error) => console.log(error));


   
    

      axios
      .post("http://192.168.43.17:3002/GetStatsAllPlayers", {
        id: id_match,
      })
      .then((response) => {

        
        SetInteret(response.data.Interet)
        SetUsersStat(response.data.users)
        SetVisible(true)

       


      })
      .then((error) => console.log(error));

    }

      



  }, []);

  var nombrecannetteNonArrondi = nmbCalories / 140;
  var nombreCanette = Math.round(nombrecannetteNonArrondi);

  var nombreterrainNonArrondi = nmbmettre / 400;
  var nombreTerrains = Math.round(nombreterrainNonArrondi);

  const ValiderScore = (e) => {
    e.preventDefault();

    if (scoreEkipA.lenght == 0 || scoreEkipB.length == 0) {
      setNonValidScore("Remplissez les scores correctement !"),
        SetNonValidModel(true);
    } else {
      console.log("Scores");
      console.log(scoreEkipA);
      console.log(scoreEkipB);
      console.log(CodeMatch);

      axios
        .post("http://192.168.43.17:3002/ValiderScore", {
          ScoreA: scoreEkipA,
          ScoreB: scoreEkipB,
          id_match: CodeMatch,
        })
        .then((response) => {
          console.log(response.data);

          const arrayData = Object.values(response.data);
          console.log(arrayData);
          const status = arrayData[0];
          console.log(status);

          if (status == "Validation") {
            SetNewSuccess("Vous avez bien valider le score !"),
              SetValidModel(true);
          } else {
            SetErrorMessage("Une erreur s'est produite !");
          }
        })
        .then((error) => console.log(error));
    }
  };

  const join = (e) => {
    e.preventDefault();

    axios
      .post("http://192.168.43.17:3002/join", {
        id: user.id,
        id_match: id_match,
        equipe: checked,
      })
      .then((response) => {
        console.log(response.data);

        const arrayData = Object.values(response.data);
        console.log(arrayData);
        const status = arrayData[0];
        console.log(status);

        if (status == "success") {
          SetSuccessMessage("Vous faites partie de l'équipe !"),
            SetShowModel(true);
        } else if (status == "failed") {
          SetErrorMessage("Vous faites déja partie de l'équipe !"),
            SetIsShowModel(true);
        } else {
          SetErrorMessage("Une erreur s'est produite !"), SetIsShowModel(true);
        }
      })
      .then((error) => console.log(error));
  };

  const left = (e) => {
    e.preventDefault();

    axios
      .post("http://192.168.43.17:3002/left", {
        id: user.id,
        id_match: id_match,
      })
      .then((response) => {
        console.log(response.data);

        const arrayData = Object.values(response.data);
        console.log(arrayData);
        const status = arrayData[0];
        console.log(status);

        if (status == "Left") {
          SetErrormsg("Vous avez quitté l'équipe !"), SetLeModel(true);
        } else if (status == "Sup") {
          SetErrormsg("Vous avez supprimé la réservation !"), SetLeModel(true);
        } else {
          SetErrorMessage("Une erreur s'est produite !"), SetIsShowModel(true);
        }
      })
      .then((error) => console.log(error));
  };




  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const ApiButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.apiButtonContainer}>
      <Text style={styles.apButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const renderElement = () => {
    if ((ScoreA > ScoreB && Team == 1) || (ScoreB > ScoreA && Team == 2)) {
      return (
        <Text style={{ marginLeft: 6, color: "#28D4A2", fontSize: 20 }}>
          Victoire
        </Text>
      );
    } else if (ScoreA == ScoreB) {
      return (
        <Text style={{ marginLeft: 13, color: "orange", fontSize: 20 }}>
          Egalité
        </Text>
      );
    } else {
      return (
        <Text style={{ marginLeft: 13, color: "red", fontSize: 20 }}>
          Défaite
        </Text>
      );
    }
  };

  if (MaDate > DateOfTheDay || MaDate == DateOfTheDay) {
    if (Autorisation == "true") {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}
                >
                  Réservation de terrain
                </Title>
                <Caption style={styles.caption}>@{CodeMatch}</Caption>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="pokeball" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Centre : {VraiCentre}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="calendar-today" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Date : {MaDate}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="clock" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Heure de début : {StartTime}{" "}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="clock-alert" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Heure de fin : {FinTime}{" "}
              </Text>
            </View>

            <AwesomeAlert
              show={ShowModel}
              showProgress={false}
              title="Parfait !"
              message={SuccessMessage}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              confirmText="Ok"
              confirmButtonColor="#008000"
              onConfirmPressed={() => {
                SetShowModel(false);
                navigation.navigate("AddMatch");
              }}
            />

            <AwesomeAlert
              show={IsShowModel}
              showProgress={false}
              title="Oups..."
              message={ErrorMessage}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              confirmText="Annuler"
              confirmButtonColor="#DD6B55"
              onConfirmPressed={() => {
                SetIsShowModel(false);
              }}
            />

            <View style={styles.row}>
              <Icon name="face-agent" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Créateur du match : @{MyCreator}
              </Text>
            </View>
          </View>

          {/*<View style={styles.infoBoxWrapper}>
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

          <View
            style={{ flexDirection: "row", marginLeft: 90, marginBottom: 15 }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.item}>Equipe 1</Text>

              <RadioButton
                value="first"
                status={checked === 1 ? "checked" : "unchecked"}
                onPress={() => setChecked(1)}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.items}>Equipe 2</Text>

              <RadioButton
                value="second"
                status={checked === 2 ? "checked" : "unchecked"}
                onPress={(e) => setChecked(2)}
              />
            </View>
          </View>

          <AppButton title="Rejoindre" onPress={(e) => join(e)} />

          {UserArray.forEach(function (element, index) {
            if (index == 0) {
              NewArray.splice(0, NewArray.length);
            }

            NewArray.push({ key: element.key });
          })}

          {EkipArray.forEach(function (element, index) {
            if (index == 0) {
              AnotherArray.splice(0, AnotherArray.length);
            }

            AnotherArray.push({ key: element.key });
          })}

          <Text style={{ fontSize: 15, color: "orange", marginTop: 15 }}>
            Listes des joueurs qui participeront à ce match :
          </Text>

          <View style={{ flexDirection: "row", marginLeft: 100 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.item}>Equipe 1</Text>

              <FlatList
                data={NewArray}
                renderItem={({ item }) => (
                  <Text style={styles.item}>-{item.key}</Text>
                )}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.items}>Equipe 2</Text>

              <FlatList
                data={AnotherArray}
                renderItem={({ item }) => (
                  <Text style={styles.items}>-{item.key}</Text>
                )}
              />
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
        
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}
                >
                  Réservation de terrain
                </Title>
                <Caption style={styles.caption}>@{CodeMatch}</Caption>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="pokeball" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Centre : {VraiCentre}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="calendar-today" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Date : {MaDate}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="clock" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Heure de début : {StartTime}{" "}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="clock-alert" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Heure de fin : {FinTime}{" "}
              </Text>
            </View>

            <AwesomeAlert
              show={ShowModel}
              showProgress={false}
              title="Parfait !"
              message={SuccessMessage}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              confirmText="Ok"
              confirmButtonColor="#008000"
              onConfirmPressed={() => {
                SetShowModel(false);
                navigation.navigate("AddMatch");
              }}
            />

            <AwesomeAlert
              show={IsShowModel}
              showProgress={false}
              title="Oups..."
              message={ErrorMessage}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              confirmText="Annuler"
              confirmButtonColor="#DD6B55"
              onConfirmPressed={() => {
                SetIsShowModel(false);
              }}
            />

            <AwesomeAlert
              show={Model}
              showProgress={false}
              title="Voulez vous vraiment quitter l'équipe ?"
              message="En confirmant vous serez retiré de la liste des joueurs de ce match !"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              confirmText="Quitter l'équipe"
              confirmButtonColor="#DD6B55"
              onConfirmPressed={(e) => {
                SetModel(false);
                left(e);
              }}
            />

            <AwesomeAlert
              show={LeModel}
              showProgress={false}
              title="Dommage ..."
              message={Errormsg}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              confirmText="OK"
              confirmButtonColor="#DD6B55"
              onConfirmPressed={() => {
                SetLeModel(false);
                navigation.navigate("AddMatch");
              }}
            />

            <View style={styles.row}>
              <Icon name="face-agent" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Créateur du match : @{MyCreator}
              </Text>
            </View>
          </View>

          <ApiButton title="Quitter" onPress={() => SetModel(true)} />

          {UserArray.forEach(function (element, index) {
            if (index == 0) {
              NewArray.splice(0, NewArray.length);
            }

            NewArray.push({ key: element.key });
          })}

          {EkipArray.forEach(function (element, index) {
            if (index == 0) {
              AnotherArray.splice(0, AnotherArray.length);
            }

            AnotherArray.push({ key: element.key });
          })}

          <Text style={{ fontSize: 15, color: "orange", marginTop: 15 }}>
            Listes des joueurs qui participeront à ce match :
          </Text>

          <View style={{ flexDirection: "row", marginLeft: 100 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.item}>Equipe 1</Text>

              <FlatList
                data={NewArray}
                renderItem={({ item }) => (
                  <Text style={styles.item}>-{item.key}</Text>
                )}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.items}>Equipe 2</Text>

              <FlatList
                data={AnotherArray}
                renderItem={({ item }) => (
                  <Text style={styles.items}>-{item.key}</Text>
                )}
              />
            </View>
          </View>
        </SafeAreaView>
      );
    }
  } else if (MaDate < DateOfTheDay) {
    if (ScoreA && ScoreB) {
      return (

        
        <SafeAreaView style={styles.container}>
          <AnimatedSplash
        translucent={true}
        isLoaded={Visible}
        logoImage={require("../images/ouai.png")}
        backgroundColor={"#25282d"}
        logoHeight={200}
        logoWidth={200}
      >
          
          <ScrollView>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 20 }}>
                  <Title
                    style={[
                      styles.title,
                      {
                        marginTop: 15,
                        marginBottom: 5,
                      },
                    ]}
                  >
                    Match Terminé
                  </Title>
                  <Caption style={styles.caption}>@{CodeMatch}</Caption>
                </View>
              </View>
            </View>

           

            <View style={styles.userInfoSection}>
              <View style={styles.row}>
                <Icon name="pokeball" color="#777777" size={20} />
                <Text style={{ color: "#fff", marginLeft: 20 }}>
                  Centre : {VraiCentre}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="calendar-today" color="#777777" size={20} />
                <Text style={{ color: "#fff", marginLeft: 20 }}>
                  Date : {MaDate}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="clock" color="#777777" size={20} />
                <Text style={{ color: "#fff", marginLeft: 20 }}>
                  Heure de début : {StartTime}{" "}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="clock-alert" color="#777777" size={20} />
                <Text style={{ color: "#fff", marginLeft: 20 }}>
                  Heure de fin : {FinTime}{" "}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="face-agent" color="#777777" size={20} />
                <Text style={{ color: "#fff", marginLeft: 20 }}>
                  Créateur du match : @{MyCreator}
                </Text>
              </View>
            </View>

            {UserArray.forEach(function (element, index) {
              if (index == 0) {
                NewArray.splice(0, NewArray.length);
              }

              NewArray.push({ key: element.key });
            })}

            {EkipArray.forEach(function (element, index) {
              if (index == 0) {
                AnotherArray.splice(0, AnotherArray.length);
              }

              AnotherArray.push({ key: element.key });
            })}

            <View style={{ alignItems: "center", marginRight: 20 }}>
              <Text
                style={{
                  justifyContent: "flex-start",
                  color: "orange",
                  fontSize: 40,
                }}
              >
                {ScoreA} <Text style={{ color: "white" }}>- {ScoreB}</Text>
              </Text>

              {renderElement()}
            </View>
            <Text
              style={{
                fontSize: 15,
                color: "orange",
                textAlign: "center",
                marginTop: 10,
                marginRight: 20,
              }}
            >
              Listes des joueurs qui ont participé à ce match :
            </Text>

            <View style={{ flexDirection: "row", marginLeft: 70 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.item}>Equipe 1</Text>

                <FlatList
                  data={NewArray}
                  renderItem={({ item }) => (
                    <Text style={styles.item}>-{item.key}</Text>
                  )}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.items}>Equipe 2</Text>

                <FlatList
                  data={AnotherArray}
                  renderItem={({ item }) => (
                    <Text style={styles.items}>-{item.key}</Text>
                  )}
                />
              </View>
            </View>

            <View style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() =>
                  SetShowGraph(!ShowGraph) &
                  SetDistance(false) &
                  SetCalories(false) &
                  SetShowInteret(false)

                }
              >
                <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="run-fast"
                    size={35}
                    color="white"
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Activité</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() =>
                  SetCalories(!Calories) &
                  SetShowGraph(false) &
                  SetDistance(false) &
                  SetShowInteret(false)

                }
              >
                <View style={styles.categoryIcon2}>
                  <MaterialCommunityIcons
                    name="cookie"
                    size={35}
                    color="white"
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Calories</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() =>
                  SetDistance(!Distance) &
                  SetShowGraph(false) &
                  SetCalories(false) &
                  SetShowInteret(false)
                }
              >
                <View style={styles.categoryIcon3}>
                  <MaterialCommunityIcons
                    name="map-marker-distance"
                    size={35}
                    color="white"
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Distance</Text>
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={() =>
                  SetShowInteret(!ShowInteret) &
                  SetShowGraph(false) &
                  SetCalories(false) &
                  SetDistance(false)
                }
              >
                <View style={styles.categoryIcon4}>
                  <MaterialCommunityIcons
                    name="arrow-expand-up"
                    size={35}
                    color="white"
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Interet</Text>
              </TouchableOpacity>

                  
   

            </View>

            {ShowGraph ? (
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{ fontSize: 20, color: "white", textAlign: "center" }}
                >
                  Activité
                </Text>
                <LineChart
                  data={{
                    labels: IntervalTime,
                    datasets: [
                      {
                        data: ArrayJsonValue,
                      },

                      {
                        data: Moyenne,
                        color: () => "red",
                        strokeWidth: 1,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width} // from react-native
                  height={220}
                  yAxisSuffix=" pas"
                  yAxisInterval={0.5}
                  // optional, defaults to 1
                  chartConfig={{
                    fillShadowGradient: "white",
                    fillShadowGradientOpacity: 0.5,
                    backgroundColor: "blue",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    //https://github.com/indiespirit/react-native-chart-kit/issues/39
                    propsForBackgroundLines: {
                      strokeWidth: 0,
                    },
                    strokeWidth: 1,
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 0.8) => `white`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "0",
                      strokeWidth: "2",
                      stroke: "white",
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />



<View style={styles.SquareShapeView}



/>

<Text style={styles.categoryBtnText} >Moyenne de l'équipe</Text>

<View style={styles.SquareShapeVieww}



/>

<Text style={styles.categoryBtnText} >Vos statistiques</Text>


              </View>
            ) : null}

            <View style={styles.cardsWrapper}>
              {Calories ? (
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, marginLeft: 13, marginBottom: 20 }}>
                    <Image
                      source={require("../images/coca.png")}
                      style={{ resizeMode: "contain", height: 41, width: 230 }}
                    ></Image>

                    <Text
                      style={{
                        width: 350,
                        textAlign: "center",
                        marginTop: 15,
                        color: "white",
                      }}
                    >
                      Vous avez dépensé l'équivalent de {nombreCanette}{" "}
                      cannettes de coca
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginRight: 70 }}>
                    <Text
                      style={{
                        justifyContent: "flex-end",
                        color: "white",
                        fontSize: 20,
                      }}
                    >
                      {nmbCalories} calories{" "}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>

            <View style={styles.cardsWrapper}>
              {Distance ? (
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 0.9, marginLeft: 13, marginBottom: 20 }}>
                    <Image
                      source={require("../images/terrain.png")}
                      style={{
                        resizeMode: "contain",
                        height: 35,
                        width: 230,
                        justifyContent: "flex-start",
                      }}
                    ></Image>

                    <Text
                      style={{
                        width: 350,
                        textAlign: "center",
                        marginTop: 15,
                        color: "white",
                      }}
                    >
                      Vous avez couru l'équivalent de {nombreTerrains} terrains
                      de Foot
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginRight: 70 }}>
                    <Text
                      style={{
                        justifyContent: "flex-end",
                        color: "white",
                        fontSize: 20,
                      }}
                    >
                      {nmbmettre} mètres{" "}
                    </Text>
                  </View>
                </View>
              ) : null}

{ShowInteret ? (
              <View>
                <Text
                  style={{ fontSize: 20, color: "white", textAlign: "center", marginBottom : 10}}
                >
                  Importance
                </Text>

                <BarChart

                

  data={{
    labels: UsersStats,
    datasets: [
      {
        data: Interet,
      },

   
    ],

  }}
 
  style = {{backgroundColor : "blue"}}
  width={screenWidth}
  fromZero = {true}
  height={220}
  yAxisLabel="%"
  withInnerLines = {true}
  chartConfig={{
    fillShadowGradient:'skyblue',
    fillShadowGradientOpacity:1,
    backgroundGradientFrom: "orange",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "orange",
  backgroundGradientToOpacity: 0.6,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.9,
  useShadowColorFromDataset: false }}
  
  verticalLabelRotation={0}
  showBarTops	= {true}
/>
                
          
              </View>
            ) : null}
            </View>
           
          </ScrollView>
          </AnimatedSplash>
        </SafeAreaView>
      );
    } else if (!ScoreA && !ScoreB && MyCreator == user.pseudo) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}
                >
                  Match Terminé
                </Title>
                <Caption style={styles.caption}>@{CodeMatch}</Caption>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="pokeball" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Centre : {VraiCentre}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="calendar-today" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Date : {MaDate}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="clock" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Heure de début : {StartTime}{" "}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="clock-alert" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Heure de fin : {FinTime}{" "}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="face-agent" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Créateur du match : @{MyCreator}
              </Text>
            </View>
          </View>

          {UserArray.forEach(function (element, index) {
            if (index == 0) {
              NewArray.splice(0, NewArray.length);
            }

            NewArray.push({ key: element.key });
          })}

          {EkipArray.forEach(function (element, index) {
            if (index == 0) {
              AnotherArray.splice(0, AnotherArray.length);
            }

            AnotherArray.push({ key: element.key });
          })}

          <KeyboardAvoidingView>
            <View style={{ alignItems: "center" }}>
              {/*
A MODIFIER POUR LE SCOOOOOOORE ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
*/}
              <Text style={{ color: "white" }}>
                Veuillez saisir le score de ce match :
              </Text>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ flex: 1 }}>
                  <Input
                    style={{ color: "white" }}
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="Score A"
                    placeholderTextColor="orange"
                    onChangeText={(e) => SetScoreA(e)}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    style={{ color: "white" }}
                    keyboardType="numeric"
                    placeholder="Score B"
                    placeholderTextColor="orange"
                    maxLength={2}
                    onChangeText={(e) => SetScoreB(e)}
                  />
                </View>
              </View>

              <ApButton title="Valider" onPress={() => SetNewModel(true)} />
            </View>

            <AwesomeAlert
              show={NewModel}
              showProgress={false}
              title="Stop !"
              message="En validant le score, il ne sera plus possible de le modifier !"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              confirmText="Je valide !"
              confirmButtonColor="#DD6B55"
              onConfirmPressed={(e) => {
                ValiderScore(e);
                SetNewModel(false);
              }}
            />

            <AwesomeAlert
              show={ValidModel}
              showProgress={false}
              title="Parfait !"
              message={newSuccess}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              confirmText="Ok"
              confirmButtonColor="#DD6B55"
              onConfirmPressed={() => {
                SetValidModel(false);
                navigation.replace("Matchs");
              }}
            />

            <AwesomeAlert
              show={nonValidModel}
              showProgress={false}
              title="Oups..."
              message={NonvalidScore}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showConfirmButton={true}
              confirmText="Annuler"
              confirmButtonColor="#DD6B55"
              onConfirmPressed={() => {
                SetNonValidModel(false);
              }}
            />
          </KeyboardAvoidingView>

          <Text style={{ fontSize: 15, color: "orange" }}>
            Listes des joueurs qui ont participé à ce match :
          </Text>

          <View style={{ flexDirection: "row", marginLeft: 100 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.item}>Equipe 1</Text>

              <FlatList
                data={NewArray}
                renderItem={({ item }) => (
                  <Text style={styles.item}>-{item.key}</Text>
                )}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.items}>Equipe 2</Text>

              <FlatList
                data={AnotherArray}
                renderItem={({ item }) => (
                  <Text style={styles.items}>-{item.key}</Text>
                )}
              />
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}
                >
                  Match Terminé
                </Title>
                <Caption style={styles.caption}>@{CodeMatch}</Caption>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="pokeball" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Centre : {VraiCentre}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="calendar-today" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Date : {MaDate}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="clock" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Heure de début : {StartTime}{" "}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="clock-alert" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Heure de fin : {FinTime}{" "}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="face-agent" color="#777777" size={20} />
              <Text style={{ color: "#fff", marginLeft: 20 }}>
                Créateur du match : @{MyCreator}
              </Text>
            </View>
          </View>

          {UserArray.forEach(function (element, index) {
            if (index == 0) {
              NewArray.splice(0, NewArray.length);
            }

            NewArray.push({ key: element.key });
          })}

          {EkipArray.forEach(function (element, index) {
            if (index == 0) {
              AnotherArray.splice(0, AnotherArray.length);
            }

            AnotherArray.push({ key: element.key });
          })}

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 15, color: "orange" }}>
              Le score n'a pas encore été renseigné par le créateur !
            </Text>
          </View>

          <Text style={{ fontSize: 15, color: "orange", marginTop: 15 }}>
            Listes des joueurs qui ont participé à ce match :
          </Text>

          <View style={{ flexDirection: "row", marginLeft: 100 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.item}>Equipe 1</Text>

              <FlatList
                data={NewArray}
                renderItem={({ item }) => (
                  <Text style={styles.item}>-{item.key}</Text>
                )}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.items}>Equipe 2</Text>

              <FlatList
                data={AnotherArray}
                renderItem={({ item }) => (
                  <Text style={styles.items}>-{item.key}</Text>
                )}
              />
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }
};

export default SearchMatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#25282d",
    alignItems: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },

  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "white",
  },
  categoryBtnText: {
    marginTop: 5,
    color: "white",
    marginLeft : 17
  },

  apButtonContainer: {
    elevation: 8,
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  cardsWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  apiButtonContainer: {
    elevation: 8,
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  apButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },

  SquareShapeView: {

    width: 20,
    height: 10,
    backgroundColor: 'red',
    marginLeft : 20

  },

  SquareShapeVieww: {

    width: 20,
    height: 10,
    backgroundColor: 'white',
    marginLeft : 20,
    marginTop : 20

  },
  
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 20,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    padding: 15,
    margin: 40,
    width: 200,
  },
  MyButton: {},
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    backgroundColor: "red" /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryIcon2: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    backgroundColor: "#CCCC00" /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryIcon3: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    backgroundColor: "blue" /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryIcon4: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    backgroundColor: "orange" /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 50,
  },
  action: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: "white",
    justifyContent: "flex-start",
  },
  image: {
    width: 100,
    height: 100,
},
textMargin: {
    marginTop: 30,
    fontSize: 18,
},

  items: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: "white",
    justifyContent: "flex-end",
  },
});
