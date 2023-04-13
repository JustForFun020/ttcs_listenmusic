import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addAccount } from "./SaveAccount";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
  confirmPassword: Yup.string().required("Mật khẩu nhập lại không đúng"),
});

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/images/signup.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backToLogin}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{ color: "#fff" }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={addAccount}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{ width: "100%", alignItems: "center" }}>
              <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                placeholderTextColor={"#DAF5FF"}
              />
              {errors.username && touched.username && (
                <Text style={styles.error}>{errors.username}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholderTextColor={"#DAF5FF"}
              />
              {errors.email && touched.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholderTextColor={"#DAF5FF"}
              />
              {errors.password && touched.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Xác nhận Mật khẩu"
                secureTextEntry={true}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.password}
                placeholderTextColor={"#DAF5FF"}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FEFF86",
  },
  input: {
    width: "80%",
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#B0DAFF",
    marginBottom: 10,
    color: "#B0DAFF",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  backToLogin: {
    position: "absolute",
    right: 0,
    top: 32,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 12,
  },
});

export default SignUp;
