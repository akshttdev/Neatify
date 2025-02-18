// CampusMode.tsx
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native';

interface CampusModeProps {
  onSubmit: () => void;
}

const CampusMode: React.FC<CampusModeProps> = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Mode</Text>

      {/* Select Cleaning Type */}
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Room/Bathroom Cleaning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Floor Cleaning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Campus Area Cleaning</Text>
        </TouchableOpacity>
      </View>

      {/* Upload Picture */}
      <Button title="Upload Image" onPress={() => {}} />

      {/* Enter Issue Description */}
      <TextInput style={styles.input} placeholder="Enter issue description" />

      {/* Select Location */}
      <TextInput style={styles.input} placeholder="Enter Location (Building, Floor, Room)" />

      {/* Submit Report */}
      <Button title="Submit Report" onPress={onSubmit} />

      {/* Track Status */}
      <Text style={styles.statusText}>Track Status: Pending</Text>

      {/* Notify Admin */}
      <Button title="Notify College Admins" onPress={() => {}} />

      {/* Earn Streaks */}
      <Text style={styles.streakText}>Earn Streaks & Leaderboard Points</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionContainer: {
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  optionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  statusText: {
    fontSize: 16,
    marginTop: 15,
    color: '#888',
  },
  streakText: {
    fontSize: 16,
    marginTop: 15,
    color: '#388E3C',
  },
});

export default CampusMode;
