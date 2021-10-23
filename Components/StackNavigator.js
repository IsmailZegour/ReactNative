// Fichier permettant de créer un naviagateur en empilant l'affichage des écrans grâce au StackNavigator

import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./Home";
import PhotoDetail from "./PhotoDetail";
import CameraHandler from "./CameraHandler";
import ImageScreen from "./ImageScreen";
import CreatePhoto from "../Database/CreatePhoto";
const Stack = createStackNavigator();

export default function CameraStack(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9AC4F8"
        },
        headerTintColor: "white",
        headerBackTitle: "back"
      }}
    >
      <Stack.Screen name="Home" component={Home} title='Accueil'/>
      <Stack.Screen name="PhotoDetail" component={PhotoDetail} title='Détail de la photo' />
      <Stack.Screen name="CameraHandler" component={CameraHandler} title ="Camera"/>
      <Stack.Screen name="ImageScreen" component={ImageScreen} title="Aperçu"/>
      <Stack.Screen name="CreatePhoto" component={CreatePhoto} title="Enregistrement"/>
    </Stack.Navigator>
  );
};
