import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Style';

export default function homeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.emoji}>🎫</Text>
        <Text style={styles.title}>TicketApp</Text>
        <Text style={styles.subtitle}>Fast & easy ticket printing</Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('App')}
        >
          <Text style={styles.buttonText}>Get Started12245645455</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
