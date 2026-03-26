import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f3f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.04,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  menuBtn: {
    padding: 4,
    width: 32,
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#212121",
  },
  scrollContent: {
    padding: width * 0.04,
    paddingBottom: 100,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: width * 0.04,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});
