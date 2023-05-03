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
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import * as FileSystem from "expo-file-system";
import Modal from "react-native-modal";

export default function SelectedPage({ route, navigation }) {
  // let localIP = "10.5.52.120";
  let localIP = "172.30.10.33";

  const { videoId, videoUri } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const funFactsAr = [
    "Google CEO Sundar Pichai claimed that artificial intelligence (AI) would be more transformative to humanity as a species than electricity and fire.",
    "Global revenues from AI for enterprise applications are projected to grow from $1.62B in 2018 to $31.2B in 2025.",
    "As reported by Gartner, by 2025, more than 75% of venture and seed capital investors will use AI and data analytics to gather information.",
    "Alphabet's Google and Nvidia are two of the world's top most innovative AI companies.",
    "With other collaborators, Microsoft hosted the 3rd online workshop on video analytics and intelligent edges in March 2022.",
    "A fun AI fact: according to a study by Bespoken, Google’s AI far excelled that of Alexa and Siri.",
    "n 2020, Elon Musk predicted that AI will overtake humans and grow more intelligent than our species by 2025.",
    "The world’s top universities have increased their AI-related education over the last few years, according to the AI Index.",
  ];

  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

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
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    console.log(JSON.stringify(result));
    if (!result.cancelled) {
      if (result.type == "video") {
        const newVideoUri = result.uri;

        if (newVideoUri != null) {
          navigation.navigate("SelectedPage", {
            videoId: 0,
            videoUri: newVideoUri,
          });
          console.log(videoId);
        } else {
          Alert.alert("An error has ocurred, please try again");
        }
      } else {
        Alert.alert("Not video type");
      }
    }
  };

  async function sendBase64toBE() {
    console.log("Upload base64 pressed");
    setIsLoading(true);
    // Encode to Base64
    const videoBase64 = await FileSystem.readAsStringAsync(videoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // FETCH API
    const fetchResponse = await fetch(
      // Update IP
      "http://" + localIP + ":5000/base64Endpoint",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoBase64: videoBase64,
          videoUri: videoUri,
        }),
      }
    );

    const jsonData = await fetchResponse.json();

    let returnedVal = jsonData["userFound"];
    let returnedName = jsonData["userName"];
    let returnedId = jsonData["userID"];
    let returnedImage = jsonData["userImageBase64"];
    setIsLoading(false);

    resultPage(returnedVal, returnedName, returnedId, returnedImage);
  }

  async function resultPage(response, resultName, resultId, returnedImage) {
    if (response == "true") {
      console.log(response, resultName, resultId);
      navigation.navigate("ResultPage", {
        userName: resultName,
        userID: resultId,
        userImage: returnedImage,
      });
    } else {
      console.log("User not found");
    }
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
        <View>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Animated.Image
                style={{
                  width: 100,
                  height: 100,
                  transform: [{ rotate: spin }],
                }}
                source={require("../assets/loading2.png")}
              ></Animated.Image>
              <Text style={styles.loadingTitle}>Uploading Video</Text>
              <Text style={styles.loadingSubTitle}>
                This might take a minute!
              </Text>
              <View style={styles.funFactContainer}>
                <Text style={styles.loadingDescTitle}>Did you know:</Text>
                <Text style={styles.loadingDesc}>{funFactsAr[2]}</Text>
              </View>
            </View>
          ) : (
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
                <Text style={styles.buttonText}>Select New</Text>
              </TouchableOpacity>
            </LinearGradient>
          )}
        </View>
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
  loadingContainer: {
    width: "100%",
    display: "flex",
    height: "90%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  loadingTitle: {
    fontSize: 22,
    color: "rgb(51,115,190)",
  },
  loadingSubTitle: {
    fontSize: 16,
    color: "grey",
  },
  funFactContainer: {
    width: "80%",
  },
  loadingDescTitle: {
    fontSize: 17,
    color: "rgb(171,100,100)",
  },
  loadingDesc: {
    fontSize: 15,
    color: "grey",
  },
});
