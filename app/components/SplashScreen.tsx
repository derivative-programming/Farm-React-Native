import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import * as theme from '../constants/theme'

interface SplashScreenProps {
  onFinish?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();  
    }, 2000);
 
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Simple Api</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Copyright © 2024 • NewCo Inc.</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.Colors.primary,  
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    color: 'white',
  },
  footer: {
    justifyContent: 'flex-end',
    paddingBottom: 20, 
  },
  footerText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});
 
export default SplashScreen;
