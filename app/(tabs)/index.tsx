// IndexScreen.tsx
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import CampusMode from '../modes/CampusMode'; // Import CampusMode
import MunicipalityMode from '../modes/MunicipalityMode'; // Import MunicipalityMode

const IndexScreen = () => {
  const [selectedMode, setSelectedMode] = useState<"campus" | "municipality" | null>(null);

  const handleModeSelect = (mode: "campus" | "municipality") => {
    setSelectedMode(mode); // Update selected mode
  };

  const handleSubmit = () => {
    console.log("Report Submitted");
  };

  return (
    <View style={styles.container}>
      {/* Neatify Title */}
      <Text style={styles.title}>Neatify</Text>

      {/* Mode Selection Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedMode === "campus" ? styles.activeButton : {}]}
          onPress={() => handleModeSelect("campus")}
        >
          <Text style={styles.buttonText}>Campus Mode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedMode === "municipality" ? styles.activeButton : {}]}
          onPress={() => handleModeSelect("municipality")}
        >
          <Text style={styles.buttonText}>Municipality Mode</Text>
        </TouchableOpacity>
      </View>

      {/* Render the appropriate mode-specific component */}
      {selectedMode === "campus" && <CampusMode onSubmit={handleSubmit} />}
      {selectedMode === "municipality" && <MunicipalityMode onSubmit={handleSubmit} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4CAF50",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "#388E3C",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IndexScreen;
