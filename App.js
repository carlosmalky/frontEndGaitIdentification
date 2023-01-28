// In App.js in a new project
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
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectedPage from "./Screens/SelectedPage";
import LandingPage from "./Screens/LandingPage";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Test</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("TestScreen")}
      />
      <Button
        title="Go to Landing Page"
        onPress={() => navigation.navigate("LandingPage")}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={LandingPage} />
        <Stack.Screen name="SelectedPage" component={SelectedPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
