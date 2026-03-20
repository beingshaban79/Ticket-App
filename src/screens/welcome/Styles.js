import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.04,
  },
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.06,
  },

  logoContainer: {
    marginBottom: height * 0.04,
  },

  logoBox: {
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor: "#137fec",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 5,
    textAlign: "center",
  },

  subtitle: {
    fontSize: width * 0.04,
    color: "#757575",
    marginBottom: height * 0.04,
    textAlign: "center",
  },

  inputContainer: {
    width: "100%",
    gap: 15,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    height: height * 0.07,
  },

  icon: {
    marginRight: 10,
    color: "#9e9e9e",
  },

  input: {
    flex: 1,
    fontSize: width * 0.04,
    color: "#212121",
  },

  forgotContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
  },

  forgotText: {
    color: "#137fec",
    fontSize: width * 0.035,
    fontWeight: "500",
  },

  button: {
    width: "100%",
    backgroundColor: "#137fec",
    height: height * 0.07,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.04,
  },

  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },

  footer: {
    marginTop: height * 0.05,
    alignItems: "center",
  },

  footerText: {
    fontSize: width * 0.03,
    color: "#9e9e9e",
  },
});