import _ from "lodash";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import moment from "moment";

const BodyDeatils = ({ newSongs }) => {
  const [activeType, setActivetype] = useState(0);
  const [idSong, setIdSong] = useState("");
  const newSongTypes = ["Tất cả", "Vpop", "Quốc Tế"];

  const itemsSong = _.map(newSongs, (item) => item.items);
  const allMusic = _.map(itemsSong, (item) => item.all);
  const vpopMusic = _.map(itemsSong, (item) => item.vPop);
  const otherMusic = _.map(itemsSong, (item) => item.others);

  const renderMusic = (music) => {
    return (
      <View>
        {_.map(music, (item) => {
          return (
            <View>
              {_.map(item, (song) => {
                return (
                  <TouchableOpacity
                    style={{ flexDirection: "row", marginTop: 20 }}
                    onPress={() => setIdSong(song.encodeId)}
                  >
                    <Image
                      source={{ uri: song.thumbnail }}
                      style={{ width: 80, height: 70, borderRadius: 10 }}
                    />
                    <View style={{ paddingLeft: 10 }}>
                      <Text numberOfLines={1} style={{ width: 300 }}>
                        {song.title}
                      </Text>
                      <Text
                        style={{ width: 250, opacity: 0.5 }}
                        numberOfLines={1}
                      >
                        {song.artistsNames}
                      </Text>
                      <Text style={{ opacity: 0.5 }}>
                        {moment().calendar(song.releaseDate)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ marginLeft: 10, marginRight: 10, marginBottom: 60 }}>
      <View style={styles.OptionMusiccontainer}>
        <TouchableOpacity style={styles.optionMusic}>
          <View style={[styles.iconWrapper, { backgroundColor: "#65CD60" }]}>
            <Feather name="music" size={24} color="white" />
          </View>
          <Text>Nhạc Mới</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionMusic}>
          <View style={[styles.iconWrapper, { backgroundColor: "#805570" }]}>
            <AntDesign name="switcher" size={24} color="white" />
          </View>
          <Text>Thể Loại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionMusic}>
          <View style={[styles.iconWrapper, { backgroundColor: "#EEC23F" }]}>
            <AntDesign name="staro" size={24} color="white" />
          </View>
          <Text>Top 100</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionMusic}>
          <View style={[styles.iconWrapper, { backgroundColor: "#840B0F" }]}>
            <MaterialCommunityIcons
              name="radio-tower"
              size={24}
              color="white"
            />
          </View>
          <Text>PodCast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionMusic}>
          <View style={[styles.iconWrapper, { backgroundColor: "#1F1F98" }]}>
            <Feather name="video" size={24} color="white" />
          </View>
          <Text>TopMV</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textNewSong}>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Mới Phát Hành{" "}
            <FontAwesome name="chevron-right" size={16} color="black" />
          </Text>
        </View>
        <View style={styles.newSong}>
          {_.map(newSongTypes, (item, k) => {
            return (
              <TouchableOpacity
                onPress={() => setActivetype(k)}
                style={
                  activeType === k ? styles.activeType : styles.newSongType
                }
                key={item}
              >
                <Text
                  style={activeType === k ? styles.textActive : styles.textType}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          {activeType === 0
            ? renderMusic(allMusic)
            : activeType === 1
            ? renderMusic(vpopMusic)
            : renderMusic(otherMusic)}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BodyDeatils;

const styles = StyleSheet.create({
  OptionMusiccontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  optionMusic: {
    alignItems: "center",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  textNewSong: {},
  newSong: {
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-between",
    width: 300,
  },
  newSongType: {
    height: 30,
    width: 90,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  activeType: {
    backgroundColor: "#9b15c7",
    height: 30,
    width: 90,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  textType: {
    color: "#000",
  },
  textActive: {
    color: "#fff",
  },
});
