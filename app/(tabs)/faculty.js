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

export default function Faculty() {
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
        <Text style={styles.headerTitle}>Faculty Directory</Text>
        <Text style={styles.headerSub}>Find and connect with professors</Text>
      </LinearGradient>

      {/* Search */}

      <View style={styles.searchContainer}>
        <TextInput placeholder="Search faculty..." style={styles.search} />
      </View>

      {/* Department Filters */}

      <View style={styles.filters}>
        <View style={styles.filterBtn}>
          <Text>All</Text>
        </View>

        <View style={styles.filterBtn}>
          <Text>CSE</Text>
        </View>

        <View style={styles.filterBtn}>
          <Text>AI</Text>
        </View>

        <View style={styles.filterBtn}>
          <Text>Data Science</Text>
        </View>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Faculty Card */}

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RS</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>Dr. Ravi Shankar ⭐</Text>

            <Text style={styles.dept}>Computer Science Department</Text>

            <Text style={styles.office}>Office Hours: 10AM - 1PM</Text>

            <Text style={styles.mail}>ravi@campus.edu</Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Email</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Faculty Card */}

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AP</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>Dr. Anjali Patel</Text>

            <Text style={styles.dept}>Artificial Intelligence</Text>

            <Text style={styles.office}>Office Hours: 2PM - 4PM</Text>

            <Text style={styles.mail}>anjali@campus.edu</Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Email</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Faculty Card */}

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>MK</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>Prof. Manoj Kumar</Text>

            <Text style={styles.dept}>Data Science</Text>

            <Text style={styles.office}>Office Hours: 11AM - 3PM</Text>

            <Text style={styles.mail}>manoj@campus.edu</Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Email</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Call</Text>
              </TouchableOpacity>
            </View>
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
    padding: 16,
    borderRadius: 16,
    shadowColor: "#13294B",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4B9CD3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#13294B",
  },

  dept: {
    color: "#4B9CD3",
    marginTop: 2,
  },

  office: {
    marginTop: 3,
    color: "#555",
  },

  mail: {
    marginTop: 3,
    color: "#555",
  },

  actions: {
    flexDirection: "row",
    marginTop: 8,
  },

  btn: {
    backgroundColor: "#007FAE",
    padding: 6,
    borderRadius: 8,
    marginRight: 10,
  },

  btnText: {
    color: "#fff",
    fontSize: 12,
  },
});
