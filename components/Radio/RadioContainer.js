import _ from 'lodash';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeFooter from '../Home/HomeFooter';
import CommonPodcast from './CommonPodcast';
import Header from '../Home/HomeDetail/Header';

function RadioContainer() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.podcastContainer}>
        <CommonPodcast />
      </ScrollView>
      <HomeFooter />
    </SafeAreaView>
  );
}

export default RadioContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingBottom: 50,
    backgroundColor: 'white',
  },
  podcastContainer: {
    paddingLeft: 12,
    paddingRight: 12,
  },
});
