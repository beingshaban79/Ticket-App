import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  bottomSection: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
