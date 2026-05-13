import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../components/Button/Button";
import AppInput from "../../components/TextInput/TextInput";
import styles from "./Styles";

const OwnerLogin = ({ navigation }) => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>

          {/* Logo */}
          <View style={styles.logoWrapper}>
            <Text style={styles.logoIcon}>🚌</Text>
          </View>

          <Text style={styles.title}>Owner Login</Text>
          <Text style={styles.subtitle}>Welcome back. Manage your fleet.</Text>

          {/* Card */}
          <View style={styles.card}>

            <Text style={styles.label}>Email / Username</Text>
            <AppInput
              icon="person"
              placeholder="Enter your email or username"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.inputSpacing}
            />

            <Text style={styles.label}>Password</Text>
            <AppInput
              icon="lock"
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.inputSpacing}
            />

            <TouchableOpacity
              style={styles.forgot}
              onPress={() => navigation?.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <AppButton label="Login" variant="primary" size="md" onPress={() => {}} />
          </View>

          <Text style={styles.footer}>
            Don't have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation?.navigate("OwnerRegister")}
            >
              Sign Up
            </Text>
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OwnerLogin;
