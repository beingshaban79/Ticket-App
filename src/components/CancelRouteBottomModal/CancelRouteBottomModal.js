import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles";

const CancelRouteBottomModal = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [step, setStep] = useState(1); // Step 1 → Step 2

  const handlePrimary = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onConfirm && onConfirm();
      setStep(1);
    }
  };

  const handleSecondary = () => {
    if (step === 1) {
      onClose && onClose();
    } else {
      setStep(1);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>
              {step === 1 ? "⚠️" : "❌"}
            </Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>
            {step === 1 ? "Are you sure?" : "Final Confirmation"}
          </Text>

          {/* Description */}
          <Text style={styles.description}>
            {step === 1
              ? "This will cancel the current trip to Destination Stop."
              : "This action cannot be undone. All trip data will be finalized."}
          </Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handlePrimary}
            >
              <Text style={styles.primaryText}>
                {step === 1
                  ? "Cancel Route"
                  : "Confirm Cancellation"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleSecondary}
            >
              <Text style={styles.secondaryText}>
                {step === 1 ? "Go Back" : "Nevermind"}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default CancelRouteBottomModal;