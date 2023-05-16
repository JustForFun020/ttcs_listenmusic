import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _, { isArray, last } from 'lodash';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Slide from './Slider';
import BodyDeatils from './BodyDeatils';
import { homeUrl } from '../../../Api/home';

function HomeDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const fetchUrl = await fetch(homeUrl);
      const res = await fetchUrl.json();
      setData(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  const datas = _.get(data, 'data');
  const item = _.get(datas, 'items');

  const newSongs = _.filter(item, (item) => item.sectionType === 'new-release');
  const slides = _.filter(item, (item) => item.sectionType === 'banner');

  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <Header logout={logout} setLogout={setLogout} />
        <Slide slides={slides} loading={loading} logout={logout} />
        <BodyDeatils newSongs={newSongs} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeDetails;
