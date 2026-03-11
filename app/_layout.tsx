import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{ animationEnabled: false }}
      initialRouteName="(auth)"
    >
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animationEnabled: false }}
      />
    </Stack>
  );
}
