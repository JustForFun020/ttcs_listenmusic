import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import HomeFooter from '../Home/HomeFooter';
import MyMusic from './MyMusic';
import { newMusicUrl, topFavoriteUrl, topViewUrl } from '../../Api/listmusic';
import Header from '../Home/HomeDetail/Header';
import PlayMusic from '../PlayMusic';

const Personal = () => {
  const [newMusic, setNewMusic] = useState([]);
  const [topFavoritesMusic, setTopFavoritesMusic] = useState([]);
  const [topViewsMusic, setTopViewsMusic] = useState([]);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    Promise.all([fetch(newMusicUrl), fetch(topFavoriteUrl), fetch(topViewUrl)])
      .then((respone) => Promise.all(respone.map((res) => res.json())))
      .then((data) => {
        setNewMusic(data[0]);
        setTopFavoritesMusic(data[1]);
        setTopViewsMusic(data[2]);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

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

export default Personal;
