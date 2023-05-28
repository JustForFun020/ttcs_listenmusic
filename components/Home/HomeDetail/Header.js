import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Header = ({ logout, setLogout }) => {
  const [text, setText] = useState('');

  const showNoti = () => {
    return Alert.alert('Thông báo', 'Hiện tại không có thông báo nào', [{ text: 'OK', style: 'cancel' }]);
  };

  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity style={styles.icon} onPress={() => setLogout(!logout)}>
        <AntDesign name='user' size={24} color='black' />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
        }}
      >
        <AntDesign name='search1' size={15} color='black' style={{ position: 'absolute', bottom: 16, left: 22 }} />
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder='Tìm kiếm bài hát....'
          keyboardType='default'
        />
      </View>
      <TouchableOpacity style={styles.icon} onPress={showNoti}>
        <Ionicons name='notifications' size={24} color='#ADADAD' />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    height: 28,
    width: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'relative',
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
    borderColor: '#ADADAD',
  },
});
