import _ from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { chartHomeUrl } from '../../Api/chart';
import { LinearGradient } from 'expo-linear-gradient';
import Chart from './Chart';
import HomeFooter from '../Home/HomeFooter';
import Header from '../Home/HomeDetail/Header';

export default function ChartContainer() {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [logout, setLogout] = useState(false);

  const fetchChartData = async () => {
    setLoading(true);
    try {
      setLoading(false);
      const fetchData = await fetch(chartHomeUrl);
      const res = await fetchData.json();
      setChartData(res);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  useEffect(() => {
    fetchChartData();
  }, []);

  const data = _.get(chartData, 'data');
  const RTChart = _.get(data, 'RTChart');
  const items = _.get(RTChart, 'items');

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View
          style={{
            height: 250,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Text style={{ fontSize: 24, marginRight: 4, color: 'green' }}>Loading...</Text>
          <ActivityIndicator size='small' color='green' />
        </View>
      )}
      <Header logout={logout} setLogout={setLogout} />
      <LinearGradient colors={['#99627A', '#643843']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
        <View style={styles.headerContent}>
          <Text style={styles.content}>Bảng Xếp Hạng</Text>
        </View>
        <ScrollView>
          <Chart items={items} />
        </ScrollView>
      </LinearGradient>
      <HomeFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    height: 60,
    padding: 12,
    backgroundColor: '#FFD3A3',
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
    color: '#E11299',
  },
});
