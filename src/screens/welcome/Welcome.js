import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginConductor, clearError } from "../../redux/slices/authSlice";
import styles from "./Styles";
import AppInput from "../../components/TextInput/TextInput";
import AppButton from "../../components/Button/Button";

const Welcome = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Navigate to App on successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace("App");
    }
  }, [isAuthenticated]);

  // Show backend message in alert — no custom text
  useEffect(() => {
    if (error) {
      Alert.alert("", error, [
        { text: "OK", onPress: () => dispatch(clearError()) },
      ]);
    }
  }, [error]);

  const handleLogin = () => {
    dispatch(loginConductor({ username: username.trim(), password }));
  };

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
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logoBox}>
                <MaterialIcons name="directions-bus" size={40} color="#fff" />
              </View>
            </View>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Please login to your conductor account
            </Text>

            {/* Inputs */}
            <View style={styles.inputContainer}>
              <AppInput
                icon="badge"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <AppInput
                icon="lock"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
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
              loading={isLoading}
              disabled={isLoading}
              onPress={handleLogin}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Welcome;
