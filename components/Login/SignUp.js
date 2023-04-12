import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addAccount } from "./SaveAccount";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    // Handle register logic here
    const user = { email, password };
    AsyncStorage.setItem("user", JSON.stringify(user))
      .then(() => {
        // Handle successful registration
        console.log("User saved successfully");
      })
      .catch((error) => {
        // Handle registration error
        console.error(error);
      });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/signup.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={{
            position: "absolute",
            right: 0,
            top: 32,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            padding: 12,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.navigate("SignIn")}
            style={{ color: "#fff" }}
          />
        </View>
        <Text style={styles.title}>Đăng Ký</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={"#DAF5FF"}
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Tài khoản"
          placeholderTextColor={"#DAF5FF"}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Mật khẩu"
          secureTextEntry
          placeholderTextColor={"#DAF5FF"}
        />
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
          placeholderTextColor={"#DAF5FF"}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => addAccount(email, username, password)}
          //   onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
    opacity: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#FEFF86",
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#B0DAFF",
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#B0DAFF",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUp;
