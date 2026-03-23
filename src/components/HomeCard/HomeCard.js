import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

/**
 * HomeCard — reusable card for conductorHome
 *
 * Props:
 *  variant  : 'primary' | 'secondary'   (default: 'primary')
 *  title    : string
 *  subtitle : string
 *  icon     : MaterialIcons name
 *  onPress  : function
 */
const HomeCard = ({ variant = "primary", title, subtitle, icon, onPress }) => {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      style={[styles.card, isPrimary ? styles.primaryCard : styles.secondaryCard]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View>
        <Text style={[styles.title, isPrimary ? styles.titleWhite : styles.titleDark]}>
          {title}
        </Text>
        <Text style={[styles.subtitle, isPrimary ? styles.subtitleWhite : styles.subtitleDark]}>
          {subtitle}
        </Text>
      </View>
      <MaterialIcons name={icon} size={40} color={isPrimary ? "#fff" : "#000"} />
    </TouchableOpacity>
  );
};

export default HomeCard;
