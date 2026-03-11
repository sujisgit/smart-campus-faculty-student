import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Booking() {
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
        <Text style={styles.headerTitle}>Facility Booking</Text>
        <Text style={styles.headerSub}>Reserve campus facilities easily</Text>
      </LinearGradient>

      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Facility 1 */}

        <View style={styles.card}>
          <Text style={styles.facilityTitle}>📚 Library Study Room</Text>

          <Text style={styles.facilityText}>Available Slots</Text>

          <View style={styles.slotContainer}>
            <TouchableOpacity style={styles.slot}>
              <Text>9:00 AM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.slot}>
              <Text>11:00 AM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.slot}>
              <Text>2:00 PM</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.bookBtn}>
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        {/* Facility 2 */}

        <View style={styles.card}>
          <Text style={styles.facilityTitle}>💻 Computer Lab</Text>

          <Text style={styles.facilityText}>Available Slots</Text>

          <View style={styles.slotContainer}>
            <TouchableOpacity style={styles.slot}>
              <Text>10:00 AM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.slot}>
              <Text>1:00 PM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.slot}>
              <Text>4:00 PM</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.bookBtn}>
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        {/* Facility 3 */}

        <View style={styles.card}>
          <Text style={styles.facilityTitle}>🎤 Auditorium</Text>

          <Text style={styles.facilityText}>Available Slots</Text>

          <View style={styles.slotContainer}>
            <TouchableOpacity style={styles.slot}>
              <Text>10:00 AM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.slot}>
              <Text>3:00 PM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.slot}>
              <Text>6:00 PM</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.bookBtn}>
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
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

  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 18,
    borderRadius: 16,

    shadowColor: "#13294B",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  facilityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13294B",
  },

  facilityText: {
    marginTop: 6,
    color: "#555",
  },

  slotContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },

  slot: {
    backgroundColor: "#EEF5FB",
    padding: 10,
    borderRadius: 10,
  },

  bookBtn: {
    backgroundColor: "#007FAE",
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
  },

  bookText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
