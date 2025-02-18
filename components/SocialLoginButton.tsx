import React, { useState } from "react";
import { TouchableOpacity, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // For fallback icons
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import googleLogo from "../assets/images/google.png"


interface SocialLoginButtonProps {
  strategy: "oauth_google" | "oauth_facebook" | "oauth_apple" | "email" | "phone";
  label: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ strategy, label }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { startOAuthFlow } = useOAuth({ strategy: strategy as "oauth_google" | "oauth_facebook" | "oauth_apple" });
  const { signIn } = useSignIn();
  const router = useRouter();

  // Function to get the appropriate icon based on strategy

const buttonIcon = () => {
  if (strategy === "oauth_facebook") {
    return <Ionicons name="logo-facebook" size={24} color="white" />;
  } else if (strategy === "oauth_google") {
    return <Image source={googleLogo} style={styles.socialIcon} resizeMode="contain" />;
  } else if (strategy === "oauth_apple") {
    return <Ionicons name="logo-apple" size={24} color="white" />;
  }
  return null;
};
  

  // Function to get the appropriate fallback vector icon
  const getVectorIcon = () => {
    switch (strategy) {
      case "oauth_google":
        return "google";
      case "oauth_facebook":
        return "facebook";
      case "oauth_apple":
        return "apple";
      default:
        return "envelope"; // Default email icon
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      if (!signIn) {
        throw new Error("Sign-in instance is undefined.");
      }



  
      if (strategy === "email") {
        // Navigate to sign-in page instead of creating sign-in directly
        router.push("./auth/sign-in");
      } else {
        const { createdSessionId, setActive } = await startOAuthFlow({
          redirectUrl: Linking.createURL("(tabs)"),
        });
 
        if (createdSessionId) {
          setActive?.({ session: createdSessionId });
        }
      }
    } catch (err) {
      console.error("Authentication Error:", err);

      alert("Login Failed: " + (err instanceof Error ? err.message : "An error occurred."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleLogin}
      disabled={isLoading}
      style={[styles.button, { backgroundColor: getButtonColor(strategy) }]}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {buttonIcon() ? (
            buttonIcon()
          ) : (
            <Icon name={getVectorIcon()} size={24} color="white" style={styles.icon} />
          )}
          <Text style={styles.buttonText}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

// Function to return button colors
const getButtonColor = (strategy: string) => {
  switch (strategy) {
    case "oauth_google":
      return "#4285F4";
    case "oauth_facebook":
      return "#3b5998";
    case "oauth_apple":
      return "#000";
    default:
      return "#555"; // Default for email/phone login
  }
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});

export default SocialLoginButton;
