import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SignInScreen from "../screens/authentication/SignIn";
import SignUpScreen from "../screens/authentication/SignUp";

import ProfileScreen from "../screens/profile/ProfileScreen";

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen
  },
  { headerMode: "none" }
);

const AppStack = createStackNavigator(
  { ProfileScreen },
  { headerMode: "none" }
);

export const AuthNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
);

export const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack
    },
    {
      initialRouteName: "App"
    }
  )
);
