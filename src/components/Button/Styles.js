import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  base: {
    width: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // variants
  primary: {
    backgroundColor: '#137fec',
  },
  secondary: {
    backgroundColor: '#212121',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#137fec',
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // variant text colors
  primaryText:   { color: '#fff' },
  secondaryText: { color: '#fff' },
  outlineText:   { color: '#137fec' },
  ghostText:     { color: '#137fec' },

  // sizes
  sm: { height: height * 0.05 },
  md: { height: height * 0.07 },
  lg: { height: height * 0.08 },

  // size text
  smText: { fontSize: width * 0.035 },
  mdText: { fontSize: width * 0.045 },
  lgText: { fontSize: width * 0.05 },

  label: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  disabled: {
    opacity: 0.5,
  },
});
