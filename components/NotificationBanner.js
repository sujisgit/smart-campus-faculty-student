import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

export default function NotificationBanner({ message, visible }) {
  const slideAnim = useRef(new Animated.Value(-120)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),

        Animated.delay(8000),

        Animated.timing(slideAnim, {
          toValue: -120,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
    >
      <Text style={styles.icon}>🔔</Text>

      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,

    backgroundColor: "#13294B",

    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 14,
    paddingHorizontal: 18,

    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,

    zIndex: 1000,
  },

  icon: {
    fontSize: 18,
    marginRight: 10,
  },

  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
