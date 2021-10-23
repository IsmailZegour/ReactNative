// Ecran affichant les détails de notre photo

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PlayingSound from "./PlayingSound";
import * as SQLite from "expo-sqlite";
var db = SQLite.openDatabase("PhotoDatabase.db");

const PhotoDetail = ({route, navigation}) => {

//Suppression de la photo de la base de donnée
  let deletePhoto = photoId => {
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM  table_photo where photo_id=?",
        [photoId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "Photo deleted successfully.",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Home")
                }
              ],
              {cancelable: false}
            );
          }
        }
      );
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.bottomView}
          onPress={() => deletePhoto(route.params.photo.photo_id)}
        >
          <MaterialCommunityIcons name="trash-can" size={40} color="white" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);
  return (
    <View style={styles.main_container}>
      <ScrollView style={styles.scrollview_container}>
        <Image
          style={styles.image}
          source={{uri: route.params.photo.photo_uri}}
        />
        <PlayingSound soundUri={route.params.photo.sound_uri} />
        <Text style={styles.title_text}>{route.params.photo.photo_title}</Text>
        <Text style={styles.description_text}>{route.params.photo.photo_description}</Text>
        <Text style={styles.default_text}> {route.params.photo.photo_date}</Text>
        <Text style={styles.default_text}>in {route.params.photo.photo_location}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    width: "100%",
    // Without height undefined it won't work
    height: undefined,
    aspectRatio: 5 / 6
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 35,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: "#000000",
    textAlign: "center"
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
});

export default PhotoDetail;
