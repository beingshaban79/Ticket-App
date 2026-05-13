import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AppButton from "../../components/Button/Button";
import AppInput from "../../components/TextInput/TextInput";
import styles from "./Styles";

const OwnerRegister = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "", email: "", password: "", company: "", phone: "",
  });

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <SafeAreaView style={styles.safe}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.pageTitle}>Create Your Owner Account</Text>

        {/* Personal Info */}
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <Text style={styles.label}>Full Name</Text>
        <AppInput
          icon="person"
          placeholder="Enter your full name"
          value={form.name}
          onChangeText={set("name")}
          style={styles.inputSpacing}
        />

        <Text style={styles.label}>Email Address</Text>
        <AppInput
          icon="email"
          placeholder="Enter your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={set("email")}
          style={styles.inputSpacing}
        />

        <Text style={styles.label}>Password</Text>
        <AppInput
          icon="lock"
          placeholder="Enter your password"
          secureTextEntry
          value={form.password}
          onChangeText={set("password")}
          style={styles.inputSpacing}
        />

        {/* Company Info */}
        <Text style={styles.sectionTitle}>Company Information</Text>

        <Text style={styles.label}>Company Name</Text>
        <AppInput
          icon="business"
          placeholder="Enter your company name"
          value={form.company}
          onChangeText={set("company")}
          style={styles.inputSpacing}
        />

        <Text style={styles.label}>Business Phone Number</Text>
        <AppInput
          icon="phone"
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={set("phone")}
          style={styles.inputSpacing}
        />

        {/* Footer */}
        <View style={styles.footer}>
          <AppButton
            label="Create Account"
            variant="primary"
            size="md"
            onPress={() => {}}
            style={styles.btnSpacing}
          />
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.link} onPress={() => navigation?.goBack()}>
              Sign In
            </Text>
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default OwnerRegister;
