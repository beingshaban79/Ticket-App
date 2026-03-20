import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: height * 0.07,
    width: '100%',
  },

  // variants
  default: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  outlined: {
    borderWidth: 2,
    borderColor: '#137fec',
    backgroundColor: 'transparent',
  },
  filled: {
    borderWidth: 0,
    backgroundColor: '#e8f1fd',
  },

  errorBorder: {
    borderColor: '#e53935',
    borderWidth: 1.5,
  },
  icon: {
    marginRight: 10,
    color: '#9e9e9e',
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#212121',
  },
});
