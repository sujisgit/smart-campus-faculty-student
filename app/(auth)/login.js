import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { authAPI } from "../../services/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Validate inputs
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login({
        email: email.trim(),
        password,
      });

      if (response.data.success) {
        // Save user data (optional - you can use AsyncStorage)
        console.log("Login successful:", response.data.data);
        // Navigate to home after successful login
        router.replace("/(tabs)/home");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Login failed. Please try again.";
      setError(errorMessage);
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Campus</Text>
      <Text style={styles.subtitle}>Faculty & Student Portal</Text>

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

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Button
            title="Login"
            onPress={handleLogin}
            disabled={loading || !email || !password}
          />
        )}
      </View>

      <View style={styles.registerLink}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <Button
          title="Register here"
          onPress={() => router.push("/(auth)/register")}
          color="#007AFF"
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#f5f5f5",
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
    marginBottom: 40,
    textAlign: "center",
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
    fontWeight: "500",
    fontSize: 15,
  },
  registerLink: {
    marginTop: 28,
    alignItems: "center",
  },
  registerText: {
    color: "#666",
    marginBottom: 12,
    fontSize: 15,
  },
});
