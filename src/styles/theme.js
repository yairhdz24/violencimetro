import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

export const colors = {
  primary: "#5D9CEC",
  primaryLight: "#bbd6f7",
  secondary: "#7B8D93",
  background: "#F5F7FA",
  white: "#FFFFFF",
  text: "#454F63",
  textLight: "#7B8D93",
  success: "#4CAF50",
  warning: "#FFC107",
  danger: "#FF5252",
  dangerLight: "#FFE5E5",
  inputBg: "#FFFFFF",
  border: "#E0E7FF",
}

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
}

export const fontSizes = {
  xs: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
}

export const borderRadius = {
  s: 4,
  m: 8,
  l: 12,
  xl: 16,
  xxl: 24,
  round: 50,
}

export const shadows = {
  light: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  dark: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  colored: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
}

export const dimensions = {
  width,
  height,
}

