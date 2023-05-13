import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeFooter from '../Home/HomeFooter';
import MyMusic from './MyMusic';
import { newMusicUrl, topFavoriteUrl, topViewUrl } from '../../Api/listmusic';
import Header from '../Home/HomeDetail/Header';

const Personal = () => {
  const [newMusic, setNewMusic] = useState([]);
  const [topFavoritesMusic, setTopFavoritesMusic] = useState([]);
  const [topViewsMusic, setTopViewsMusic] = useState([]);
  const [logout, setLogout] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetch(newMusicUrl), fetch(topFavoriteUrl), fetch(topViewUrl)])
      .then((respone) => Promise.all(respone.map((res) => res.json())))
      .then((data) => {
        setNewMusic(data[0]);
        setTopFavoritesMusic(data[1]);
        setTopViewsMusic(data[2]);
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <Text style={styles.loadingText}>Loading....</Text>
        <ActivityIndicator size='small' color='#0000ff' />
      </SafeAreaView>
    );
  }

  const dataNewMusic = _.get(newMusic, 'data');
  const dataTopFavorite = _.get(topFavoritesMusic, 'data');
  const dataTopView = _.get(topViewsMusic, 'data');

  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <Header logout={logout} setLogout={setLogout} />
      <MyMusic news={dataNewMusic} favorite={dataTopFavorite} view={dataTopView} logout={logout} />
      <HomeFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading: {
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingText: {
    fontSize: 20,
  },
});

export default Personal;
