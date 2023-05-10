import { Audio } from 'expo-av';

export const playSound = async (song, isPlayingSound, setIsPlayingSound, setSound, setIsPlaying) => {
  try {
    setIsPlayingSound(!isPlayingSound);
    setIsPlaying(false);
    const { sound } = await Audio.Sound.createAsync({ uri: song.src_music });
    setSound(sound);
    isPlayingSound ? sound.pauseAsync() : sound.playAsync();
  } catch (error) {
    throw error;
  }
};
