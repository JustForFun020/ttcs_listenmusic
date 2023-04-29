import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { addAccount } from './SaveAccount';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckBox } from 'react-native-elements';
import { Alert } from 'react-native';

const SignUp = () => {
  const [accounts, setAccounts] = useState({ username: '', password: '', email: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [checkbox, setCheckbox] = useState(false);
  const [validate, setValidate] = useState(false);

  const navigation = useNavigation();

  const handleInputChange = (filedName, value) => {
    setAccounts({ ...accounts, [filedName]: value });
  };

  const validateSignUp = () => {
    const schema = yup.object().shape({
      username: yup.string().required('Tên đăng nhập không được để trống'),
      email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập Email'),
      password: yup.string().required('Mật khẩu không được để trống'),
      confirmPassword: yup
        .string()
        .oneOf([accounts.password], 'Mật khẩu nhập lại không đúng')
        .required('Mật khẩu nhập lại không đúng'),
    });

    schema
      .validate(accounts, { abortEarly: false })
      .then(() => {
        setValidate(true);
        setErrors({});
        addAccount(accounts.email, accounts.username, accounts.password)
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        setValidate(false);
      });
  };

  const handleSubmit = () => {
    validateSignUp();
    if (validate && checkbox) {
      Alert.alert('Thông báo', 'Đăng ký thành công, vui lòng đăng nhập để sử dụng ứng dụng', [
        { text: 'Để Sau', style: 'cancel' },
        { text: 'Đăng nhập', onPress: () => navigation.navigate('SignIn') },
      ]);
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/signup.jpg')} style={{ width: '100%', height: '100%' }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backToLogin} onPress={() => navigation.navigate('SignIn')}>
          <Ionicons name='arrow-back' size={24} color='black' style={{ color: '#fff' }} />
        </TouchableOpacity>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder='Tên đăng nhập'
            value={accounts.username}
            onChangeText={(value) => handleInputChange('username', value)}
            placeholderTextColor={'#DAF5FF'}
          />
          {errors.username && <Text style={styles.error}>{errors.username}</Text>}
          <TextInput
            style={styles.input}
            placeholder='Email'
            value={accounts.email}
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(value) => handleInputChange('email', value)}
            placeholderTextColor={'#DAF5FF'}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <TextInput
            style={styles.input}
            placeholder='Mật khẩu'
            secureTextEntry={true}
            onChangeText={(value) => handleInputChange('password', value)}
            value={accounts.password}
            placeholderTextColor={'#DAF5FF'}
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}
          <TextInput
            style={styles.input}
            placeholder='Xác nhận Mật khẩu'
            secureTextEntry={true}
            value={accounts.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            placeholderTextColor={'#DAF5FF'}
          />
          {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
          <CheckBox
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)' }}
            textStyle={{ color: '#DAF5FF' }}
            checked={checkbox}
            title={'Tôi đồng ý với các điều khoản đã được đưa ra'}
            onPress={() => setCheckbox(!checkbox)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FEFF86',
  },
  input: {
    width: '80%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#B0DAFF',
    marginBottom: 10,
    color: '#B0DAFF',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLogin: {
    position: 'absolute',
    right: 0,
    top: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
  },
  checkbox: {
    backgroundColor: '#000',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUp;
