import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

export default function PlayMusic({ song, isPlaying, setIsPlaying }) {
  const [isPlayingSound, setIsPlayingSound] = useState(isPlaying);
  const [sound, setSound] = useState();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const playSound = async () => {
    try {
      setIsPlayingSound(!isPlayingSound);
      setIsPlaying(!isPlaying);
      const { sound } = await Audio.Sound.createAsync({ uri: song.src_music }, { shouldPlay: true });
      setSound(sound);
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

  useEffect(() => {
    const playSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri: song.src_music });
        setSound(sound);
        await sound.playAsync();
        isPlayingSound ? sound.playAsync() : sound.pauseAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
          if (status.isLoaded && !status.isPlaying && status.positionMillis === status.durationMillis) {
            setIsPlayingSound(false);
            setIsPlaying(false);
          }
        });
      } catch (error) {
        throw error;
      }
    };
    playSound();
  }, []);

  function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  async function seekTo(position) {
    await sound.setPositionAsync(position);
  }

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  Animated.loop(
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 5000,
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
          <TouchableOpacity style={{ padding: 8 }}>
            <FontAwesome name='backward' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={() => {
              playSound();
              if (isPlayingSound) {
                setIsPlayingSound(false);
              }
            }}
          >
            {isPlayingSound ? (
              <AntDesign name='pausecircleo' size={24} color='black' />
            ) : (
              <AntDesign name='playcircleo' size={24} color='black' />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 8 }}>
            <FontAwesome name='forward' size={24} color='black' />
          </TouchableOpacity>
        </View>
      </View>
      <Slider
        style={{ width: '100%', position: 'absolute', bottom: 4 }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor='#FFFFFF'
        maximumTrackTintColor='#000000'
        thumbTintColor='#FFFFFF'
        onSlidingComplete={seekTo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    backgroundColor: '#D6E8DB',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    top: 630,
    alignItems: 'center',
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
