import _ from 'lodash';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

function Chart({ items }) {
  const checkingRankStyles = (song) => {
    if (song.rakingStatus === 0) {
      return [styles.rankingText, styles.unchaned];
    } else if (song.rakingStatus > 0) {
      return [styles.rankingText, styles.incre];
    } else {
      return [styles.rankingText, styles.decr];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chartContainer}>
        {_.map(items, (song, k) => {
          return (
            <View style={styles.chart}>
              <Text style={checkingRankStyles(song)} numberOfLines={1}>
                {k + 1}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: song.thumbnail }} style={styles.image} />
                <View>
                  <Text style={[styles.textWidth, { marginBottom: 4 }]} numberOfLines={1}>
                    {song.title}
                  </Text>
                  <Text style={[styles.textWidth, { opacity: 0.5 }]} numberOfLines={1}>
                    {song.artistsNames}
                  </Text>
                </View>
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.textWidth, { marginBottom: 4 }]} numberOfLines={1}>
                  Score: {song.score}
                </Text>
                <View style={{ flexDirection: 'row', width: 100, alignItems: 'center' }}>
                  <Text numberOfLines={1} style={{ color: '#FF8787' }}>
                    Status: <Text style={checkingRankStyles(song)}>{song.rakingStatus}</Text>
                  </Text>
                  {song.rakingStatus === 0 ? (
                    <FontAwesome5 name='equals' size={15} color='black' style={{ marginLeft: 4 }} />
                  ) : song.rakingStatus > 0 ? (
                    <AntDesign name='caretup' size={15} color='black' style={{ marginLeft: 4 }} />
                  ) : (
                    <AntDesign name='caretdown' size={15} color='black' style={{ marginLeft: 4 }} />
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default Chart;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  chartContainer: {
    paddingBottom: 50,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 450,
    alignItems: 'center',
    marginBottom: 20,
  },
  textWidth: {
    width: 180,
    color: '#FF8787',
  },
  image: {
    width: 55,
    height: 55,
    marginRight: 8,
    borderRadius: 12,
  },
  rankingText: {
    width: 34,
    marginRight: 4,
  },
  incre: {
    color: '#16FF00',
  },
  decr: {
    color: '#DF2E38',
  },
  unchaned: {
    color: 'white',
  },
});
