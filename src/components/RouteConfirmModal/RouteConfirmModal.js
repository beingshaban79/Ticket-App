import React from "react";
import { Modal, View, Text, TouchableOpacity, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

/**
 * RouteConfirmModal
 * Props:
 *  visible    : bool
 *  routeName  : string  e.g. "Route 45B"
 *  onConfirm  : function
 *  onCancel   : function
 */
const RouteConfirmModal = ({ visible, routeName, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      {/* Dim backdrop — tap to cancel */}
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.sheet} onPress={() => {}}>

          {/* Icon */}
          <View style={styles.iconCircle}>
            <MaterialIcons name="alt-route" size={32} color="#137fec" />
          </View>

          {/* Title */}
          <Text style={styles.title}>Confirm Route Selection</Text>

          {/* Body */}
          <Text style={styles.body}>
            You have selected{" "}
            <Text style={styles.bold}>{routeName}</Text>
            {". "}Please confirm to proceed to sub-route selection.
          </Text>

          {/* Confirm */}
          <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm} activeOpacity={0.85}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.75}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default RouteConfirmModal;
