import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const AvailableMusic = (props) => {
  const [active, setActive] = useState(0);
  const [availableMusic, setAvailableMusic] = useState(news);
  const [selectedMusic, setSelectedMusic] = useState([]);

  const categoryMusic = ['Nhạc Mới', 'Top Yêu Thích', 'Top View'];

  const { news, favorites, views, setListMusicScreen, isPlaying } = props;
  console.log(props.isPlaying);

  const handleAddMyMusics = (song) => {
    setAvailableMusic(_.filter(availableMusic, (item) => item !== song));
    setSelectedMusic([...selectedMusic, song]);
    props.handleAddMyMusic(song);
  };

  useEffect(() => {
    if (active === 0) {
      setAvailableMusic(news);
    } else if (active === 1) {
      setAvailableMusic(favorites);
    } else setAvailableMusic(views);
  }, [active]);

  return (
    <View style={styles.availableMusicContainer}>
      <View style={styles.renderMusic}>
        <FontAwesome
          name='remove'
          size={24}
          color='black'
          style={styles.btnClose}
          onPress={() => setListMusicScreen(false)}
        />
        <ScrollView style={!isPlaying ? styles.listMusicAvailable : styles.listMusicAvailable_ing}>
          <Text style={styles.title}>Bài hát có sẵn</Text>
          <View style={styles.category}>
            {_.map(categoryMusic, (item, k) => {
              return (
                <TouchableOpacity
                  style={active === k ? styles.categoryItemActive : styles.categoryItem}
                  onPress={() => setActive(k)}
                >
                  <Text style={active === k ? styles.textActive : styles.text}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View>
            {_.map(availableMusic, (infoMusic) => {
              return (
                <View key={infoMusic._id} style={styles.infoMusic}>
                  <TouchableOpacity style={styles.infoAMusic}>
                    <Image source={{ uri: infoMusic.image_music }} style={styles.image} />
                    <View style={{ marginLeft: 10 }}>
                      <Text numberOfLines={1} style={{ width: 200 }}>
                        {infoMusic.name_music}
                      </Text>
                      <Text numberOfLines={1} style={{ width: 200, opacity: 0.5 }}>
                        {infoMusic.name_singer}
                      </Text>
                      <Text numberOfLines={1} style={{ width: 220, opacity: 0.5 }}>
                        Ngày phát hành: {moment.duration(moment().diff(infoMusic.createdAt)).humanize()} ago
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleAddMyMusics(infoMusic)} style={{ padding: 8 }}>
                    <AntDesign name='pluscircleo' size={24} color='#917FB3' />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  availableMusicContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    padding: 18,
    marginTop: -32,
  },
  renderMusic: {
    position: 'relative',
  },
  btnClose: {
    position: 'absolute',
    right: 8,
  },
  listMusicAvailable: {
    height: '85%',
    width: '100%',
    marginTop: 30,
    backgroundColor: '#fff',
  },
  listMusicAvailable_ing: {
    height: '74%',
    width: '100%',
    marginTop: 30,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoMusic: {
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
    height: 75,
    width: 75,
    borderRadius: 10,
  },
  category: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  categoryItem: {
    padding: 10,
    margin: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 20,
  },
  categoryItemActive: {
    backgroundColor: '#9b15c7',
    padding: 10,
    margin: 8,
    borderRadius: 20,
  },
  text: {
    color: '#000',
  },
  textActive: {
    color: '#fff',
  },
});

export default AvailableMusic;
