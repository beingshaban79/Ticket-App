import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, fetchProfile } from '../../redux/slices/profileSlice';
import styles, { COLORS } from './Styles';

// ─── Sub-components ───────────────────────────────────────────────────────────

const LockedField = ({ label, value, icon, hint }) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.lockedWrapper}>
      <Text style={styles.lockedIcon}>{icon}</Text>
      <Text style={styles.lockedText}>{value}</Text>
      <MaterialIcons name="lock" size={16} color={COLORS.zinc500} />
    </View>
    {hint ? <Text style={styles.fieldHint}>{hint}</Text> : null}
  </View>
);

const EditableField = ({ label, value, onChange, keyboardType, iconName, required }) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>
        {label}{required ? <Text style={{ color: '#dc2626' }}> *</Text> : null}
      </Text>
      <View style={[styles.inputWrapper, focused && styles.inputWrapperFocused]}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType || 'default'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
        />
        <MaterialIcons
          name={iconName || 'edit'}
          size={18}
          color={focused ? COLORS.primary : COLORS.outlineVariant}
        />
      </View>
    </View>
  );
};

const NavItem = ({ iconName, label, active }) => (
  <TouchableOpacity style={[styles.navItem, active && styles.navItemActive]}>
    <MaterialIcons
      name={iconName}
      size={22}
      color={active ? COLORS.primary : COLORS.onSurfaceVariant}
    />
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { profile, isSaving } = useSelector((state) => state.profile);

  // Derive initial values from API response
  const initName    = profile?.name                                          || '';
  const initEmail   = profile?.contact_information?.email    || profile?.email          || '';
  const initPhone   = profile?.contact_information?.mobile_number || profile?.mobile_number || '';
  const initAddress = profile?.address                                       || '';
  const initPhoto   = profile?.profile_picture_url                           || '';

  const conductorId = profile?.conductor_code || (profile?.id ? `C-${profile.id}` : '—');
  const busInfo     = profile?.conductor_details?.assigned_bus
    ? `${profile.conductor_details.assigned_bus.bus_name}  |  ${profile.conductor_details.assigned_bus.bus_number}`
    : profile?.bus ? `${profile.bus.bus_name}  |  ${profile.bus.bus_number}` : '—';
  const routeInfo   = profile?.assigned_route?.route_name || '—';

  const [fullName,   setFullName]   = useState(initName);
  const [emailVal,   setEmailVal]   = useState(initEmail);
  const [phoneVal,   setPhoneVal]   = useState(initPhone);
  const [addressVal, setAddressVal] = useState(initAddress);
  const [photoUri,   setPhotoUri]   = useState(initPhoto);
  const [saveState,  setSaveState]  = useState('idle'); // idle | success

  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Sync state if profile reloads
  useEffect(() => {
    setFullName(initName);
    setEmailVal(initEmail);
    setPhoneVal(initPhone);
    setAddressVal(initAddress);
    setPhotoUri(initPhoto);
  }, [profile]);

  // ── Pick photo ──────────────────────────────────────────
  const handlePickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photo library.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  // ── Validate ────────────────────────────────────────────
  const validate = () => {
    if (!fullName.trim())   { Alert.alert('', 'Full name is required.');     return false; }
    if (!emailVal.trim())   { Alert.alert('', 'Email address is required.'); return false; }
    if (!phoneVal.trim())   { Alert.alert('', 'Phone number is required.');  return false; }
    if (!addressVal.trim()) { Alert.alert('', 'Address is required.');       return false; }
    return true;
  };

  // ── Save ────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;

    const payload = {
      name:                fullName.trim(),
      email:               emailVal.trim(),
      mobile_number:       phoneVal.trim(),
      address:             addressVal.trim(),
      profile_picture_url: photoUri || initPhoto,
    };

    const result = await dispatch(updateProfile(payload));

    if (updateProfile.fulfilled.match(result)) {
      setSaveState('success');
      // Refresh profile from server
      dispatch(fetchProfile());
      setTimeout(() => {
        setSaveState('idle');
        navigation?.goBack();
      }, 1200);
    } else {
      Alert.alert('', result.payload || 'Failed to save profile.');
    }
  };

  const handleCancel = () => {
    setFullName(initName);
    setEmailVal(initEmail);
    setPhoneVal(initPhone);
    setAddressVal(initAddress);
    setPhotoUri(initPhoto);
    navigation?.goBack();
  };

  // ── Avatar display ──────────────────────────────────────
  // Use local picked photo, or API URL if valid, or generated fallback
  const isValidUrl = (url) => url && (url.startsWith('file') || (url.startsWith('http') && !url.includes('example.com')));
  const avatarSource = photoUri && (photoUri.startsWith('file') || isValidUrl(photoUri))
    ? { uri: photoUri }
    : { uri: `https://ui-avatars.com/api/?background=005baf&color=fff&size=128&name=${encodeURIComponent(fullName || 'C')}` };

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.headerBackBtn} onPress={() => navigation?.goBack()}>
            <MaterialIcons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>
        <TouchableOpacity style={styles.headerMoreBtn}>
          <MaterialIcons name="more-vert" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={handlePickPhoto} activeOpacity={0.85}>
            <Image source={avatarSource} style={styles.avatar} resizeMode="cover" />
            <View style={styles.cameraBadge}>
              <MaterialIcons name="camera-alt" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.avatarHint}>Tap to change photo</Text>
        </View>

        {/* Form — editable fields */}
        <View style={styles.formSection}>
          <EditableField label="Full Name"     value={fullName}   onChange={setFullName}   iconName="person"      required />
          <EditableField label="Email Address" value={emailVal}   onChange={setEmailVal}   iconName="email"       keyboardType="email-address" required />
          <EditableField label="Phone Number"  value={phoneVal}   onChange={setPhoneVal}   iconName="phone"       keyboardType="phone-pad" required />
          <EditableField label="Address"       value={addressVal} onChange={setAddressVal} iconName="location-on" required />

          {/* Locked fields */}
          <LockedField label="Conductor Code" value={conductorId} icon="🪪"
            hint="Assigned by the transit authority. Cannot be modified." />
          <LockedField label="Assigned Bus"   value={busInfo}     icon="🚌" />
          <LockedField label="Assigned Route" value={routeInfo}   icon="🗺️" />

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                style={[
                  styles.saveBtn,
                  saveState === 'success' ? styles.saveBtnSuccess : styles.saveBtnDefault,
                ]}
                onPress={handleSave}
                disabled={isSaving}
                activeOpacity={0.85}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.saveBtnText}>
                    {saveState === 'success' ? '✓  Saved!' : 'Save Changes'}
                  </Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        <NavItem iconName="directions-bus" label="Fleet"   />
        <NavItem iconName="alt-route"      label="Routes"  />
        <NavItem iconName="notifications"  label="Alerts"  />
        <NavItem iconName="person"         label="Profile" active />
      </View>

    </SafeAreaView>
  );
};

export default EditProfile;
