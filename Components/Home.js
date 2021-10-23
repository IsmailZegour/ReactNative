//Ecran d'accueil de notre application

import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import * as SQLite from "expo-sqlite";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

var db = SQLite.openDatabase("PhotoDatabase.db");
const screenWidth = Dimensions.get("window").width;
const tileSize = screenWidth / 2;

const Home = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);

// Création ou chargement de la base de donnée de l'application
  useEffect(() => {
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_photo'",
        [],
        function(tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_photo", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_photo(photo_id INTEGER PRIMARY KEY AUTOINCREMENT, photo_title VARCHAR(20), photo_description VARCHAR(255), photo_uri VARCHAR(255), photo_location VARCHAR(255), photo_date VARCHAR(255),sound_uri VARCHAR(255))",
              []
            );
          }
        }
      );
    });
  }, []);

//Chargement des photos de la base de donnée dans notre application
  let get_photos = () => {
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM table_photo", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      color: "white",
      headerRight: () => (
        <TouchableOpacity
          onPressOut={get_photos()}
        >
          <MaterialCommunityIcons name="refresh" size={40} color="white" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <View style={styles.main_container}>
      <FlatList
        data={flatListItems}
        keyExtractor={item => item.photo_id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.main_container_2}
            onPress={() => navigation.navigate("PhotoDetail", {photo: item})}
          >
            <Image style={styles.image} source={{uri: item.photo_uri}} />
          </TouchableOpacity>
        )}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{margin: 10}} />}
      />

      <TouchableOpacity
        style={styles.bottomView}
        onPress={() => navigation.navigate("CameraHandler")}
      >
        <MaterialCommunityIcons name="camera" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 30
  },
  main_container_2: {
    height: 190,
    flexDirection: "row"
  },
  image: {
    width: tileSize,
    height: tileSize,
    margin: 5,
    backgroundColor: "gray"
  },
  bottomView: {
    width: "100%",
    height: 50,
    backgroundColor: "#9AC4F8",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  }
});

export default Home;
