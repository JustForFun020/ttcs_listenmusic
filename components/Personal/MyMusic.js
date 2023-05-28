import _ from 'lodash';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AvailableMusic from './AvailableMusic';
import PlayMusic from '../PlayMusic';
import FavoriteMusic from './FavoriteMusic';

const MyMusic = (props) => {
  const [listMusic, setListMusic] = useState([]);
  const [favorMusic, setFavorMusic] = useState([]);
  const [listMusicScreen, setListMusicScreen] = useState(false);
  const [playMusic, setPlayMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingSong, setPlayingSong] = useState([]);

  const navigation = useNavigation();

  const { news, favorite, view, logout } = props;

  const removeMusic = (id) => {
    setIsPlaying(false);
    const deletedSong = _.clone(listMusic);
    const index = _.findIndex(deletedSong, (item) => item._id === id);
    deletedSong.splice(index, 1);
    setListMusic(deletedSong);
  };

  const addFavorMusic = (song) => {
    const uniqueFavorMusic = _.uniqWith([...favorMusic, song], _.isEqual);
    setFavorMusic(uniqueFavorMusic);
    Alert.alert('Thông báo', 'Đã thêm bài hát vào danh sách yêu thích', [{ text: 'OK', style: 'cancel' }]);
  };

  const handlePlayMusic = (song) => {
    setIsPlaying(!isPlaying);
    setPlayMusic(song);
    setPlayingSong(song);
  };

  const handleRenderMusic = (listMyMusic) => {
    if (_.isEmpty(listMyMusic)) {
      return (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ marginTop: 10, marginBottom: 10 }}>Không có bài hát nào</Text>
          <TouchableOpacity style={styles.addMusicBtn} onPress={() => setListMusicScreen(!listMusicScreen)}>
            <Text style={{ paddingRight: 4 }}>Thêm bài hát</Text>
            <AntDesign name='pluscircleo' size={24} color='#917FB3' />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          {_.map(listMyMusic, (song) => {
            return (
              <View key={song._id} style={styles.song}>
                <TouchableOpacity style={styles.infoAMusic}>
                  <Image source={{ uri: song.image_music }} style={styles.image} />
                  <View style={{ marginLeft: 10 }}>
                    <Text numberOfLines={1} style={{ width: 200 }}>
                      {song.name_music}
                    </Text>
                    <Text numberOfLines={1} style={{ width: 200, opacity: 0.5 }}>
                      {song.name_singer}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ padding: 8 }} onPress={() => addFavorMusic(song)}>
                    <AntDesign name='hearto' size={24} color='black' />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 8 }} onPress={() => handlePlayMusic(song)}>
                    {isPlaying && playMusic && playMusic._id === song._id ? (
                      <AntDesign name='pausecircleo' size={24} color='black' />
                    ) : (
                      <AntDesign name='playcircleo' size={24} color='black' />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 8 }} onPress={() => removeMusic(song._id)}>
                    <AntDesign name='closecircleo' size={24} color='red' />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.addMusicBtn} onPress={() => setListMusicScreen(!listMusicScreen)}>
              <Text style={{ paddingRight: 4 }}>Thêm bài hát</Text>
              <AntDesign name='pluscircleo' size={24} color='#917FB3' />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {logout && (
        <TouchableOpacity style={styles.logout} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      )}
      <View style={{ width: '100%', height: '100%', position: 'relative', alignItems: 'center' }}>
        {listMusicScreen ? (
          <AvailableMusic
            news={news}
            favorites={favorite}
            views={view}
            setListMusicScreen={setListMusicScreen}
            isPlaying={isPlaying}
            handleAddMyMusic={(item) => setListMusic([...listMusic, item])}
          />
        ) : (
          <ScrollView
            style={isPlaying ? { height: '73%', position: 'absolute' } : { height: '82%', position: 'absolute' }}
          >
            <View style={{ marginTop: 0 }}>
              <Text style={styles.myMusicText}>Nhạc của tôi</Text>
              <View>{handleRenderMusic(listMusic)}</View>
            </View>
            <FavoriteMusic
              playSound={isPlaying}
              setPlaySound={setIsPlaying}
              favorMusic={favorMusic}
              currSong={(item) => handlePlayMusic(item)}
            />
          </ScrollView>
        )}
      </View>
      {isPlaying && <PlayMusic song={playingSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    position: 'relative',
  },
  myMusic: {
    position: 'absolute',
    padding: 18,
  },
  myMusicText: {
    color: '#3C486B',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addMusicBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F9D949',
    borderStyle: 'dashed',
  },
  logout: {
    position: 'absolute',
    left: 10,
    padding: 10,
    backgroundColor: '#3C486B',
    zIndex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F9D949',
    borderStyle: 'dashed',
  },
  logoutText: {
    color: '#fff',
  },
  song: {
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoAMusicWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoAMusic: {
    flexDirection: 'row',
    paddingBottom: 20,
    marginBottom: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
});

export default MyMusic;
