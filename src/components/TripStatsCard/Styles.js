import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    backgroundColor: "#f2f3f5",
    borderRadius: 14,
    padding: width * 0.04,
    marginBottom: 20,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  rowSingle: {},
  cell: {
    flex: 1,
  },
  label: {
    fontSize: width * 0.03,
    color: "#9e9e9e",
    marginBottom: 2,
  },
  value: {
    fontSize: width * 0.042,
    fontWeight: "700",
    color: "#212121",
  },
});
