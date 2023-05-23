import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { data } from '../../Api/radio';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const CommonPodcast = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [episode, setEpisode] = useState();
  const [epiID, setEpiID] = useState();

  const navigation = useNavigation();

  const renderDetailsPodcast = (podcast) => {
    navigation.navigate('DetailsPodcast', {
      podcast: podcast,
    });
  };

  const playSound = async (podcast) => {
    const sound = new Audio.Sound();
    setIsPlaying(!isPlaying);
    setEpiID(podcast);
    try {
      if (podcast.src_mp4 === '../../assets/podcast/p1_41.m4a') {
        await sound.loadAsync(require('../../assets/podcast/p1_41.m4a'));
      } else if (podcast.src_mp4 === '../../assets/podcast/p2_01.m4a') {
        await sound.loadAsync(require('../../assets/podcast/p2_01.m4a'));
      } else if (podcast.src_mp4 === '../../assets/podcast/p3_03.m4a') {
        await sound.loadAsync(require('../../assets/podcast/p3_03.m4a'));
      } else {
        await sound.loadAsync(require('../../assets/podcast/p4_01.m4a'));
      }
      setEpisode(sound);
      !isPlaying ? sound.playAsync() : sound.pauseAsync();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    return episode
      ? () => {
          episode.unloadAsync();
        }
      : undefined;
  }, [episode]);

  const renderPodcast = (podcast, idPod, keyPod) => {
    return (
      <View>
        <View>
          {podcast.id === idPod && (
            <View style={{ flexDirection: 'row', marginBottom: 22 }}>
              <Image style={styles.outstandingImage} source={{ uri: podcast.thumbnail }} />
              {_.map(podcast.list_podcast, (listpodcast) => {
                const pod = Object.entries(listpodcast).find(([key]) => {
                  return key === keyPod;
                });
                if (pod) {
                  return (
                    <View style={{ justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', width: 220 }} numberOfLines={2}>
                          {idPod === '6BUUFAEO'
                            ? `How2Money x Doctor Housing ${pod[1].epi}`
                            : idPod === '6BWAABIO'
                            ? `HIEU.TV ${pod[1].epi}`
                            : idPod === '6AFEIFOA'
                            ? `Đắp Chăn Nằm Nghe Tun Kể ${pod[1].epi}`
                            : `Nắng Thủy Tinh ${pod[1].epi}`}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => playSound(pod[1])}>
                        {isPlaying && epiID.id === pod[1].id ? (
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
                  );
                }
              })}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.content}>
          Danh Sách Podcast <AntDesign name='right' size={24} color='black' />
        </Text>
        {_.map(data, (item) => {
          return (
            <View style={styles.podcastContainer}>
              {_.map(item.common_podcast, (podcast) => {
                return (
                  <View style={styles.podcast}>
                    <Image style={styles.image} source={{ uri: podcast.thumbnail }} />
                    <View style={styles.podcastText}>
                      <Text style={styles.title}>{podcast.title}</Text>
                      <View style={styles.descriptionWrapper}>
                        <Text numberOfLines={4} style={styles.descriptionText}>
                          {podcast.description}
                        </Text>
                        <TouchableOpacity style={styles.descriptionAbout} onPress={() => renderDetailsPodcast(podcast)}>
                          <Text>Xem Thêm</Text>
                          <AntDesign name='caretright' size={20} color='black' />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
      <View>
        <Text style={styles.content}>Podcast nổi bật</Text>
        {_.map(data, (item) => {
          return (
            <View>
              {_.map(item.common_podcast, (podcast) => {
                return (
                  <LinearGradient
                    colors={['#FFB84C', '#2CD3E1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1, padding: 12 }}
                  >
                    <View>{renderPodcast(podcast, '6BUUFAEO', 'episode_1')}</View>
                    <View>{renderPodcast(podcast, '6BWAABIO', 'episode_3')}</View>
                    <View>{renderPodcast(podcast, '6AFEIFOA', 'episode_41')}</View>
                    <View>{renderPodcast(podcast, '69U9W7ZI', 'episode_1')}</View>
                  </LinearGradient>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CommonPodcast;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 22,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  podcastContainer: {
    marginTop: 12,
  },
  podcast: {
    marginBottom: 15,
    flexDirection: 'row',
    width: '65%',
  },
  podcastText: {
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionWrapper: {
    marginTop: 10,
  },
  descriptionText: {
    opacity: 0.5,
  },
  descriptionAbout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  outstandingImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
    marginRight: 20,
  },
  outstandingView: {
    flexDirection: 'row',
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
