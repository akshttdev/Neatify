// _layout.tsx
import { Redirect, Tabs } from "expo-router";
import { Platform } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors"; // Ensure correct path
import { useColorScheme } from "@/hooks/useColorScheme"; // Ensure correct path

export default function TabLayout() {
  const colorScheme = useColorScheme(); // Get the color scheme (light/dark)
  const { user } = useUser(); // Get the user data from Clerk
  const { isSignedIn } = useAuth(); // Check if the user is signed in

  // If the user is not signed in, redirect them to the login screen
  if (!isSignedIn) {
    return <Redirect href="/auth" />;
  }

  // If the user has not completed onboarding, redirect them to the onboarding page
  if (isSignedIn && user?.unsafeMetadata?.onboarding_completed !== true) {
    return <Redirect href="/auth/complete-your-account" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint, // Dynamic tint color based on the color scheme
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute", // Fix position for iOS
            display: "flex", // Always display by default
          },
          default: {
            display: "flex", // Always display by default
          },
        }),
      }}
    >
      {/* Home Tab (index) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }: { color: string }) => (
            <Octicons name="home" size={24} color={color} />
          ),
        }}
      />
      {/* Eco Tips Tab */}
      <Tabs.Screen
        name="tips"
        options={{
          title: "Eco Tips",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons size={28} name="bulb-outline" color={color} />
          ),
        }}
      />
      {/* Pickup Tab */}
      <Tabs.Screen
        name="pickup"
        options={{
          title: "Pickup",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons size={28} name="cube-outline" color={color} />
          ),
        }}
      />
      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons size={28} name="person-circle-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
