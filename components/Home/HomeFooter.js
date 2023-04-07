import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  MaterialIcons,
  AntDesign,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function HomeFooter() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={style.homeFooter}>
      <TouchableOpacity
        style={style.listItem}
        onPress={() => navigation.navigate("Personal")}
      >
        <MaterialIcons
          name="library-music"
          size={20}
          color="black"
          style={{ opacity: 0.7 }}
        />
        <Text style={style.listItemText}>Cá nhân</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.listItem}
        onPress={() => navigation.navigate("HomeContainer")}
      >
        <MaterialIcons
          name="explore"
          size={20}
          color="black"
          style={{ opacity: 0.7 }}
        />
        <Text style={style.listItemText}>Khám Phá</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.listItem}>
        <AntDesign
          name="areachart"
          size={20}
          color="black"
          style={{ opacity: 0.7 }}
        />
        <Text style={style.listItemText}>#Zingchart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.listItem}>
        <Feather
          name="radio"
          size={20}
          color="black"
          style={{ opacity: 0.7 }}
        />
        <Text style={style.listItemText}>Radio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.listItem}>
        <FontAwesome
          name="newspaper-o"
          size={20}
          color="black"
          style={{ opacity: 0.7 }}
        />
        <Text style={style.listItemText}>Theo dõi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeFooter;

const style = StyleSheet.create({
  homeFooter: {
    height: 50,
    position: "absolute",
    width: "100%",
    backgroundColor: "#F2F2F2",
    bottom: 0,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  listItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  listItemText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
