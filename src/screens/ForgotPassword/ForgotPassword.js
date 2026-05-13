import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AppButton from "../../components/Button/Button";
import AppInput from "../../components/TextInput/TextInput";
import styles from "./Styles";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.safe}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Password</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="lock-reset" size={36} color="#137fec" />
        </View>

        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          No problem! Enter the email associated with your account and we'll send
          you a link to reset your password.
        </Text>

        <Text style={styles.label}>Email Address</Text>
        <AppInput
          icon="email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.inputSpacing}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <AppButton
          label="Send Reset Link"
          variant="primary"
          size="md"
          onPress={() => {}}
          style={styles.btnSpacing}
        />
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={styles.backText}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default ForgotPassword;
