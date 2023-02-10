import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import * as FileSystem from "expo-file-system";

export default function SelectedPage({ route, navigation }) {
  const { videoId, videoUri } = route.params;

  console.log(" - - Selection Page Begins here - - ");
  console.log("Video ID: ", videoId);
  console.log("Video URI: ", videoUri);

  async function getBase64() {
    const videoBase64 = await FileSystem.readAsStringAsync(videoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return videoBase64;
  }
  getBase64();

  const pickImageVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    console.log(JSON.stringify(result));
    if (!result.cancelled) {
      if (result.type == "video") {
        console.log("JSON: ", JSON.stringify(result));
        const newVideoUri = result.uri;

        if (newVideoUri != null) {
          navigation.navigate("SelectedPage", {
            videoId: 0,
            videoUri: newVideoUri,
          });
        } else {
          Alert.alert("An error has ocurred, please try again");
        }
      } else {
        Alert.alert("Not video type");
      }
    }
  };

  async function sendToBackend() {
    console.log("Upload pressed");
    // FETCH API

    const fetchResponse = await fetch("http://127.0.0.1:5000/addMedia", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId: "id test from FE",
        videoUri: "uri test from FE",
      }),
    });

    const jsonData = await fetchResponse.json();

    console.log("Recieved jsonData: ", jsonData);
  }

  async function sendBase64toBE() {
    console.log("Upload base64 pressed");

    // Encode to Base64
    const videoBase64 = await FileSystem.readAsStringAsync(videoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // FETCH API
    const fetchResponse = await fetch("http://127.0.0.1:5000/base64Endpoint", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoBase64: videoBase64,
        videoUri: videoUri,
      }),
    });

    const jsonData = await fetchResponse.json();

    console.log("Recieved jsonData: ", jsonData);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Video
          style={styles.tempVideo}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay
          source={{
            uri: videoUri,
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={["rgba(155,168,213, 0)", "transparent"]}
          style={styles.bottomGradient}
        >
          <Text style={styles.description}>
            Please confirm selected video or upload a new one
          </Text>

          <TouchableOpacity
            title="Upload from Gallery"
            style={styles.buttonContainer}
            // onPress={sendToBackend}
            onPress={sendBase64toBE}
          >
            <Text style={styles.buttonText}>Upload Video</Text>
          </TouchableOpacity>

          <TouchableOpacity
            title="Upload from Gallery"
            style={styles.buttonContainer}
            onPress={pickImageVideo}
          >
            {/* <Image
              style={styles.buttonImg}
              source={require("../assets/upload.png")}
            ></Image> */}
            <Text style={styles.buttonText}>Select New</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  topContainer: {
    height: "40%",
  },
  bottomContainer: {
    height: "60%",
  },
  bottomGradient: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "start",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "end",
    alignContent: "center",
  },
  tempVideo: {
    marginTop: "10%",
    alignSelf: "center",
    width: "80%",
    height: "80%",
    borderRadius: "20%",
  },
  title: {
    color: "rgb(42,42,42)",
    fontSize: 38,
    marginTop: "8%",
  },
  description: {
    color: "rgb(42,42,42)",
    width: "55%",
    margin: "6%",
    fontSize: 18,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: "rgba(85,96,128,0.45)",
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingLeft: "10%",
    paddingRight: "10%",
    borderRadius: "20",
    width: "75%",
    margin: "5%",
  },
  buttonText: {
    fontSize: 20,
    color: "rgb(42,42,42)",
    width: "100%",
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
