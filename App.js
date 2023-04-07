import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeContainer from "./components/Home/HomeContainer";
import Personal from "./components/Personal/Personal";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeContainer"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeContainer" component={HomeContainer} />
        <Stack.Screen name="Personal" component={Personal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
