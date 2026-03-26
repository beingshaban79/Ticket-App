import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  item: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  itemActive: {
    backgroundColor: "#137fec",
    borderColor: "#137fec",
  },
  label: {
    fontSize: width * 0.033,
    fontWeight: "600",
    color: "#212121",
  },
  labelActive: {
    color: "#fff",
  },
});
