import { StyleSheet,Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },

  header: {
    padding: 16,
    alignItems: "center",
  },
headerRow:{

     flexDirection: "row",
     alignItems: "center",
     paddingHorizontal: width * 0.04,
     paddingVertical: height * 0.018,
     backgroundColor: "#fff",
     borderBottomWidth: 1,
     borderBottomColor: "#efefef",

},
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0d141b",
  },

  route: {
    fontSize: 16,
    marginTop: 6,
    color: "#0d141b",
  },

  meta: {
    fontSize: 13,
    color: "#4c739a",
    marginTop: 4,
  },

  content: {
    padding: 16,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },

  cardSelected: {
    borderColor: "#137fec",
    borderWidth: 2,
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#137fec20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  icon: {
    fontSize: 20,
    color: "#137fec",
    lineHeight: 22,
    textAlign: "center",
  },

  cardText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0d141b",
  },

  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },

  radioSelected: {
    backgroundColor: "#137fec",
    borderColor: "#137fec",
  },

  check: {
    color: "#fff",
    fontSize: 14,
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: "#137fec",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonDisabled: {
    backgroundColor: "#ccc",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonTextDisabled: {
    color: "#888",
  },
});