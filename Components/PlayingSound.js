//Fonction qui permet d'utiliser les haut-parleurs afin de jouer un son

import * as React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Audio} from "expo-av";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function PlayingSound(soundUri) {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log("Loading Sound");
    if (soundUri.soundUri != null) {
      const {sound} = await Audio.Sound.createAsync({uri: soundUri.soundUri});
      setSound(sound);
      console.log("Playing Sound");
      await sound.playAsync();
    }
  }
// On décharge le son une fois qu'il a été joué
  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <TouchableOpacity style={styles.container} onPress={playSound}>
      <MaterialCommunityIcons name="music-box" size={40} color="#9AC4F8" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10
  }
});
