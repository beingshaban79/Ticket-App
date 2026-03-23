import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: width * 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  primaryCard: {
    backgroundColor: "#137fec",
  },
  secondaryCard: {
    backgroundColor: "#e0e0e0",
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  titleWhite: { color: "#fff" },
  titleDark:  { color: "#000" },
  subtitle: {
    fontSize: width * 0.035,
    marginTop: 4,
  },
  subtitleWhite: { color: "#ffffffcc" },
  subtitleDark:  { color: "#616161" },
});
