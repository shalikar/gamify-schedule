import { StatusBar } from "expo-status-bar";
import React from "react";
import { TextInput } from "react-native-paper";

import { StyleSheet, Text, View } from "react-native";
import RegistrationPage from "./components/RegistrationPage";

export default function App() {
  const [text, setText] = React.useState("");

  return (
   <RegistrationPage /> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});