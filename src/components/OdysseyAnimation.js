import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const OdysseyAnimation = ({ activeTabIndex = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const moveAnim = useRef(new Animated.Value(0)).current;
  
  // Multiple floating particles
  const particle1 = useRef(new Animated.Value(0)).current;
  const particle2 = useRef(new Animated.Value(0)).current;
  const particle3 = useRef(new Animated.Value(0)).current;
  const particle4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main Odyssey symbol animation
    const mainAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.2,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 0.8,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ])
    );

    // Floating particles animation
    const particleAnimation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(particle1, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(particle1, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(1000),
          Animated.timing(particle2, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(particle2, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(2000),
          Animated.timing(particle3, {
            toValue: 1,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(particle3, {
            toValue: 0,
            duration: 2500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(500),
          Animated.timing(particle4, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(particle4, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Start animations
    mainAnimation.start();
    particleAnimation.start();

    return () => {
      mainAnimation.stop();
      particleAnimation.stop();
    };
  }, []);

  // Tab-based movement animation
  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: activeTabIndex,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [activeTabIndex]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const translateX = moveAnim.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6],
    outputRange: [-50, -30, -10, 10, 30, 50, 70],
  });

  const particle1Y = particle1.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -30],
  });

  const particle1Opacity = particle1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  const particle2Y = particle2.interpolate({
    inputRange: [0, 1],
    outputRange: [40, -20],
  });

  const particle2Opacity = particle2.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: [0, 1, 1, 0],
  });

  const particle3Y = particle3.interpolate({
    inputRange: [0, 1],
    outputRange: [30, -40],
  });

  const particle3Opacity = particle3.interpolate({
    inputRange: [0, 0.4, 0.8, 1],
    outputRange: [0, 1, 1, 0],
  });

  const particle4Y = particle4.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -50],
  });

  const particle4Opacity = particle4.interpolate({
    inputRange: [0, 0.2, 0.6, 1],
    outputRange: [0, 1, 1, 0],
  });

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View
        style={[
          styles.mainSymbol,
          {
            opacity: fadeAnim,
            transform: [
              { rotate: spin },
              { scale: scaleAnim },
              { translateX: translateX },
            ],
          },
        ]}
      >
        <View style={styles.odysseySymbol}>
          <View style={styles.outerRing} />
          <View style={styles.innerRing} />
          <View style={styles.centerDot} />
          <View style={[styles.ray, styles.ray1]} />
          <View style={[styles.ray, styles.ray2]} />
          <View style={[styles.ray, styles.ray3]} />
          <View style={[styles.ray, styles.ray4]} />
        </View>
      </Animated.View>

      {/* Floating Particles */}
      <Animated.View
        style={[
          styles.particle,
          styles.particle1,
          {
            opacity: particle1Opacity,
            transform: [
              { translateY: particle1Y },
              { translateX: translateX },
            ],
          },
        ]}
      />
      
      <Animated.View
        style={[
          styles.particle,
          styles.particle2,
          {
            opacity: particle2Opacity,
            transform: [
              { translateY: particle2Y },
              { translateX: translateX },
            ],
          },
        ]}
      />
      
      <Animated.View
        style={[
          styles.particle,
          styles.particle3,
          {
            opacity: particle3Opacity,
            transform: [
              { translateY: particle3Y },
              { translateX: translateX },
            ],
          },
        ]}
      />
      
      <Animated.View
        style={[
          styles.particle,
          styles.particle4,
          {
            opacity: particle4Opacity,
            transform: [
              { translateY: particle4Y },
              { translateX: translateX },
            ],
          },
        ]}
      />

      {/* Trailing Stars */}
      <Animated.View
        style={[
          styles.star,
          styles.star1,
          {
            opacity: fadeAnim,
            transform: [{ translateX: translateX }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.star,
          styles.star2,
          {
            opacity: fadeAnim,
            transform: [{ translateX: translateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  mainSymbol: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.45,
  },
  odysseySymbol: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerRing: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_RED,
    opacity: 0.3,
  },
  innerRing: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.ACCENT,
    opacity: 0.5,
  },
  centerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.PRIMARY_RED,
  },
  ray: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: COLORS.ACCENT,
    opacity: 0.6,
  },
  ray1: {
    top: -15,
    left: 29,
    transform: [{ rotate: '0deg' }],
  },
  ray2: {
    top: 20,
    left: 29,
    transform: [{ rotate: '90deg' }],
  },
  ray3: {
    top: 20,
    left: 29,
    transform: [{ rotate: '45deg' }],
  },
  ray4: {
    top: 20,
    left: 29,
    transform: [{ rotate: '135deg' }],
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.ACCENT,
  },
  particle1: {
    top: height * 0.2,
    left: width * 0.3,
  },
  particle2: {
    top: height * 0.25,
    left: width * 0.7,
  },
  particle3: {
    top: height * 0.18,
    left: width * 0.2,
  },
  particle4: {
    top: height * 0.22,
    left: width * 0.8,
  },
  star: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: COLORS.PRIMARY_WHITE,
    opacity: 0.7,
  },
  star1: {
    top: height * 0.12,
    left: width * 0.35,
    borderRadius: 2,
  },
  star2: {
    top: height * 0.28,
    left: width * 0.6,
    borderRadius: 2,
  },
});

export default OdysseyAnimation;
