//Ecran permettant d'enregistrer notre photo dans la base de donnée

import React, {useState, useEffect} from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text
} from "react-native";
import Mytextinput from "../Components/Mytextinput";
import Mybutton from "../Components/Mybutton";
import * as SQLite from "expo-sqlite";
import {Audio} from "expo-av";
import RecordingSound from "../Components/RecordingSound";
var db = SQLite.openDatabase("PhotoDatabase.db");

const RegisterPhoto = ({route, navigation}) => {
  let [photoTitle, setPhotoTitle] = useState("");
  let [photoDescription, setDescription] = useState("");
  let [photoDate, setDate] = useState("04/05/12");

//Prise de permission pour l'utilisation des haut-parleurs
  useEffect(() => {
    (async () => {
      const {statusAudio} = await Audio.requestPermissionsAsync();
    })();
  }, []);

//On personnalise l'affichage de la date
  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    setDate(
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    );
  }, []);

// Enregistrement dans la base de donnée
  let register_photo = () => {
    console.log(
      photoTitle,
      photoDescription,
      photoDate,
      global.loc,
      route.params.photo.uri,
      global.sound
    );
    const query =
      "INSERT INTO table_photo (photo_title, photo_description, photo_uri, photo_location, photo_date, sound_uri) VALUES (?,?,?,?,?,?)";

    db.transaction(tx => {
      tx.executeSql(
        query,
        [
          photoTitle,
          photoDescription,
          route.params.photo.uri,
          global.loc,
          photoDate,
          global.sound
        ],
        (txObj, success) => navigation.navigate("Home"),
        (txObj, error) => console.log("Error ", error)
      );
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: "white"}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: "space-between"}}
            >
              <Mytextinput
                placeholder="Entrer Title (Optionnal)"
                onChangeText={photoTitle => setPhotoTitle(photoTitle)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Description (Optionnal)"
                onChangeText={photoDescription =>
                  setDescription(photoDescription)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: "top", padding: 10}}
              />
              <RecordingSound/>

              <Mybutton title="Submit" customClick={register_photo} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "grey"
          }}
        ></Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPhoto;
