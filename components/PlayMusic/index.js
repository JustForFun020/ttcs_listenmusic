import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function PlayMusic({ song, isPlaying }) {
  const [isPlayingSound, setIsPlayingSound] = useState(isPlaying);
  const [sound, setSound] = useState();

  const playSound = async () => {
    try {
      setIsPlayingSound(!isPlayingSound);
      const { sound } = await Audio.Sound.createAsync({ uri: song.src_music });
      setSound(sound);
      await sound.playAsync();
      !isPlayingSound ? sound.playAsync() : sound.pauseAsync();
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
  }, [sound]);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  Animated.loop(
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }),
  ).start();

  return (
    <SafeAreaView style={styles.container}>
      <View key={song._id} style={styles.song}>
        <TouchableOpacity style={styles.infoAMusic}>
          <Animated.Image style={[styles.image, { transform: [{ rotate }] }]} source={{ uri: song.image_music }} />
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
          <TouchableOpacity style={{ padding: 8 }} onPress={playSound}>
            {isPlaying ? (
              <AntDesign name='pausecircleo' size={24} color='black' />
            ) : (
              <AntDesign name='playcircleo' size={24} color='black' />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 8 }}>
            <AntDesign name='hearto' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 8 }}>
            <AntDesign name='closecircleo' size={24} color='red' />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: '#D6E8DB',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    top: 638,
  },
  song: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
  },
  infoAMusicWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoAMusic: {
    flexDirection: 'row',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
    transform: [{ rotate: '45deg' }],
  },
});
