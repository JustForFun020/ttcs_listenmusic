import _ from 'lodash';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeFooter from '../Home/HomeFooter';
import Header from '../Home/HomeDetail/Header';
import { LinearGradient } from 'expo-linear-gradient';

const DetailsPodcast = ({ route }) => {
  const { podcast } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <LinearGradient colors={['#AEE2FF', '#B799FF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
        <ScrollView style={styles.podcastDetails}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: podcast.thumbnail }} style={styles.image} />
              <Text
                style={{ marginLeft: 30, fontSize: 25, fontWeight: 'bold', color: '#B799FF', width: 220 }}
                numberOfLines={3}
              >
                {podcast.title}
              </Text>
            </View>
            <Text style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#146C94' }}>Mô tả:</Text>{' '}
              <Text style={{ fontSize: 15, color: '#FFF8D6' }}>{podcast.description}</Text>
            </Text>
          </View>
          <View style={styles.listPodcastPlay}>
            <Text style={styles.listPodcastPlayText}>Danh Sách Phát</Text>
            <View>
              {_.map(podcast.list_podcast, (listpodcast) => {
                const a = Object.entries(listpodcast)[0][1];
                return (
                  <View style={styles.listPodcastPlayDetails}>
                    <Text>
                      {podcast.title} {a.id}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <HomeFooter />
    </SafeAreaView>
  );
};

export default DetailsPodcast;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  podcastDetails: {
    height: '90%',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  listPodcastPlay: {
    marginBottom: 90,
    marginTop: 30,
  },
  listPodcastPlayText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  listPodcastPlayDetails: {
    marginTop: 20,
  },
});
