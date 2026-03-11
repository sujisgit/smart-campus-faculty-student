import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Complaints() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}

      <LinearGradient colors={["#13294B", "#4B9CD3"]} style={styles.header}>
        <Text style={styles.headerTitle}>Campus Help Desk</Text>
        <Text style={styles.headerSub}>Report issues & track complaints</Text>
      </LinearGradient>

      {/* Complaint Form */}

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Submit Complaint</Text>

        <TextInput placeholder="Complaint Title" style={styles.input} />

        <TextInput
          placeholder="Describe the issue..."
          style={[styles.input, { height: 80 }]}
          multiline
        />

        <View style={styles.categoryRow}>
          <View style={styles.category}>
            <Text>WiFi</Text>
          </View>

          <View style={styles.category}>
            <Text>Hostel</Text>
          </View>

          <View style={styles.category}>
            <Text>Maintenance</Text>
          </View>

          <View style={styles.category}>
            <Text>Academic</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit Complaint</Text>
        </TouchableOpacity>
      </View>

      {/* Complaint Tickets */}

      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.ticket}>
          <Text style={styles.ticketId}>Ticket #1023</Text>

          <Text style={styles.ticketTitle}>WiFi not working in Library</Text>

          <Text style={styles.ticketStatusPending}>Pending</Text>
        </View>

        <View style={styles.ticket}>
          <Text style={styles.ticketId}>Ticket #1020</Text>

          <Text style={styles.ticketTitle}>Projector issue in Lab 3</Text>

          <Text style={styles.ticketStatusProgress}>In Progress</Text>
        </View>

        <View style={styles.ticket}>
          <Text style={styles.ticketId}>Ticket #1018</Text>

          <Text style={styles.ticketTitle}>Water leakage in Hostel</Text>

          <Text style={styles.ticketStatusResolved}>Resolved</Text>
        </View>
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

  formCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 18,

    shadowColor: "#13294B",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13294B",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#EEF5FB",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  category: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4B9CD3",
  },

  submitBtn: {
    backgroundColor: "#007FAE",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },

  ticket: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 16,
    borderRadius: 16,

    shadowColor: "#13294B",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  ticketId: {
    color: "#4B9CD3",
    fontWeight: "bold",
  },

  ticketTitle: {
    marginTop: 4,
    fontWeight: "bold",
    color: "#13294B",
  },

  ticketStatusPending: {
    marginTop: 6,
    color: "#FF9800",
  },

  ticketStatusProgress: {
    marginTop: 6,
    color: "#2196F3",
  },

  ticketStatusResolved: {
    marginTop: 6,
    color: "#4CAF50",
  },
});
