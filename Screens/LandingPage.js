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

export default function LandingPage({ navigation }) {
  const pickImageVideo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (result.type == "video") {
        console.log("Result type: " + result.type);
        console.log("uri: ", result.uri);

        const newVideoUri = result.uri;

        console.log("video: " + newVideoUri);
        if (newVideoUri != null) {
          navigation.navigate("SelectedPage", {
            itemId: 0,
            otherParam: newVideoUri,
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
        <ImageBackground
          source={require("../assets/walking-transparent.png")}
          resizeMode="contain"
          style={styles.backgroundImage}
        ></ImageBackground>
      </View>
      <View style={styles.bottomContainer}>
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(155,168,213, 0)", "transparent"]}
          style={styles.bottomGradient}
        >
          <Text style={styles.title}>Gait Identification</Text>
          <Text style={styles.description}>
            Please upload a video from gallery or record a new one.
          </Text>

          <TouchableOpacity
            title="Upload from Gallery"
            style={styles.buttonContainer}
            onPress={pickImageVideo}
            // onPress={
            //   (
            //   navigation.navigate("SelectedPage", {
            //     itemId: 86,
            //     otherParam: "anything you want here",
            //   }))
            // }
          >
            <Image
              style={styles.buttonImg}
              source={require("../assets/upload.png")}
            ></Image>
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            title="Upload from Gallery"
            style={styles.buttonContainer}
            onPress={sendToBackend}
          >
            <Image
              style={styles.buttonImg}
              source={require("../assets/upload.png")}
            ></Image>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            title="Record Video"
            style={styles.buttonContainer}
            onPress={() => Alert.alert("Feature coming soon")}
          >
            <Image
              style={styles.buttonImg}
              source={require("../assets/camera.png")}
            ></Image>
            <Text style={styles.buttonText}>Record Video</Text>
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
    alignSelf: "center",
    width: "80%",
    height: "80%",
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
