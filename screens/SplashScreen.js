import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    sequence.start(() => {
      onFinish();
    });
  }, [fadeAnim, onFinish]);

  return (
    <View style={styles.splashContainer}>
      <Animated.View style={[styles.splashContent, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="flower-tulip" size={70} color="#5D9CEC" />
        </View>
        <Text style={styles.splashTitle}>Bienestar Personal</Text>
        <Text style={styles.splashSubtitle}>Organiza. Aprende. Crece.</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  splashContent: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 18,
    color: '#666666',
  },
});

export default SplashScreen;