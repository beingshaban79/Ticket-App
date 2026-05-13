import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end", // bottom sheet behavior
  },

  sheet: {
    width: "100%",
    backgroundColor: "#f8f6f6",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 30,
    alignItems: "center",
  },

  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(234,179,8,0.2)", // yellow/20
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    fontSize: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: "#181111",
  },

  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 20,
  },

  buttonContainer: {
    width: "100%",
  },

  primaryButton: {
    height: 48,
    backgroundColor: "#ec1313",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },

  secondaryButton: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryText: {
    fontWeight: "700",
    color: "#181111",
  },
});