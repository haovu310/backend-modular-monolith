import React, { useState } from 'react';
import { AuthService } from '../../service/AuthService';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const user = await AuthService.login(email, password);
        if (user) {
            onLogin(user);
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{
                padding: '30px', backgroundColor: 'white', borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
                {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
                    </div>
                    <button type="submit" style={{
                        width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white',
                        border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                    }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
