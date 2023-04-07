import React from "react";
import { View, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Header = () => {
  const [number, onChangeNumber] = React.useState("");

  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.icon}>
        <AntDesign name="user" size={24} color="black" />
      </View>
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <AntDesign
          name="search1"
          size={15}
          color="black"
          style={{ position: "absolute", bottom: 16, left: 22 }}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Tìm kiếm bài hát...."
          keyboardType="default"
        />
      </View>
      <View style={styles.icon}>
        <Ionicons name="notifications" size={24} color="#ADADAD" />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    height: 28,
    width: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  input: {
    height: 25,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 4,
    fontSize: 10,
    borderRadius: 100,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: "#ADADAD",
  },
});
