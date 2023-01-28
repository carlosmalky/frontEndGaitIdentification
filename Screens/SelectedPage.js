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

export default function SelectedPage({ route, navigation }) {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  /* Get the param */
  const { itemId, otherParam } = route.params;

  async function sendToBackend() {
    console.log("Uplaod pressed");
    // FETCH API

    const fetchResponse = await fetch("http://127.0.0.1:5000/addMedia", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoTitle: "Test Title",
        videoDuration: "12:34",
      }),
    });

    const jsonData = await fetchResponse.json();

    console.log(jsonData);
    console.log("holda dudelskjdflksjdfldskjd");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text>Details Screen</Text>
        {/* <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text> */}

        <Video
          style={styles.tempVideo}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay
          source={{
            uri: otherParam,
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(155,168,213, 08)", "transparent"]}
          style={styles.bottomGradient}
        >
          <Text style={styles.description}>Please confirm selected video</Text>

          <TouchableOpacity
            title="Upload from Gallery"
            style={styles.buttonContainer}
            onPress={console.log("sending video to BE")}
          >
            <Image
              style={styles.buttonImg}
              source={require("../assets/upload.png")}
            ></Image>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>

          <TouchableOpacity
            title="Upload from Gallery"
            style={styles.buttonContainer}
            onPress={console.log("selecting new video")}
          >
            <Image
              style={styles.buttonImg}
              source={require("../assets/upload.png")}
            ></Image>
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
    backgroundColor: "rgb(207,145,215)",
    justifyContent: "start",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  tempVideo: {
    alignSelf: "center",
    width: "80%",
    height: "80%",
  },
  title: {
    color: "white",
    fontSize: 38,
    marginTop: "8%",
  },
  description: {
    color: "#E6E6E6",
    width: "55%",
    margin: "6%",
    fontSize: 18,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: "rgba(255,255,255,0.45)",
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
    // backgroundColor: "red",
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