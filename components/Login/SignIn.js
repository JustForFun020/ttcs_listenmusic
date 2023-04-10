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
import { accountsList } from "./SaveAccount";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  console.log(accountsList);

  const handleLogin = () => {
    // Handle login logic here
  };

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        console.log(JSON.parse(user));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/signin.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={getUser}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <View>
          <Text>
            Nếu chưa có tài khoản{" "}
            <Text onPress={() => navigation.navigate("SignUp")}>đăng ký</Text>
            tại đây
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
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 20,
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

export default SignIn;
