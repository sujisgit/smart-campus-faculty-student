import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Smart Campus App</Text>

      <Button
        title="Go to Event Registration"
        onPress={() => router.push("/event-registration")}
      />
    </View>
  );
}
