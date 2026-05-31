import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/slices/profileSlice";
import styles from "./Style";
import HomeCard from "../../components/HomeCard/HomeCard";

const { width } = Dimensions.get("window");
const MENU_WIDTH = width * 0.72;
const FALLBACK_AVATAR = "https://ui-avatars.com/api/?background=137fec&color=fff&size=128&name=";

const ConductorHome = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector((state) => state.profile);

  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(MENU_WIDTH))[0];

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  // ── Derived values ──
  const name      = profile?.name     || "Conductor";
  const username  = profile?.username || "—";
  const isValidUrl = (url) => url && (url.startsWith('file') || (url.startsWith('http') && !url.includes('example.com')));
  const avatarUri = isValidUrl(profile?.profile_picture_url)
    ? profile.profile_picture_url
    : `${FALLBACK_AVATAR}${encodeURIComponent(name)}`;
  const busNumber = profile?.bus?.bus_number              || null;
  const routeName = profile?.assigned_route?.route_name  || null;
  const hasTrip   = !!routeName;

  // ── Side menu animation ──
  const openMenu = () => {
    setMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 260,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: MENU_WIDTH,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setMenuOpen(false));
  };

  const navigateTo = (screen) => {
    closeMenu();
    setTimeout(() => navigation.navigate(screen), 240);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        {/* Profile section — tap to edit profile */}
        <TouchableOpacity
          style={styles.profileSection}
          onPress={() => navigation.navigate("EditProfile")}
          activeOpacity={0.75}
        >
          {isLoading ? (
            <View style={[styles.profileImage, { justifyContent: "center", alignItems: "center", backgroundColor: "#e8f1fd" }]}>
              <ActivityIndicator size="small" color="#137fec" />
            </View>
          ) : (
            <Image source={{ uri: avatarUri }} style={styles.profileImage} />
          )}
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.id}>@{username}</Text>
          </View>
        </TouchableOpacity>

        {/* Settings — opens side menu */}
        <TouchableOpacity onPress={openMenu} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons name="settings" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.sectionTitle}>CURRENT STATUS</Text>

        <View style={styles.statusCard}>
          <View style={styles.statusLeft}>
            <View style={[styles.statusIcon, hasTrip && { backgroundColor: "#e8f1fd" }]}>
              <MaterialIcons
                name="directions-bus"
                size={22}
                color={hasTrip ? "#137fec" : "#757575"}
              />
            </View>
            <View>
              <Text style={styles.statusText}>
                {hasTrip ? routeName : "No Active Trip"}
              </Text>
              {busNumber && (
                <Text style={[styles.id, { marginTop: 2 }]}>Bus: {busNumber}</Text>
              )}
            </View>
          </View>
          <View style={[styles.dot, { backgroundColor: hasTrip ? "#137fec" : "#9e9e9e" }]} />
        </View>

        <View style={styles.cardContainer}>
          <HomeCard
            variant="primary"
            title="Route Selection"
            subtitle="Start a new trip"
            icon="alt-route"
            onPress={() => navigation.navigate("RouteSelection")}
          />
          <HomeCard
            variant="secondary"
            title="Daily Dashboard"
            subtitle="View today's performance"
            icon="monitor"
            onPress={() => {}}
          />
        </View>
      </ScrollView>

      {/* ── Side Menu Modal ── */}
      <Modal visible={menuOpen} transparent animationType="none" onRequestClose={closeMenu}>

        {/* Dim backdrop */}
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={menuStyles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Sliding panel from right */}
        <Animated.View
          style={[
            menuStyles.panel,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Menu header — profile info */}
          <View style={menuStyles.menuHeader}>
            <Image source={{ uri: avatarUri }} style={menuStyles.menuAvatar} />
            <Text style={menuStyles.menuName}>{name}</Text>
            <Text style={menuStyles.menuUsername}>@{username}</Text>
          </View>

          {/* Menu items */}
          <View style={menuStyles.menuItems}>
            <TouchableOpacity
              style={menuStyles.menuItem}
              onPress={() => navigateTo("MyProfile")}
              activeOpacity={0.75}
            >
              <View style={menuStyles.menuIconBox}>
                <MaterialIcons name="person" size={22} color="#137fec" />
              </View>
              <Text style={menuStyles.menuItemText}>My Profile</Text>
              <MaterialIcons name="chevron-right" size={20} color="#9e9e9e" />
            </TouchableOpacity>

            <TouchableOpacity
              style={menuStyles.menuItem}
              onPress={() => navigateTo("History")}
              activeOpacity={0.75}
            >
              <View style={menuStyles.menuIconBox}>
                <MaterialIcons name="history" size={22} color="#137fec" />
              </View>
              <Text style={menuStyles.menuItemText}>History</Text>
              <MaterialIcons name="chevron-right" size={20} color="#9e9e9e" />
            </TouchableOpacity>
          </View>

          {/* Close button */}
          <TouchableOpacity style={menuStyles.closeBtn} onPress={closeMenu}>
            <MaterialIcons name="close" size={20} color="#64748b" />
            <Text style={menuStyles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

    </SafeAreaView>
  );
};

export default ConductorHome;

// ── Side menu styles ──────────────────────────────────────────────────────────
import { StyleSheet } from "react-native";

const menuStyles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  panel: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 32,
    elevation: 16,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: -4, height: 0 },
  },
  menuHeader: {
    alignItems: "center",
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 20,
  },
  menuAvatar: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
    marginBottom: 10,
  },
  menuName: {
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#0d141b",
  },
  menuUsername: {
    fontSize: width * 0.033,
    color: "#64748b",
    marginTop: 2,
  },
  menuItems: {
    gap: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    gap: 12,
  },
  menuIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#e8f1fd",
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemText: {
    flex: 1,
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#0d141b",
  },
  closeBtn: {
    position: "absolute",
    bottom: 32,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
  },
  closeBtnText: {
    fontSize: width * 0.038,
    fontWeight: "600",
    color: "#64748b",
  },
});
