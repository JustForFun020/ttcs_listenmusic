import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Slide = ({ slides, loading, logout }) => {
  const [active, setActive] = useState(0);

  const navigation = useNavigation()

  const changeActive = ({ nativeEvent }) => {
    const slides = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slides !== active) {
      setActive(slides);
    }
  };

  if (loading) {
    return (
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
    );
  }

  return (
    <SafeAreaView style={styles.slideContainer}>
      {logout && <TouchableOpacity style={styles.logout} onPress={() => navigation.navigate("SignIn")} >
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>}
      {slides &&
        _.map(slides, (slide) => (
          <View style={styles.slide}>
            <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
              {_.map(slide.items, (banner) => (
                <Image
                  key={banner.banner}
                  source={{ uri: banner.banner }}
                  style={{
                    width: 329,
                    height: 250,
                    resizeMode: 'contain',
                  }}
                />
              ))}
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
              }}
            >
              {_.map(slide.items, (i, k) => (
                <Text key={k} style={i == active ? styles.activeText : styles.text}>
                  ⬤
                </Text>
              ))}
            </View>
          </View>
        ))}
    </SafeAreaView>
  );
};

export default Slide;

const styles = StyleSheet.create({
  slideContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    position: 'relative',
  },
  slide: {
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  scroll: {},
  text: {
    color: '#888',
    margin: 3,
  },
  activeText: {
    color: '#fff',
    margin: 3,
  },
  logout: {
    position: 'absolute',
    left: 10,
    padding: 10,
    backgroundColor: '#3C486B',
    zIndex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#F9D949",
    borderStyle: 'dashed'
  },
  logoutText: {
    color: '#fff',
  },
});
