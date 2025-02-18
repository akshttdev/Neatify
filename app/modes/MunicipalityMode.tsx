// MunicipalityMode.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

interface MunicipalityModeProps {
  onSubmit: () => void;
}

const MunicipalityMode: React.FC<MunicipalityModeProps> = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Municipality Mode</Text>

      {/* Upload Picture */}
      <Button title="Upload Image" onPress={() => {}} />

      {/* Enter Issue Description */}
      <TextInput style={styles.input} placeholder="Enter issue description" />

      {/* Fetch Location (Google Maps API - Not Implemented Here) */}
      <TextInput style={styles.input} placeholder="Enter Location" />

      {/* Submit Report */}
      <Button title="Submit Report" onPress={onSubmit} />

      {/* Track Status */}
      <Text style={styles.statusText}>Track Status: Pending</Text>

      {/* Notify Authorities */}
      <Button title="Notify Municipality Authorities" onPress={() => {}} />

      {/* Gain Upvotes */}
      <Text style={styles.upvoteText}>Gain Upvotes from Community</Text>

      {/* View Trending Reports */}
      <Button title="View Trending Reports" onPress={() => {}} />
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
  upvoteText: {
    fontSize: 16,
    marginTop: 15,
    color: '#388E3C',
  },
});

export default MunicipalityMode;
