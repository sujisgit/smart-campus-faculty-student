import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import NotificationBanner from "../components/NotificationBanner";
import Config from "../constants/config";

export default function EventRegistration() {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  return (
    <>
      <NotificationBanner
        message="🎫 Registration Successful!"
        visible={showNotification}
      />

      <ScrollView style={styles.container}>
        <LinearGradient colors={["#13294B", "#4B9CD3"]} style={styles.header}>
          <Text style={styles.headerTitle}>Event Registration</Text>
          <Text style={styles.headerSub}>Register for campus events</Text>
        </LinearGradient>

        <View style={styles.formCard}>
          <Text style={styles.title}>Register for AI Workshop</Text>

          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Department"
            style={styles.input}
            value={department}
            onChangeText={setDepartment}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            placeholder="Year"
            style={styles.input}
            value={year}
            onChangeText={setYear}
          />
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={async () => {
              console.log("Submit button pressed");

              try {
                const res = await axios.post(
                  `${Config.apiUrl}/register-event`,
                  {
                    name,
                    department,
                    email,
                    phone,
                    year,
                  },
                );

                console.log("API response:", res.data);

                if (res.data.success) {
                  setShowNotification(true);

                  setTimeout(() => {
                    setShowNotification(false);

                    router.push({
                      pathname: "/event-ticket",
                      params: { ticketId: res.data.ticketId },
                    });
                  }, 900);
                }
              } catch (error) {
                console.log("API ERROR:", error);
              }
            }}
          >
            <Text style={styles.registerText}>Submit Registration</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
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

  title: {
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

  registerBtn: {
    backgroundColor: "#007FAE",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  registerText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
