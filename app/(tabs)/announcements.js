import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Announcements() {
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
      {/* Gradient Header */}

      <LinearGradient colors={["#13294B", "#4B9CD3"]} style={styles.header}>
        <Text style={styles.headerTitle}>Announcements</Text>
        <Text style={styles.headerSub}>Latest campus updates</Text>
      </LinearGradient>

      {/* Live Announcement Banner */}

      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          🔔 TCS Placement Drive Registration Open
        </Text>
      </View>

      {/* Search Bar */}

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search announcements..."
          style={styles.search}
        />
      </View>

      {/* Announcement Content */}

      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Pinned Announcement */}

        <View style={styles.pinnedCard}>
          <Text style={styles.pinnedTag}>📌 Important</Text>
          <Text style={styles.title}>Final Exam Schedule Released</Text>
          <Text style={styles.text}>
            Check the student portal for the full timetable.
          </Text>
        </View>

        {/* Announcement 1 */}

        <View style={styles.card}>
          <Text style={styles.tag}>Academic</Text>
          <Text style={styles.title}>Mid Semester Exams</Text>
          <Text style={styles.text}>Exams start from April 10</Text>

          <View style={styles.actions}>
            <Text>👍 12</Text>
            <Text>🔖 Save</Text>
            <Text>🔗 Share</Text>
          </View>
        </View>

        {/* Announcement 2 */}

        <View style={styles.card}>
          <Text style={styles.tag}>Notice</Text>
          <Text style={styles.title}>Holiday Notice</Text>
          <Text style={styles.text}>Campus closed on April 14</Text>

          <View style={styles.actions}>
            <Text>👍 4</Text>
            <Text>🔖 Save</Text>
            <Text>🔗 Share</Text>
          </View>
        </View>

        {/* Announcement 3 */}

        <View style={styles.card}>
          <Text style={styles.tag}>Event</Text>
          <Text style={styles.title}>AI Workshop</Text>
          <Text style={styles.text}>Register before April 12</Text>

          <View style={styles.actions}>
            <Text>👍 20</Text>
            <Text>🔖 Save</Text>
            <Text>🔗 Share</Text>
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

  banner: {
    backgroundColor: "#007FAE",
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 12,
    marginTop: 15,
  },

  bannerText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  searchContainer: {
    padding: 20,
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,

    shadowColor: "#13294B",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },

  pinnedCard: {
    backgroundColor: "#FFF8E1",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 16,
    borderLeftWidth: 5,
    borderLeftColor: "#FFC107",

    shadowColor: "#13294B",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },

  pinnedTag: {
    color: "#FF9800",
    fontWeight: "bold",
    marginBottom: 6,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#007FAE",

    shadowColor: "#13294B",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  tag: {
    color: "#4B9CD3",
    fontWeight: "bold",
    marginBottom: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#13294B",
  },

  text: {
    marginTop: 4,
    color: "#555",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
