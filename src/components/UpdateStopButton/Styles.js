import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  btn: {
    backgroundColor: "#ddeeff",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  text: {
    color: "#137fec",
    fontSize: width * 0.042,
    fontWeight: "700",
  },
});
