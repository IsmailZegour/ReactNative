// Fonction permettant d'enregistrer une bande sonore

import * as React from "react";
import {Text, View, StyleSheet, Button, TouchableOpacity} from "react-native";
import {Audio} from "expo-av";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function RecordingSound() {
  const [recording, setRecording] = React.useState();
  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    global.sound = recording.getURI();
    console.log("Recording stopped and stored at", global.sound);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
      >
        <MaterialCommunityIcons name="microphone" size={40} color="#9AC4F8" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10
  }
});
