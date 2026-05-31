import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f3f5",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 24,
    paddingHorizontal: width * 0.04,
    paddingBottom: width * 0.04,
  },
  // Footer sits naturally — no absolute positioning
  footer: {
    backgroundColor: "#f2f3f5",
    padding: width * 0.05,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    gap: 10,
  },
});
