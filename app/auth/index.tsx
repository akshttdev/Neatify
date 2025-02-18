  import { StyleSheet, Text, View, StatusBar } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import * as WebBrowser from "expo-web-browser";
  // @ts-ignore
  import Typewriter from "react-native-typewriter";
  import { useEffect, useState } from "react";
  import SocialLoginButton from "@/components/SocialLoginButton";

  export const useWarmUpBrowser = () => {
    useEffect(() => {
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }, []);
  };

  WebBrowser.maybeCompleteAuthSession();

  const AuthScreen = () => {
    const insets = useSafeAreaInsets();
    const [startTyping, setStartTyping] = useState(false);

    // Trigger the typing effect after a delay
    useEffect(() => {
      const timer = setTimeout(() => {
        setStartTyping(true);
      }, 100); // 200ms delay before starting the typewriter effect
      return () => clearTimeout(timer);
    }, []);

    useWarmUpBrowser();

    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar hidden={true} />
        <View style={[styles.headingContainer]}>
          {startTyping && (
            <Typewriter
              style={styles.label}
              typing={1}
              minDelay={20}
            >
              Neatify
            </Typewriter>
          )}
        </View>

        <View style={styles.flexGrowArea} />

        <View style={[styles.blackDiv, { paddingBottom: insets.bottom }]}>
          <View style={styles.socialButtonsContainer}>
            <SocialLoginButton strategy="oauth_apple" label="Sign in with Apple" />
            <SocialLoginButton strategy="oauth_google" label="Sign in with Google" />
            <SocialLoginButton strategy="oauth_facebook" label="Sign in with Facebook" />
            <SocialLoginButton strategy="email" label="Sign in with Email" />

          </View>
        </View>
      </View>
    );
  };

  export default AuthScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      gap: 20,
    },
    headingContainer: {
      width: "100%",
      gap: 5,
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    label: {
      fontSize: 36,
      fontWeight: "bold",
      color: "#0000FF",
    },
    description: {
      fontSize: 16,
      color: "gray",
      textAlign: "center",
    },
    flexGrowArea: {
      flex: 1,
    },
    blackDiv: {
      backgroundColor: "black",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      padding: 20,
      width: "100%",
    },
    socialButtonsContainer: {
      width: "100%",
      gap: 12,
      marginBottom: 30,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 10,
    },
  });
