import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles";

const CancelTicketModal = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>✕</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Cancel Ticket</Text>

          {/* Description */}
          <Text style={styles.description}>
            Are you sure you want to cancel this ticket?
            This action cannot be undone.
          </Text>

          {/* Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.btnSecondary}
              onPress={onClose}
            >
              <Text style={styles.btnSecondaryText}>Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnDanger}
              onPress={onConfirm}
            >
              <Text style={styles.btnDangerText}>
                Confirm Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CancelTicketModal;