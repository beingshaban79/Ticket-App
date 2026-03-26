import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    backgroundColor: "#e8f1fd",
    borderRadius: 14,
    padding: width * 0.04,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  cell: {
    flex: 1,
  },
  cellFull: {},
  label: {
    fontSize: width * 0.03,
    color: "#757575",
    marginBottom: 2,
  },
  value: {
    fontSize: width * 0.042,
    fontWeight: "700",
    color: "#212121",
  },
});
