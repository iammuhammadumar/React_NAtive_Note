import { Dimensions } from "react-native";

export const colors = {
  background: '#F5F2F9',
  errorText: '#FA3256',
  headerText: 'white',
  headerBackground: '#571b3c',
  buttonBackground: 'white',
  windowBackground: "white",
  buttonBorder: 'black',
  pressedBackground: '#b0f4e1',
  buttonText: 'white',
  inputBackground: '#FFFFFF',
  inputDivider: '#E4E2E5',
  textColor: '#571b3c',
  accent: '#951c6b'
};

export const dimens = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
};

export const fontWeight = {
  Thin: "100",
  UltraLight: "200",
  Light: "300",
  Regular: "400",
  Medium: "500",
  Semibold: "600",
  Bold: "700",
  Heavy: "800",
  Black: "900"
};