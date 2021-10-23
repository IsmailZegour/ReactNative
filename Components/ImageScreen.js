// Ecran d'aperçu de notre photo

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ImageScreen({route, navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      color: "white",
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CreatePhoto", {photo: route.params.photo})
          }
        >
          <MaterialCommunityIcons name="content-save-edit" size={40} color="white" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Image
        source={{uri: route.params.photo.uri}}
        style={{width: 380, height: 550}}
      />
    </View>
  );
}
