import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.04,
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  profileImage: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 50,
  },

  name: {
    fontSize: width * 0.04,
    fontWeight: "600",
  },

  id: {
    fontSize: width * 0.03,
    color: "#757575",
  },

  welcome: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    paddingHorizontal: width * 0.04,
  },

  sectionTitle: {
    fontSize: width * 0.03,
    color: "#9e9e9e",
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.04,
  },

  statusCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.04,
  },

  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  statusIcon: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 10,
  },

  statusText: {
    fontSize: width * 0.04,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#9e9e9e",
  },

  cardContainer: {
    padding: width * 0.04,
    gap: 15,
  },
});