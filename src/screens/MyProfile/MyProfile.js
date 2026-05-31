import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import styles, { COLORS } from './Styles';

// ─── Sub-components ───────────────────────────────────────────────────────────

const PulseDot = () => {
  const anim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 0.3, duration: 800, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 1,   duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return <Animated.View style={[styles.liveDot, { opacity: anim }]} />;
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

const InfoCard = ({ iconEmoji, label, value }) => (
  <View style={styles.infoCard}>
    <View style={styles.infoCardIcon}>
      <Text style={styles.infoCardIconText}>{iconEmoji}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.infoCardLabel}>{label}</Text>
      <Text style={styles.infoCardValue} numberOfLines={2}>{value}</Text>
    </View>
  </View>
);

const ContactCard = ({ iconEmoji, label, value, onEdit }) => (
  <View style={styles.contactCard}>
    <View style={styles.contactCardLeft}>
      <Text style={styles.contactIcon}>{iconEmoji}</Text>
      <View>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
    </View>
    {onEdit && (
      <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
        <MaterialIcons name="edit" size={16} color={COLORS.primary} />
      </TouchableOpacity>
    )}
  </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

const MyProfile = ({ navigation }) => {
  const profile   = useSelector((state) => state.profile?.profile);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const insets    = useSafeAreaInsets();

  const name        = profile?.name          || 'Conductor';
  const username    = profile?.username      || '—';
  const email       = profile?.contact_information?.email         || profile?.email         || '—';
  const phone       = profile?.contact_information?.mobile_number || profile?.mobile_number || '—';
  const conductorId = profile?.conductor_code || (profile?.id ? `C-${profile.id}` : '—');
  const busInfo     = profile?.conductor_details?.assigned_bus
    ? `${profile.conductor_details.assigned_bus.bus_name}  |  ${profile.conductor_details.assigned_bus.bus_number}`
    : profile?.bus
    ? `${profile.bus.bus_name}  |  ${profile.bus.bus_number}`
    : '—';
  const routeInfo       = profile?.active_assignment?.route_name  || profile?.assigned_route?.route_name || '—';
  const isLive          = profile?.active_assignment?.is_live_on_route ?? false;
  const hasActiveTrip   = profile?.active_assignment?.has_active_trip  ?? false;
  const currentStop     = profile?.active_assignment?.current_stop_name || '—';
  const address         = profile?.address || '—';

  // Subscription
  const sub             = profile?.subscription_plan;
  const subName         = sub?.plan_name         || '—';
  const subDesc         = sub?.description       || '—';
  const subStatus       = sub?.status            || '—';
  const subValidity     = sub?.validity_days_left != null ? `${sub.validity_days_left} days left` : 'No expiry';
  const subConductors   = sub?.conductors_display || '—';

  const isValidUrl  = (url) => url && (url.startsWith('file') || (url.startsWith('http') && !url.includes('example.com')));
  const avatarUri   = isValidUrl(profile?.profile_picture_url)
    ? profile.profile_picture_url
    : `https://ui-avatars.com/api/?background=005baf&color=fff&size=128&bold=true&name=${encodeURIComponent(name)}`;

  const pressIn  = () => Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scaleAnim, { toValue: 1,    useNativeDriver: true }).start();

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.headerBackBtn} onPress={() => navigation?.goBack()}>
            <MaterialIcons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>
        <TouchableOpacity style={styles.headerMoreBtn}>
          <MaterialIcons name="more-vert" size={22} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Hero */}
        <View style={styles.profileCard}>
          <View style={styles.profileBanner} />
          <View style={styles.profileAvatarSection}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: avatarUri }} style={styles.avatar} resizeMode="cover" />
              <View style={styles.avatarBadge}>
                <Text style={styles.avatarBadgeText}>✓</Text>
              </View>
            </View>
            <Text style={styles.profileName}>{name}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>CONDUCTOR</Text>
            </View>
          </View>
        </View>

        {/* Conductor Details */}
        <View>
          <Text style={styles.sectionLabel}>Conductor Details</Text>
          <View style={styles.cardGrid}>
            <InfoCard iconEmoji="🪪" label="Conductor ID" value={conductorId} />
            <InfoCard iconEmoji="🚌" label="Assigned Bus" value={busInfo}     />
          </View>
        </View>

        {/* Active Assignment */}
        <View>
          <Text style={styles.sectionLabel}>Active Assignment</Text>
          <View style={styles.routeCard}>
            <View style={styles.routeCardTop}>
              <View style={styles.routeCardIcon}>
                <Text style={styles.routeCardIconText}>🗺️</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.routeCardLabel}>Assigned Route</Text>
                <Text style={styles.routeCardValue}>{routeInfo}</Text>
                {currentStop !== '—' && (
                  <Text style={styles.currentStop}>📍 {currentStop}</Text>
                )}
              </View>
            </View>
            <View style={styles.routeMapBox}>
              <View style={styles.liveChip}>
                {isLive ? <PulseDot /> : null}
                <Text style={styles.liveText}>
                  {isLive ? 'Live on Route' : hasActiveTrip ? 'Trip Active' : 'No Active Trip'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Subscription Plan */}
        {sub && (
          <View>
            <Text style={styles.sectionLabel}>Subscription Plan</Text>
            <View style={styles.subCard}>
              <View style={styles.subCardTop}>
                <View style={styles.subCardLeft}>
                  <View style={styles.subCardIcon}>
                    <Text style={styles.subCardIconText}>⭐</Text>
                  </View>
                  <View>
                    <Text style={styles.subCardTitle}>{subName}</Text>
                    <Text style={styles.subCardSubtitle}>{subDesc}</Text>
                  </View>
                </View>
                <View style={styles.activePill}>
                  <Text style={styles.activePillText}>{subStatus.toUpperCase()}</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.subCardStats}>
                <View style={styles.subStatBlock}>
                  <Text style={styles.subStatLabel}>Validity</Text>
                  <Text style={styles.subStatValue}>{subValidity}</Text>
                </View>
                <View style={styles.subStatBlock}>
                  <Text style={styles.subStatLabel}>Conductors</Text>
                  <Text style={styles.subStatValue}>{subConductors}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Contact Information */}
        <View>
          <Text style={styles.sectionLabel}>Contact Information</Text>
          <View style={styles.contactSpacing}>
            <ContactCard
              iconEmoji="📞"
              label="Phone Number"
              value={phone}
              onEdit={() => navigation?.navigate('EditProfile')}
            />
            <ContactCard
              iconEmoji="✉️"
              label="Email Address"
              value={email}
              onEdit={() => navigation?.navigate('EditProfile')}
            />
            <ContactCard
              iconEmoji="👤"
              label="Username"
              value={`@${username}`}
            />
            {address !== '—' && (
              <ContactCard
                iconEmoji="📍"
                label="Address"
                value={address}
              />
            )}
          </View>
        </View>

        {/* Edit Profile Button */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPressIn={pressIn}
            onPressOut={pressOut}
            activeOpacity={1}
            onPress={() => navigation?.navigate('EditProfile')}
          >
            <MaterialIcons name="edit" size={20} color="#fff" />
            <Text style={styles.primaryBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View>
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

export default MyProfile;
