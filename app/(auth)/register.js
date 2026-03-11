import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    Picker,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { authAPI } from "../../services/api";

const DEPARTMENTS = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Liberal Arts",
  "Medicine",
  "Law",
];

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!email.trim()) {
      setError("Please enter your email");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return false;
    }
    if (!department) {
      setError("Please select a department");
      return false;
    }
    if (!designation.trim()) {
      setError("Please enter your designation");
      return false;
    }
    if (!password) {
      setError("Please enter a password");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await authAPI.register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        department,
        designation: designation.trim(),
        password,
      });

      if (response.data.success) {
        setSuccess(true);
        setSuccessMessage(
          response.data.message ||
            "Your account has been created successfully!",
        );

        // Auto-redirect after 3 seconds
        setTimeout(() => {
          router.replace("/(auth)/login");
        }, 3000);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
      Alert.alert("Registration Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {success ? (
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <Text style={styles.successIcon}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Registration Successful!</Text>
          <Text style={styles.successMessage}>{successMessage}</Text>
          <Text style={styles.redirectText}>Redirecting to login...</Text>
          <Button
            title="Go to Login Now"
            onPress={() => router.replace("/(auth)/login")}
            color="#007AFF"
          />
        </View>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Smart Campus</Text>
            <Text style={styles.subtitle}>Create Your Account</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setError("");
            }}
            editable={!loading}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError("");
            }}
            editable={!loading}
            keyboardType="email-address"
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setError("");
            }}
            editable={!loading}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Department</Text>
            <Picker
              selectedValue={department}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setDepartment(itemValue);
                setError("");
              }}
              enabled={!loading}
            >
              {DEPARTMENTS.map((dept) => (
                <Picker.Item key={dept} label={dept} value={dept} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Designation (e.g., Professor, Lecturer)"
            value={designation}
            onChangeText={(text) => {
              setDesignation(text);
              setError("");
            }}
            editable={!loading}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError("");
            }}
            secureTextEntry={true}
            placeholderTextColor="#999"
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setError("");
            }}
            secureTextEntry={true}
            placeholderTextColor="#999"
            editable={!loading}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : (
              <Button
                title="Register"
                onPress={handleRegister}
                disabled={
                  loading ||
                  !name ||
                  !email ||
                  !phone ||
                  !designation ||
                  !password
                }
              />
            )}
          </View>

          <View style={styles.loginLink}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Button
              title="Login here"
              onPress={() => router.push("/(auth)/login")}
              color="#007AFF"
              disabled={loading}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 40,
    backgroundColor: "#f5f5f5",
    justifyContent: "flex-start",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    marginVertical: 10,
    borderRadius: 8,
    width: "100%",
    backgroundColor: "#fff",
    fontSize: 16,
    height: 50,
  },
  pickerContainer: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  label: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 4,
    color: "#555",
    fontSize: 14,
    fontWeight: "500",
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    marginVertical: 24,
    width: "100%",
    paddingHorizontal: 4,
  },
  errorText: {
    color: "#d32f2f",
    marginTop: 12,
    marginBottom: 16,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
  },
  loginLink: {
    marginTop: 28,
    alignItems: "center",
    paddingBottom: 20,
  },
  loginText: {
    color: "#666",
    marginBottom: 12,
    fontSize: 15,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  successIcon: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 12,
    textAlign: "center",
  },
  successMessage: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  redirectText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 24,
    fontStyle: "italic",
  },
});
