import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const FavoriteMusic = (props) => {
  const [favoriteSong, setFavoriteSong] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currSong, setCurrSong] = useState();

  const { favorMusic, playSound, setPlaySound } = props;

  const handleRemoveMusic = (id) => {
    setIsPlaying(false);
    const deletedSong = _.clone(favoriteSong);
    const index = _.findIndex(deletedSong, (item) => item._id === id);
    favorMusic.splice(index, 1);
    deletedSong.splice(index, 1);
    setFavoriteSong(deletedSong);
  };

  const handlePlayMusic = (song) => {
    setPlaySound(!playSound);
    setIsPlaying(!isPlaying);
    setCurrSong(song);
    props.currSong(song);
  };

  useEffect(() => {
    setFavoriteSong(favorMusic);
  }, [favorMusic]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bài hát yêu thích</Text>
      <View style={styles.noDataText}>
        {_.isEmpty(favorMusic) && <Text style={{ textAlign: 'center' }}>Không có bài hát nào</Text>}
      </View>
      <View style={styles.listSong}>
        {_.map(favoriteSong, (song, index) => {
          return (
            <View style={styles.detailSong}>
              <View style={index === 0 ? styles.detailSong0 : styles.detailSong}>
                <Image
                  source={{ uri: song.image_music }}
                  style={{ height: 50, width: 50, borderRadius: 10, marginRight: 8 }}
                />
                <View style={{ justifyContent: 'space-between' }}>
                  <Text numberOfLines={1} width={200}>
                    {song.name_music}
                  </Text>
                  <Text style={{ opacity: 0.5 }}>{song.name_singer}</Text>
                </View>
              </View>
              <View style={styles.listBtn}>
                <TouchableOpacity style={{ marginRight: 20, marginLeft: 20 }} onPress={() => handlePlayMusic(song)}>
                  {isPlaying && currSong && currSong._id === song._id ? (
                    <AntDesign name='pausecircleo' size={24} color='black' />
                  ) : (
                    <AntDesign name='playcircleo' size={24} color='black' />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveMusic(song._id)}>
                  <AntDesign name='closecircleo' size={24} color='red' />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default FavoriteMusic;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FEA1A1',
  },
  noDataText: {
    marginTop: 12,
  },
  listSong: {
    marginLeft: 16,
    marginRight: 16,
  },
  detailSong: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
  },
  detailSong0: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    alignItems: 'center',
  },
  song: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listBtn: {
    flexDirection: 'row',
  },
});
