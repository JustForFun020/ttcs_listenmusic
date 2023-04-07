import { SafeAreaView, StyleSheet } from "react-native";
import HomeFooter from "./HomeFooter";
import HomeDetails from "./HomeDetail/HomeDetailsContainer";

function HomeContainer() {
  return (
    <SafeAreaView style={style.home}>
      <HomeDetails />
      <HomeFooter />
    </SafeAreaView>
  );
}

export default HomeContainer;

const style = StyleSheet.create({
  home: {
    position: "relative",
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(85, 36, 96, 0.1)",
  },
});
