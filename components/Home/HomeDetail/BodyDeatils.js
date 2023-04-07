import _ from "lodash";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const BodyDeatils = ({ newSongs }) => {
  const [activeType, setActivetype] = useState(0);

  const a = _.map(newSongs, (item) => item.items);
  const newSongTypes = ["Tất cả", "Vpop", "Quốc Tế"];
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
            Nhạc Mới Phát Hành{" "}
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
