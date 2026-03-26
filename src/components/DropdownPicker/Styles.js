import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: width * 0.032,
    color: "#9e9e9e",
    marginBottom: 6,
  },
  picker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: width * 0.04,
    height: height * 0.065,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  value: {
    fontSize: width * 0.042,
    fontWeight: "600",
    color: "#212121",
  },
  placeholder: {
    color: "#9e9e9e",
    fontWeight: "400",
  },

  // Modal
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },
  sheet: {
    backgroundColor: "#fff",
    borderRadius: 18,
    width: "100%",
    maxHeight: height * 0.6,
    paddingBottom: 12,
    overflow: "hidden",
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.045,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sheetTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#212121",
  },

  // Search
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f3f5",
    borderRadius: 10,
    marginHorizontal: width * 0.04,
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 44,
  },
  searchIcon: {
    color: "#9e9e9e",
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: width * 0.038,
    color: "#212121",
  },

  // Items
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: width * 0.045,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  itemActive: {
    backgroundColor: "#e8f1fd",
  },
  itemText: {
    fontSize: width * 0.04,
    color: "#212121",
  },
  itemTextActive: {
    color: "#137fec",
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    color: "#9e9e9e",
    padding: 20,
    fontSize: width * 0.038,
  },
});
