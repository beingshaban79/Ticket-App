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
    backgroundColor: "#137fec",
    borderRadius: 16,
   
  },
  backBtn: {
    padding: 4,
    width: 32,
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#fff",
  },
  scrollContent: {
    paddingVertical: 24,
    paddingBottom: 100,
  },
  button:{
 width: '60%',
    borderRadius: 100,
    alignSelf:'center',
    padding:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: "#f2f3f5",
    padding: width * 0.05,
  },
  
});
