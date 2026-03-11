import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function EventTicket() {
  const { ticketId = "Loading..." } = useLocalSearchParams();
  const glowAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // QR Glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),

        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
      ]),
    ).start();

    // Floating ticket animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 1500,
          useNativeDriver: true,
        }),

        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const glow = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 18],
  });

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#13294B", "#4B9CD3"]} style={styles.header}>
        <Text style={styles.headerTitle}>Event Ticket</Text>
        <Text style={styles.headerSub}>Show this QR at entry</Text>
      </LinearGradient>

      <Animated.View
        style={[styles.ticketCard, { transform: [{ translateY: floatAnim }] }]}
      >
        <Text style={styles.eventName}>AI Workshop</Text>

        <Text style={styles.eventDetails}>April 15 • Seminar Hall</Text>

        <Text style={styles.ticketId}>Ticket ID: {ticketId}</Text>

        {/* Perforated Edge */}
        <View style={styles.perforation} />

        {/* Animated QR */}

        <Animated.View style={[styles.qrContainer, { shadowRadius: glow }]}>
          <QRCode
            value={ticketId}
            size={190}
            backgroundColor="white"
            color="black"
          />
        </Animated.View>

        <Text style={styles.note}>Scan this ticket at the event entrance</Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5FB",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },

  headerSub: {
    color: "#E3F2FD",
    marginTop: 5,
  },

  ticketCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 25,
    borderRadius: 20,
    alignItems: "center",

    shadowColor: "#13294B",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },

  eventName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#13294B",
  },

  eventDetails: {
    marginTop: 5,
    color: "#555",
  },

  ticketId: {
    marginTop: 8,
    color: "#4B9CD3",
    fontWeight: "bold",
  },

  perforation: {
    width: "100%",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 20,
  },

  qrContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,

    shadowColor: "#4B9CD3",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },

    elevation: 12,
  },

  note: {
    marginTop: 15,
    color: "#777",
    textAlign: "center",
  },
});
