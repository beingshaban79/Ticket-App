import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  cell: {
    flex: 1,
    backgroundColor: "#f2f3f5",
    borderRadius: 12,
    padding: width * 0.04,
  },
  label: {
    fontSize: width * 0.03,
    color: "#9e9e9e",
    marginBottom: 4,
  },
  value: {
    fontSize: width * 0.05,
    fontWeight: "700",
    color: "#212121",
  },
  fare: {
    color: "#137fec",
  },
});
