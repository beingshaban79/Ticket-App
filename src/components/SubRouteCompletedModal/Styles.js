import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)", // bg-black/60
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  container: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },

  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#22c55e20", // success/10
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    fontSize: 32,
    color: "#22c55e",
    fontWeight: "bold",
  },

  textContainer: {
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#101922",
    marginBottom: 6,
    textAlign: "center",
  },

  description: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },

  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#137fec",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
});