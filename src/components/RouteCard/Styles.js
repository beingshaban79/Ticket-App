import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: width * 0.04,
    marginBottom: 10,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#eef2f7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  routeName: {
    fontSize: width * 0.042,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: width * 0.035,
    color: "#757575",
  },
});
