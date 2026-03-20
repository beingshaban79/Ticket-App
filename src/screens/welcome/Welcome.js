import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";
import AppInput from "../../components/TextInput/TextInput";
import AppButton from "../../components/Button/Button";

const Welcome = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.logoContainer}>
              <View style={styles.logoBox}>
                <MaterialIcons name="directions-bus" size={40} color="#fff" />
              </View>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Please login to your conductor account
            </Text>
            <View style={styles.inputContainer}>
              <AppInput
                icon="badge"
                placeholder="Employee ID"
                keyboardType="numeric"
              />
              <AppInput
                icon="lock"
                placeholder="Password"
                secureTextEntry
              />
            </View>
            <AppButton
              variant="ghost"
              size="sm"
              label="Forgot Password?"
              style={styles.forgotContainer}
              textStyle={styles.forgotText}
            />
            <AppButton
              variant="primary"
              size="md"
              label="LOGIN"
              style={{ marginTop: 20 }}
              onPress={() => { }}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Welcome;
