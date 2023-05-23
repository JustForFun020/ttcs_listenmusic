import _ from 'lodash';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeFooter from '../Home/HomeFooter';
import Header from '../Home/HomeDetail/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useEffect } from 'react';

const DetailsPodcast = ({ route }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [pod, setPod] = useState();

  const { podcast } = route.params;

  const playSound = async (a) => {
    const sound = new Audio.Sound();
    setIsPlaying(!isPlaying);
    setPod(a);
    try {
      await sound.loadAsync({ uri: a.api });
      setSound(sound);
      !isPlaying ? sound.playAsync() : sound.pauseAsync;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  });

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
            <Text style={styles.listPodcastPlayText}>Danh Sách Podcast</Text>
            <View>
              {_.map(podcast.list_podcast, (listpodcast) => {
                const epi = Object.entries(listpodcast)[0][1];
                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={styles.thumbnail} source={{ uri: podcast.thumbnail }} />
                    <View style={styles.listPodcastPlayDetails}>
                      <Text numberOfLines={2} style={{ width: 220 }}>
                        {podcast.title} {epi.epi}
                      </Text>
                      <TouchableOpacity onPress={() => playSound(epi)}>
                        {isPlaying && pod.id === epi.id ? (
                          <View style={styles.playPodcast}>
                            <Text style={{ color: 'white', marginRight: 4 }}>Pause</Text>
                            <AntDesign name='pausecircleo' size={20} color='white' />
                          </View>
                        ) : (
                          <View style={styles.playPodcast}>
                            <Text style={{ color: 'white', marginRight: 4 }}>Play</Text>
                            <AntDesign name='playcircleo' size={20} color='white' />
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
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
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 30,
  },
  playPodcast: {
    flexDirection: 'row',
    backgroundColor: '#A459D1',
    width: 80,
    height: 34,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
});
