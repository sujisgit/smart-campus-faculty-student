import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Gradient Header */}

      <LinearGradient colors={["#13294B", "#4B9CD3"]} style={styles.header}>
        <Text style={styles.headerTitle}>Smart Campus</Text>
        <Text style={styles.headerSubtitle}>Connect Your Campus Digitally</Text>
        <TouchableOpacity
          onPress={() => router.push("/notifications")}
          style={styles.notificationBtn}
        >
          <Text style={styles.bell}>🔔</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>

      {/* Dashboard */}

      <Animated.View style={[styles.grid, { opacity: fadeAnim }]}>
        <GlassCard
          icon="megaphone"
          title="Announcements"
          onPress={() => router.push("/announcements")}
        />

        <GlassCard
          icon="calendar"
          title="Events"
          onPress={() => router.push("/events")}
        />

        <GlassCard
          icon="business"
          title="Facility Booking"
          onPress={() => router.push("/booking")}
        />

        <GlassCard
          icon="people"
          title="Faculty"
          onPress={() => router.push("/faculty")}
        />

        <GlassCard
          icon="alert-circle"
          title="Complaints"
          onPress={() => router.push("/complaints")}
        />
      </Animated.View>

      {/* Campus Updates */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Campus Updates</Text>

        <View style={styles.updateCard}>
          <Text style={styles.updateTitle}>AI Workshop</Text>
          <Text style={styles.updateText}>Tomorrow • Seminar Hall</Text>
        </View>

        <View style={styles.updateCard}>
          <Text style={styles.updateTitle}>Placement Drive</Text>
          <Text style={styles.updateText}>TCS Recruitment • Friday</Text>
        </View>
      </View>

      {/* Upcoming Events */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>Hackathon 2026</Text>
            <Text style={styles.eventText}>April 12 • Innovation Lab</Text>
          </View>

          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>AI Workshop</Text>
            <Text style={styles.eventText}>April 15 • Seminar Hall</Text>
          </View>

          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>Cultural Fest</Text>
            <Text style={styles.eventText}>April 20 • Auditorium</Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

function GlassCard({ icon, title, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.92,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={onPress}
      >
        <BlurView intensity={40} style={styles.card}>
          <Ionicons name={icon} size={32} color="#007FAE" />

          <Text style={styles.cardText}>{title}</Text>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8edf1",
  },

  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  headerSubtitle: {
    fontSize: 16,
    color: "#E3F2FD",
    marginTop: 5,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },

  card: {
    width: 160,
    height: 120,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "rgba(255,255,255,0.7)",

    shadowColor: "#13294B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 8,
  },

  cardText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#13294B",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#13294B",
    marginBottom: 12,
  },

  updateCard: {
    backgroundColor: "#F8FBFF",
    borderLeftWidth: 4,
    borderLeftColor: "#4B9CD3",
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,

    shadowColor: "#13294B",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  updateTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#13294B",
  },

  updateText: {
    color: "#4B9CD3",
    marginTop: 4,
  },
  eventCard: {
    width: 220,
    height: 120,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginRight: 15,

    borderTopWidth: 4,
    borderTopColor: "#007FAE",

    shadowColor: "#13294B",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#13294B",
  },

  eventText: {
    marginTop: 8,
    color: "#4B9CD3",
  },
  notificationBtn: {
    position: "absolute",
    right: 20,
    top: 60,
  },

  bell: {
    fontSize: 24,
    color: "#fff",
  },

  badge: {
    position: "absolute",
    right: -6,
    top: -4,
    backgroundColor: "red",
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
  },
});
