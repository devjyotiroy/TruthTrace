const axios = require('axios');

async function testBackend() {
    try {
        console.log('Testing backend connection...');
        
        // Test 1: Check if server is running
        const healthCheck = await axios.get('http://localhost:5000/');
        console.log('✅ Server is running:', healthCheck.data);
        
        // Test 2: Try signup
        const signupData = {
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            password: 'test123'
        };
        
        console.log('\nTesting signup...');
        const signupRes = await axios.post('http://localhost:5000/api/auth/signup', signupData);
        console.log('✅ Signup successful:', signupRes.data);
        
        // Test 3: Try login
        console.log('\nTesting login...');
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: signupData.email,
            password: signupData.password
        });
        console.log('✅ Login successful:', loginRes.data);
        
        console.log('\n✅ All tests passed! Backend is working correctly.');
        
    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
        console.error('\nMake sure:');
        console.error('1. Backend server is running (node server.js)');
        console.error('2. MongoDB is connected');
        console.error('3. Port 5000 is not blocked');
    }
}

testBackend();
