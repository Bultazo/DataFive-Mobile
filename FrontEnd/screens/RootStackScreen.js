import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./Auth/SplashScreen";
import SignInScreen from "./Auth/SignInScreen";
import SignupScreen from "./Auth/SignupScreen";
import Loading from "./Auth/LoadingApp";
import Complete from "./Auth/CompleteInfo";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Loading" component={Loading} />
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignupScreen} />
    <RootStack.Screen name="CompleteInfo" component={Complete} />
  </RootStack.Navigator>
);

export default RootStackScreen;
