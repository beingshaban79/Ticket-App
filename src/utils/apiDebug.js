import axios from 'axios';

/**
 * Call this once from any screen to see the raw API response in the console.
 * Remove after debugging.
 */
export const debugLoginAPI = async () => {
  try {
    const response = await axios.post(
      'https://conductor.arizolve.com/auth/conductor/login.php',
      { username: 'conductor1', password: '123456' },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('✅ API Status:', response.status);
    console.log('✅ API Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('❌ API Error Status:', error.response?.status);
    console.log('❌ API Error Data:', JSON.stringify(error.response?.data, null, 2));
    console.log('❌ Error Message:', error.message);
  }
};
