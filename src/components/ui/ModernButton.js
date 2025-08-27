import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ModernButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  disabled = false,
  gradient = false,
  style,
  textStyle,
  ...props 
}) => {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  const content = (
    <>
      {loading && <ActivityIndicator size="small" color={variant === 'primary' ? '#FFFFFF' : '#110921'} style={{ marginRight: 8 }} />}
      <Text style={textStyles}>{title}</Text>
    </>
  );

  if (gradient && Array.isArray(gradient)) {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled || loading} {...props}>
        <LinearGradient colors={gradient} style={buttonStyles}>
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={disabled || loading} {...props}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  
  // Variants
  primary: {
    backgroundColor: '#A71C20',
  },
  secondary: {
    backgroundColor: '#110921',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#A71C20',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  accent: {
    backgroundColor: '#FFD700',
  },
  
  // Sizes
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#A71C20',
  },
  ghostText: {
    color: '#A71C20',
  },
  accentText: {
    color: '#110921',
  },
  disabledText: {
    opacity: 0.7,
  },
  
  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});

export default ModernButton;
