import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './Styles';

export default function AppInput({
  variant = 'default',
  icon,
  placeholder,
  secureTextEntry = false,
  error = false,
  style,
  inputStyle,
  ...rest
}) {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={[styles.wrapper, styles[variant], error && styles.errorBorder, style]}>
      {icon && (
        <MaterialIcons
          name={icon}
          size={20}
          style={[styles.icon, error && { color: '#e53935' }]}
        />
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9e9e9e"
        secureTextEntry={hidden}
        style={[styles.input, inputStyle]}
        {...rest}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setHidden(!hidden)}>
          <MaterialIcons
            name={hidden ? 'visibility-off' : 'visibility'}
            size={20}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
