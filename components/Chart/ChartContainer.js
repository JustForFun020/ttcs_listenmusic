// import { View, Text, Button } from 'react-native';
// import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Audio } from 'expo-av';
// import Slider from '@react-native-community/slider';
// import { useState, useEffect } from 'react';
// import HomeFooter from '../Home/HomeFooter';

import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import HomeFooter from '../Home/HomeFooter';

export default function ChartContainer() {
  const [sound, setSound] = useState();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    if (sound === undefined) {
      const { sound } = await Audio.Sound.createAsync({
        uri: 'https://res.cloudinary.com/phuockaito/video/upload/v1665718369/audio/vprjrxndx00lwyrnzjud.mp3',
      });
      setSound(sound);
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  async function pauseSound() {
    await sound.pauseAsync();
    setIsPlaying(false);
  }

  async function seekTo(position) {
    await sound.setPositionAsync(position);
  }

  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync({
        uri: 'https://res.cloudinary.com/phuockaito/video/upload/v1665718369/audio/vprjrxndx00lwyrnzjud.mp3',
      });
      setSound(sound);
      sound.setOnPlaybackStatusUpdate((status) => {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis);
      });
    }

    loadSound();

    return () => {
      if (sound !== undefined) {
        sound.unloadAsync();
      }
    };
  }, []);

  function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isPlaying ? <Text style={{ fontSize: 20 }}>Playing</Text> : <Text style={{ fontSize: 20 }}>Paused</Text>}
      <Slider
        style={{ width: 300, flexDirection: 'column' }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor='#FFFFFF'
        maximumTrackTintColor='#000000'
        thumbTintColor='#FFFFFF'
        onSlidingComplete={seekTo}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
        <Text>{formatTime(position)}</Text>
        <Text>{formatTime(duration)}</Text>
      </View>
      {isPlaying ? <Button title='Pause' onPress={pauseSound} /> : <Button title='Play' onPress={playSound} />}
      <HomeFooter />
    </View>
  );
}
