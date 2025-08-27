import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ModernText = ({ 
  children, 
  variant = 'body', 
  color = 'default',
  weight = 'normal',
  align = 'left',
  style,
  ...props 
}) => {
  const textStyles = [
    styles.base,
    styles[variant],
    styles[color],
    styles[weight],
    styles[align],
    style,
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },
  
  // Variants
  display: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },
  heading: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  subheading: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  
  // Colors
  default: {
    color: '#110921',
  },
  white: {
    color: '#FFFFFF',
  },
  red: {
    color: '#A71C20',
  },
  accent: {
    color: '#FFD700',
  },
  muted: {
    color: '#666666',
  },
  light: {
    color: '#CCCCCC',
  },
  
  // Weights
  light: {
    fontWeight: '300',
  },
  normal: {
    fontWeight: '400',
  },
  medium: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
  
  // Alignment
  left: {
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
});

export default ModernText;
