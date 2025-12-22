import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    marginTop: 100,
    width: 200,
    height: 200,
    aspectRatio: 1,
    resizeMode: "contain",
    margin: 30,
  },
  main: {
    alignItems: "center",
    width: "100%",
  },
});

export default styles;
