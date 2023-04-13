import _, { isObject } from "lodash";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAccounts } from "./SaveAccount";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const navigation = useNavigation();

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <ImageBackground
      source={require("../../assets/images/signin.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <TextInput
          style={[styles.input]}
          value={username}
          onChangeText={setUsername}
          placeholder="Tên đăng nhập"
          placeholderTextColor={"#fff"}
          keyboardType="email-address"
        />
        <View style={{ width: "100%", position: "relative" }}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Mật khẩu"
            placeholderTextColor={"#fff"}
            secureTextEntry={hidePass}
          />
          <View style={{ position: "absolute", right: 7, top: 8 }}>
            {hidePass ? (
              <AntDesign
                name="eyeo"
                size={24}
                color="white"
                onPress={() => setHidePass(false)}
              />
            ) : (
              <FontAwesome
                name="eye-slash"
                size={24}
                color="white"
                onPress={() => setHidePass(true)}
              />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log(accountsList)}
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.textSignUp}>
          <Text style={{ color: "#007AFF" }}>
            Nếu chưa có tài khoản đăng ký{" "}
            <Text
              onPress={() => navigation.navigate("SignUp")}
              style={{ color: "#4CD964" }}
            >
              tại đây
            </Text>
          </Text>
        </View>
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
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#5856D6",
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#fff",
  },
  password: {
    position: "relative",
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
  textSignUp: {
    marginTop: 25,
  },
});

export default SignIn;
