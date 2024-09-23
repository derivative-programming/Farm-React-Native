import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const SpinnerComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(108, 117, 125, 0.25)', // bg-secondary with opacity 25%
    height: 100, // Adjust based on your layout
  },
  spinner: {
    marginVertical: 10, // Equivalent to `mt-2 mb-2`
  },
});

export default SpinnerComponent;
