//Fichier principal qui lance le navigateur de l'application

import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./Components/StackNavigator";
import StackNavigator from "./Components/StackNavigator";
import Constants from 'expo-constants'
import * as Location from "expo-location";

 const App = () => {
   const [location, setLocation] = useState(null);
   const [errorMsg, setErrorMsg] = useState(null);

//Prise de permission pour l'accès a la localisation de l'appareil
   useEffect(() => {
     (async () => {
       if (Platform.OS === "android" && !Constants.isDevice) {
         setErrorMsg(
           "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
         );
         return;
       }
       let {status} = await Location.requestPermissionsAsync();
       if (status !== "granted") {
         setErrorMsg("Permission to access location was denied");
         return;
       }

       let location = await Location.getCurrentPositionAsync({});//On recupere les coordonnées de l'utilisateur (longitude, latitude)
       if (errorMsg) {
         location = errorMsg;
       } else if (location) {
        location = await Location.reverseGeocodeAsync(location.coords);//On recupere l'adresse grâce au coordonnees'

       }
       location= new Array(location[0].street,location[0].subregion,location[0].country);
       location=location.join(',')
       setLocation(JSON.stringify(location));
     })();
   }, []);
 global.loc=location;
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
export default App
