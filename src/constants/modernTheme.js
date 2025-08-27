// Modern Professional Theme Configuration
// E-Week 2K25 - Odyssey Theme

// ========== MODERN COLORS ==========
export const MODERN_COLORS = {
  // Primary Brand Colors
  navy: '#110921',
  red: '#A71C20', 
  white: '#FFFFFF',
  accent: '#FFD700',
  
  // Primary Palette
  primary: {
    50: '#F8F9FB',
    100: '#F1F3F7',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#110921', // Navy
    950: '#0F0B17',
  },
  
  // Secondary Palette (Red)
  secondary: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#A71C20', // Red
    900: '#7F1D1D',
    950: '#450A0A',
  },
  
  // Accent Palette (Gold)
  accent: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#FFD700', // Gold
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    950: '#451A03',
  },
  
  // Semantic Colors
  success: {
    light: '#D1FAE5',
    main: '#10B981',
    dark: '#047857',
    contrastText: '#FFFFFF',
  },
  
  warning: {
    light: '#FEF3C7',
    main: '#F59E0B',
    dark: '#D97706',
    contrastText: '#FFFFFF',
  },
  
  error: {
    light: '#FEE2E2',
    main: '#EF4444',
    dark: '#DC2626',
    contrastText: '#FFFFFF',
  },
  
  info: {
    light: '#DBEAFE',
    main: '#3B82F6',
    dark: '#1D4ED8',
    contrastText: '#FFFFFF',
  },
  
  // Neutral Colors
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },

  // Neutral alias for gray (for backward compatibility)
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },
  
  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    dark: '#110921',
    surface: '#FFFFFF',
    overlay: 'rgba(17, 9, 33, 0.8)',
  },
  
  // Text Colors
  text: {
    primary: '#110921',
    secondary: '#4B5563',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
    accent: '#A71C20',
    gold: '#FFD700',
  },
  
  // Border Colors
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
    primary: '#A71C20',
    accent: '#FFD700',
  },

  // Utility Colors
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
};

// ========== MODERN GRADIENTS ==========
export const MODERN_GRADIENTS = {
  // Primary Brand Gradients
  primary: [MODERN_COLORS.navy, MODERN_COLORS.red],
  primaryReverse: [MODERN_COLORS.red, MODERN_COLORS.navy],
  accent: [MODERN_COLORS.accent, '#FFA500'],
  accentToRed: [MODERN_COLORS.accent, MODERN_COLORS.red],
  
  // Utility Gradients
  dark: [MODERN_COLORS.navy, '#1E1F3A'],
  darkBlue: ['#110921', '#1E293B'],
  light: [MODERN_COLORS.white, MODERN_COLORS.gray[100]],
  subtle: ['#F9FAFB', '#F3F4F6'],
  
  // Themed Gradients
  sunset: ['#FF6B6B', '#4ECDC4'],
  ocean: ['#667eea', '#764ba2'],
  royal: [MODERN_COLORS.navy, '#4338CA'],
  gold: [MODERN_COLORS.accent, '#F59E0B'],
  fire: ['#A71C20', '#FF4500'],
  
  // Card Backgrounds
  cardPrimary: [MODERN_COLORS.white, '#F8F9FB'],
  cardSecondary: ['rgba(255, 255, 255, 0.9)', 'rgba(248, 249, 251, 0.9)'],
  cardDark: [MODERN_COLORS.navy, '#1E293B'],
  
  // Button Gradients
  buttonPrimary: [MODERN_COLORS.red, '#B91C1C'],
  buttonSecondary: [MODERN_COLORS.navy, '#1E293B'],
  buttonAccent: [MODERN_COLORS.accent, '#D97706'],
};

// ========== MODERN SHADOWS ==========
export const MODERN_SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  
  xs: {
    shadowColor: MODERN_COLORS.navy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  
  sm: {
    shadowColor: MODERN_COLORS.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  
  base: {
    shadowColor: MODERN_COLORS.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  
  md: {
    shadowColor: MODERN_COLORS.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  
  lg: {
    shadowColor: MODERN_COLORS.navy,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  
  xl: {
    shadowColor: MODERN_COLORS.navy,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
  },
  
  '2xl': {
    shadowColor: MODERN_COLORS.navy,
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.3,
    shadowRadius: 35,
    elevation: 16,
  },
  
  // Colored Shadows
  redShadow: {
    shadowColor: MODERN_COLORS.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  
  accentShadow: {
    shadowColor: MODERN_COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  
  // Card Shadows
  card: {
    shadowColor: MODERN_COLORS.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  
  cardHover: {
    shadowColor: MODERN_COLORS.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
};

// ========== MODERN SPACING ==========
export const MODERN_SPACING = {
  // Base spacing units (4px scale)
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
  80: 320,
  96: 384,
  
  // Semantic spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
  
  // Component-specific spacing
  padding: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
  },
  
  margin: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
  },
  
  // Screen spacing
  screen: {
    horizontal: 16,
    vertical: 20,
    top: 24,
    bottom: 32,
  },
  
  // Layout spacing
  section: 32,
  container: 20,
  element: 12,
  component: 8,
};

// ========== TYPOGRAPHY ==========
export const MODERN_TYPOGRAPHY = {
  fontFamily: {
    primary: 'System',
    secondary: 'System',
    mono: 'Courier New',
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// ========== BORDER RADIUS ==========
export const MODERN_BORDER_RADIUS = {
  none: 0,
  xs: 4,
  sm: 6,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// ========== COMPONENT CONFIGURATIONS ==========
export const MODERN_COMPONENTS = {
  button: {
    height: {
      sm: 32,
      md: 40,
      lg: 48,
      xl: 56,
    },
    padding: {
      sm: { horizontal: 12, vertical: 6 },
      md: { horizontal: 16, vertical: 8 },
      lg: { horizontal: 20, vertical: 12 },
      xl: { horizontal: 24, vertical: 16 },
    },
    borderRadius: MODERN_BORDER_RADIUS.md,
  },
  
  input: {
    height: {
      sm: 36,
      md: 44,
      lg: 52,
    },
    padding: {
      sm: { horizontal: 12, vertical: 8 },
      md: { horizontal: 16, vertical: 12 },
      lg: { horizontal: 20, vertical: 16 },
    },
    borderRadius: MODERN_BORDER_RADIUS.md,
    borderWidth: 2,
  },
  
  card: {
    padding: MODERN_SPACING.lg,
    borderRadius: MODERN_BORDER_RADIUS.lg,
    shadow: MODERN_SHADOWS.card,
  },
  
  modal: {
    borderRadius: MODERN_BORDER_RADIUS.xl,
    padding: MODERN_SPACING.xl,
    shadow: MODERN_SHADOWS.xl,
    backdrop: MODERN_COLORS.background.overlay,
  },
};

// ========== TEXT STYLES ==========
export const MODERN_TEXT_STYLES = {
  display: {
    fontSize: MODERN_TYPOGRAPHY.fontSize['4xl'],
    fontWeight: MODERN_TYPOGRAPHY.fontWeight.bold,
    lineHeight: MODERN_TYPOGRAPHY.lineHeight.tight,
    color: MODERN_COLORS.text.primary,
  },
  
  title: {
    fontSize: MODERN_TYPOGRAPHY.fontSize['2xl'],
    fontWeight: MODERN_TYPOGRAPHY.fontWeight.semibold,
    lineHeight: MODERN_TYPOGRAPHY.lineHeight.tight,
    color: MODERN_COLORS.text.primary,
  },
  
  heading: {
    fontSize: MODERN_TYPOGRAPHY.fontSize.xl,
    fontWeight: MODERN_TYPOGRAPHY.fontWeight.semibold,
    lineHeight: MODERN_TYPOGRAPHY.lineHeight.normal,
    color: MODERN_COLORS.text.primary,
  },
  
  body: {
    fontSize: MODERN_TYPOGRAPHY.fontSize.base,
    fontWeight: MODERN_TYPOGRAPHY.fontWeight.normal,
    lineHeight: MODERN_TYPOGRAPHY.lineHeight.normal,
    color: MODERN_COLORS.text.primary,
  },
  
  caption: {
    fontSize: MODERN_TYPOGRAPHY.fontSize.sm,
    fontWeight: MODERN_TYPOGRAPHY.fontWeight.normal,
    lineHeight: MODERN_TYPOGRAPHY.lineHeight.normal,
    color: MODERN_COLORS.text.secondary,
  },
  
  label: {
    fontSize: MODERN_TYPOGRAPHY.fontSize.sm,
    fontWeight: MODERN_TYPOGRAPHY.fontWeight.medium,
    color: MODERN_COLORS.text.primary,
  },
};

// ========== UTILITY FUNCTIONS ==========
export const MODERN_UTILS = {
  // Convert hex to rgba
  hexToRgba: (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },
  
  // Get contrasting text color
  getContrastText: (backgroundColor) => {
    const darkColors = [MODERN_COLORS.navy, MODERN_COLORS.red, MODERN_COLORS.gray[800]];
    return darkColors.includes(backgroundColor) ? MODERN_COLORS.white : MODERN_COLORS.navy;
  },
  
  // Platform-specific shadows
  platformShadow: (shadowConfig) => ({
    ...shadowConfig,
  }),
};

// ========== BACKWARD COMPATIBILITY ==========
// Export SHADOWS for files still using the old import
export const SHADOWS = {
  LIGHT: MODERN_SHADOWS.sm,
  MEDIUM: MODERN_SHADOWS.md,
  HEAVY: MODERN_SHADOWS.lg,
};

// ========== DEFAULT EXPORT ==========
const ModernTheme = {
  colors: MODERN_COLORS,
  gradients: MODERN_GRADIENTS,
  shadows: MODERN_SHADOWS,
  spacing: MODERN_SPACING,
  typography: MODERN_TYPOGRAPHY,
  borderRadius: MODERN_BORDER_RADIUS,
  components: MODERN_COMPONENTS,
  textStyles: MODERN_TEXT_STYLES,
  utils: MODERN_UTILS,
};

export default ModernTheme;
