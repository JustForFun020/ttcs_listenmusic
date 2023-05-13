import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeFooter from '../Home/HomeFooter';
import { SafeAreaView } from 'react-native-safe-area-context';

function FollowContainer() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Follow Container</Text>
      <HomeFooter />
    </SafeAreaView>
  );
}

export default FollowContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
