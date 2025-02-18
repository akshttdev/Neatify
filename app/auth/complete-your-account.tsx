
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, FlexAlignType, StyleSheet, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CompleteYourAccountScreen = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, setError, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
    },
  });

  useEffect(() => {
    if (!isLoaded || !user) return;

    setValue("firstName", user.firstName || "");
    setValue("lastName", user.lastName || "");
    setValue("username", user.username || "");
  }, [isLoaded, user]);

  const onSubmit = async (data: { firstName: string; lastName: string; username: string }) => {
    const { firstName, lastName, username } = data;

    if (!firstName.trim() || !lastName.trim() || !username.trim()) {
      return Alert.alert("Error", "All fields are required.");
    }

    try {
      setIsLoading(true);

      await user?.update({
        firstName, // ✅ Correct Clerk API format
        lastName,  // ✅ Correct Clerk API format
        username,
        unsafeMetadata: { onboarding_completed: true },
      });

      await user?.reload();
      router.push("/(tabs)"); // Navigate after successful update

    } catch (error) {
      setError("username", { message: (error as any).message || "An error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
  {/* First Name Input */}
  <Text style={styles.inputLabel}>First Name</Text>
  <Controller
    control={control}
    name="firstName"
    rules={{ required: "First Name is required" }}
    render={({ field: { onChange, value } }) => (
      <TextInput
        style={styles.input}
        placeholder="Enter First Name"
        value={value}
        onChangeText={onChange}
      />
    )}
  />

  {/* Last Name Input */}
  <Text style={styles.inputLabel}>Last Name</Text>
  <Controller
    control={control}
    name="lastName"
    rules={{ required: "Last Name is required" }}
    render={({ field: { onChange, value } }) => (
      <TextInput
        style={styles.input}
        placeholder="Enter Last Name"
        value={value}
        onChangeText={onChange}
      />
    )}
  />

  {/* Username Input */}
  <Text style={styles.inputLabel}>Username</Text>
  <Controller
    control={control}
    name="username"
    rules={{ required: "Username is required" }}
    render={({ field: { onChange, value } }) => (
      <TextInput
        style={styles.input}
        placeholder="Choose a Username"
        value={value}
        onChangeText={onChange}
      />
    )}
  />

  <TouchableOpacity
    style={[styles.button, { opacity: isLoading ? 0.7 : 1 }]}
    onPress={handleSubmit(onSubmit)}
    disabled={isLoading}
  >
    {isLoading ? <ActivityIndicator size="small" color="white" /> : null}
    <Text style={styles.buttonText}>{isLoading ? "Loading..." : "Complete Account"}</Text>
  </TouchableOpacity>

    </View>
  );
};

export default CompleteYourAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Corrected the typo "balck" to "black"
    padding: 20,
    gap: 20,
  },
  headingContainer: {
    width: "100%",
    gap: 5,
  },
  label: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    marginTop: 40,
    gap: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 14,
    color: "black",
  },
  button: {
    width: "100%",
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "black",
    fontWeight: "600", // Semi-bold font weight
    fontFamily: Platform.OS === "ios" ? "SanFrancisco" : "Roboto",
  },
  inputLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  }
  

});

