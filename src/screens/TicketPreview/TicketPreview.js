import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import TicketPreviewCard from "../../components/TicketPreviewCard/TicketPreviewCard";
import AppButton from "../../components/Button/Button";

const TicketPreview = ({ navigation, route }) => {
  const { from, to, passengerType, fare, distance } = route.params || {};

  const now  = new Date();
  const date = now.toLocaleDateString("en-GB");
  const time = now.toLocaleTimeString("en-GB");

  const fareItems = [
    passengerType === "adult"   && { label: "फुल (Adult) x 1",  amount: `₹ ${fare || "100.00"}` },
    passengerType === "child"   && { label: "आधा (Child) x 1",  amount: `₹ ${fare || "50.00"}`  },
    passengerType === "luggage" && { label: "Luggage x 1",       amount: `₹ ${fare || "30.00"}`  },
  ].filter(Boolean);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TicketPreviewCard
          date={date}
          time={time}
          seatNo="01"
          from={from || "राठ"}
          to={to || "झांसी"}
          distance={distance || "71.4 Km"}
          departure="9:00 AM"
          fareItems={fareItems}
          total={`₹ ${fare || "100.00"}`}
          busNo="3334"
          conductor="शयाम"
        />
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          variant="primary"
          size="lg"
          label="  Confirm & Print"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default TicketPreview;
