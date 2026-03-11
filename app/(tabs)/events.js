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

export default function Events() {
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
    <ScrollView style={styles.container}>
      {/* Header */}

      <LinearGradient colors={["#13294B", "#4B9CD3"]} style={styles.header}>
        <Text style={styles.headerTitle}>Campus Events</Text>
        <Text style={styles.headerSub}>Discover upcoming activities</Text>
      </LinearGradient>

      {/* Featured Event */}

      <View style={styles.featuredCard}>
        <Text style={styles.featuredTag}>⭐ Featured Event</Text>

        <Text style={styles.featuredTitle}>Hackathon 2026</Text>

        <Text style={styles.featuredText}>April 12 • Innovation Lab</Text>

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => router.push("/event-registration")}
        >
          <Text style={styles.registerText}>Register Now</Text>
        </TouchableOpacity>
      </View>

      {/* Category Filters */}

      <View style={styles.filters}>
        <View style={styles.filterBtn}>
          <Text>All</Text>
        </View>

        <View style={styles.filterBtn}>
          <Text>Workshops</Text>
        </View>

        <View style={styles.filterBtn}>
          <Text>Hackathons</Text>
        </View>

        <View style={styles.filterBtn}>
          <Text>Cultural</Text>
        </View>
      </View>

      {/* Event List */}

      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.card}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateDay}>15</Text>
            <Text style={styles.dateMonth}>APR</Text>
          </View>

          <View style={styles.eventInfo}>
            <Text style={styles.title}>AI Workshop</Text>
            <Text style={styles.text}>Seminar Hall</Text>

            <TouchableOpacity style={styles.smallBtn}>
              <Text style={styles.smallBtnText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateDay}>20</Text>
            <Text style={styles.dateMonth}>APR</Text>
          </View>

          <View style={styles.eventInfo}>
            <Text style={styles.title}>Cultural Fest</Text>
            <Text style={styles.text}>Main Auditorium</Text>

            <TouchableOpacity style={styles.smallBtn}>
              <Text style={styles.smallBtnText}>View Details</Text>
            </TouchableOpacity>
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

  featuredCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 18,

    shadowColor: "#13294B",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },

  featuredTag: {
    color: "#4B9CD3",
    fontWeight: "bold",
    marginBottom: 6,
  },

  featuredTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#13294B",
  },

  featuredText: {
    marginTop: 4,
    color: "#555",
  },

  registerBtn: {
    backgroundColor: "#007FAE",
    padding: 10,
    marginTop: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  registerText: {
    color: "#fff",
    fontWeight: "bold",
  },

  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },

  filterBtn: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,

    shadowColor: "#13294B",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 16,

    shadowColor: "#13294B",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  dateBadge: {
    backgroundColor: "#4B9CD3",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 15,
  },

  dateDay: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  dateMonth: {
    color: "#E3F2FD",
  },

  eventInfo: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#13294B",
  },

  text: {
    color: "#555",
    marginTop: 3,
  },

  smallBtn: {
    marginTop: 8,
    backgroundColor: "#13294B",
    padding: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  smallBtnText: {
    color: "#fff",
    fontSize: 12,
  },
});
