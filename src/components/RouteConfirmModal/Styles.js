import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },
  sheet: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: width * 0.06,
    paddingTop: 32,
    paddingBottom: 36,
    alignItems: "center",
    width: "100%",
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#e8f1fd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: width * 0.055,
    fontWeight: "800",
    color: "#212121",
    textAlign: "center",
    marginBottom: 12,
  },
  body: {
    fontSize: width * 0.04,
    color: "#757575",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 28,
  },
  bold: {
    fontWeight: "700",
    color: "#212121",
  },
  confirmBtn: {
    width: "100%",
    backgroundColor: "#137fec",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  confirmText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "700",
  },
  cancelBtn: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelText: {
    color: "#212121",
    fontSize: width * 0.045,
    fontWeight: "700",
  },
});
