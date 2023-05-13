import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeFooter from '../Home/HomeFooter';
import { SafeAreaView } from 'react-native-safe-area-context';

function RadioContainer() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Radio Container</Text>
      <HomeFooter />
    </SafeAreaView>
  );
}

export default RadioContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
