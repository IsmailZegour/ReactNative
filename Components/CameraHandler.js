//Fichier permettant de gérer la caméra

import React, {useState, useEffect, useRef} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {Camera} from "expo-camera";

export default function CameraHandler({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const type = Camera.Constants.Type.back;


  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestPermissionsAsync(); // On recupere la permission pour l'utilisation la caméra de l'appareil.
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Pas d'acces Camera</Text>;
  }
  return (
    <View style={{flex: 1}}>
      <Camera
        style={{flex: 1}}
        type={type}
        ref={ref => {
          setCameraRef(ref);
        }}
        autoFocus="on"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end"
          }}
        >
          <TouchableOpacity
            style={{alignSelf: "center"}}
            onPress={async () => {
              if (cameraRef) {
                let photo = await cameraRef.takePictureAsync("photo");
                navigation.navigate("ImageScreen", {photo: photo});
              }
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderRadius: 50,
                borderColor: "white",
                height: 50,
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: "white",
                  height: 40,
                  width: 40,
                  backgroundColor: "white"
                }}
              ></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
