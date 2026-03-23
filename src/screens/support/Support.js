import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Support = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Support</Text>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f6f7f8" },
  text: { fontSize: 22, fontWeight: "600", color: "#212121" },
});
