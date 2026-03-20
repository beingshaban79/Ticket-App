import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import styles from './Styles';
export default function AppButton({
  variant = 'primary',
  size = 'md',
  label,
  loading = false,
  disabled = false,
  style,
  textStyle,
  onPress,
}) {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        styles.base,
        styles[variant],
        styles[size],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#137fec' : '#fff'} />
      ) : (
        <Text style={[styles.label, styles[`${variant}Text`], styles[`${size}Text`], textStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

