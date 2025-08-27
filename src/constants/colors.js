export const COLORS = {
  PRIMARY_WHITE: '#FFFFFF',
  PRIMARY_DARK: '#110921',
  PRIMARY_RED: '#A71C20',
  ACCENT: '#FFD700',
  GRAY_LIGHT: '#F5F5F5',
  GRAY_MEDIUM: '#CCCCCC',
  GRAY_DARK: '#666666',
  SUCCESS: '#28A745',
  WARNING: '#FFC107',
  DANGER: '#DC3545',
  TRANSPARENT: 'transparent',
};

export const GRADIENTS = {
  PRIMARY: [COLORS.PRIMARY_DARK, COLORS.PRIMARY_RED],
  ACCENT: [COLORS.PRIMARY_RED, '#FF4D6D'],
  DARK: [COLORS.PRIMARY_DARK, '#1E1F3A'],
};

export const SHADOWS = {
  LIGHT: {
    shadowColor: COLORS.PRIMARY_DARK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  MEDIUM: {
    shadowColor: COLORS.PRIMARY_DARK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  HEAVY: {
    shadowColor: COLORS.PRIMARY_DARK,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
};
