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
import { lessThan } from "react-native-reanimated";

export default function ResultPage({ route, navigation }) {
  console.log(" -- Result Page -- ");

  const { userName, userID, userImage } = route.params;
  strUserImage = String(userImage);
  updatedUserImage = strUserImage.substring(2, strUserImage.length - 1);

  let base64Image = "data:image/png;base64," + updatedUserImage + "";

  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        <View style={styles.topContainer}>
          <Image style={styles.imageContainer} source={{ uri: base64Image }} />
        </View>
        <View style={styles.bottomContainer}>
          <LinearGradient
            colors={["rgba(155,168,213, 0)", "transparent"]}
            style={styles.bottomGradient}
          >
            <Text style={styles.title}>Result</Text>

            <Text style={styles.description}>Name:</Text>
            <Text style={styles.resultText}>{userName}</Text>
            <Text style={styles.description}>ID:</Text>
            <Text style={styles.resultText}>{userID}</Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  borderContainer: {
    backgroundColor: "rgba(85,96,128,0.45)",
    width: "80%",
    height: "90%",
    borderRadius: "20em",
  },
  topContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    margin: "5%",
    width: "90%",
    borderRadius: "20em",
    aspectRatio: "1",
  },
  bottomContainer: {
    alignSelf: "center",
    height: "40%",
    width: "65%",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },

  title: {
    color: "rgb(50,50,50)",
    fontSize: 38,
    margin: "6%",
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
  resultText: {
    color: "rgb(42,42,42)",
    fontSize: 24,
    marginBottom: "6%",
    marginLeft: "6%",
  },
});
