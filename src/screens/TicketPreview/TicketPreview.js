import React from "react";
import { View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { issueTicket } from "../../redux/slices/bookingSlice";
import styles from "./Styles";
import TicketPreviewCard from "../../components/TicketPreviewCard/TicketPreviewCard";
import AppButton from "../../components/Button/Button";

const TicketPreview = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { isIssuing } = useSelector((state) => state.booking);

  const {
    from,
    to,
    fromStopId,
    toStopId,
    passengerType,
    fare,
    baseFare,
    gst,
    distance,
    busNo,
  } = route.params || {};

  const now  = new Date();
  const date = now.toLocaleDateString("en-GB");
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const fareItems = [
    { label: `${passengerType || "Adult"} x 1`, amount: `₹ ${baseFare || fare || "0"}` },
    ...(Number(gst) > 0
      ? [{ label: "GST", amount: `₹ ${gst}` }]
      : []),
  ];

  const handlePrint = async () => {
    const result = await dispatch(issueTicket({
      fromStopId:    fromStopId,
      toStopId:      toStopId,
      passengerType: passengerType || "Adult",
    }));

    // Show backend message regardless of success/failure
    const message = result?.payload?.message || "Ticket issued.";
    Alert.alert("", message, [
      {
        text: "OK",
        onPress: () => {
          // On success go back to booking, on failure stay
          if (result?.payload?.status) {
            navigation.goBack();
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TicketPreviewCard
          date={date}
          time={time}
          from={from   || "—"}
          to={to       || "—"}
          distance={distance ? `${distance} km` : "—"}
          passengerType={passengerType || "Adult"}
          fareItems={fareItems}
          total={`₹ ${fare || "0"}`}
          busNo={busNo || "—"}
        />
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          variant="primary"
          size="lg"
          label="🖨  Print Ticket"
          loading={isIssuing}
          disabled={isIssuing}
          onPress={handlePrint}
        />
      </View>
    </SafeAreaView>
  );
};

export default TicketPreview;
