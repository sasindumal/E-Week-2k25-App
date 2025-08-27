import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ModernCard = ({ children, variant = 'default', gradient = false, style, ...props }) => {
  const cardStyles = [
    styles.card,
    variant === 'elevated' && styles.elevated,
    variant === 'bordered' && styles.bordered,
    variant === 'glass' && styles.glass,
    style,
  ];

  if (gradient && Array.isArray(gradient)) {
    return (
      <LinearGradient colors={gradient} style={cardStyles} {...props}>
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={cardStyles} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
  },
  elevated: {
    shadowColor: '#110921',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  bordered: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
  },
});

export default ModernCard;
