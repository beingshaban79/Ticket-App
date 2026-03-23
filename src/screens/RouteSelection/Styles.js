import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f3f5",
  },

  // Header — white bg, bold centered title
  header: {
     flexDirection: "row",
     alignItems: "center",
     paddingHorizontal: width * 0.04,
     paddingVertical: height * 0.018,
     backgroundColor: "#fff",
     borderBottomWidth: 1,
     borderBottomColor: "#efefef",
  },
  backBtn: {
    width: 32,
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#212121",
  },
  headerRight: {
    width: 32,
  },

  scrollContent: {
    paddingHorizontal: width * 0.04,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: width * 0.072,
    fontWeight: "800",
    color: "#212121",
    marginTop: height * 0.025,
    marginBottom: 14,
  },

  // Pill-shaped grey search bar
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ebebeb",
    borderRadius: 30,
    paddingHorizontal: 14,
    height: height * 0.062,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
    color: "#9e9e9e",
  },
  searchInput: {
    flex: 1,
    fontSize: width * 0.038,
    color: "#212121",
  },

  emptyText: {
    textAlign: "center",
    color: "#9e9e9e",
    marginTop: 40,
    fontSize: width * 0.04,
  },
});
