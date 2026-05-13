import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles";

const SubRouteCompletedModal = ({
  visible,
  onClose,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          {/* Success Icon */}
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>✓</Text>
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Sub-Route Completed</Text>
            <Text style={styles.description}>
              Both legs of the route 'Rath - Jhansi' have been completed successfully.
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>
              Return to Route Selection
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default SubRouteCompletedModal;