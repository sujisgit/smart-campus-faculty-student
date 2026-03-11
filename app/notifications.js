import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Notifications() {
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
      <LinearGradient colors={["#13294B", "#4B9CD3"]} style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSub}>Latest campus updates</Text>
      </LinearGradient>

      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.card}>
          <Text style={styles.icon}>📢</Text>
          <View>
            <Text style={styles.title}>New Announcement</Text>
            <Text style={styles.text}>Exam schedule released</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.icon}>📅</Text>
          <View>
            <Text style={styles.title}>Event Reminder</Text>
            <Text style={styles.text}>AI Workshop tomorrow</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.icon}>🎫</Text>
          <View>
            <Text style={styles.title}>Event Registration</Text>
            <Text style={styles.text}>You registered for Hackathon</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.icon}>🏫</Text>
          <View>
            <Text style={styles.title}>Facility Booking</Text>
            <Text style={styles.text}>Library slot confirmed</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.icon}>⚠</Text>
          <View>
            <Text style={styles.title}>Complaint Update</Text>
            <Text style={styles.text}>WiFi issue is now resolved</Text>
          </View>
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
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",

    shadowColor: "#13294B",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  icon: {
    fontSize: 24,
    marginRight: 12,
  },

  title: {
    fontWeight: "bold",
    color: "#13294B",
  },

  text: {
    color: "#555",
    marginTop: 2,
  },
});
