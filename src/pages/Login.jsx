import React, { useState } from 'react';
import { message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onFinish = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await authAPI.login(values);
            const data = response.data;
            const userData = {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role
            };
            login(userData, data.token);
            message.success('Login successful!');
            navigate('/products');
        } catch(error) {
            message.error(
                error.response?.data?.message || 'Login failed!'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#fff8f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            fontFamily: "'Helvetica Neue', sans-serif"
        }}>
            {/* Left decorative panel */}
            <div style={{
                display: 'none',
                background: 'linear-gradient(135deg, #e8603c 0%, #f0a896 100%)',
                borderRadius: '24px 0 0 24px',
                padding: 48,
                width: 360,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }} className="login-left">
                <div style={{ fontSize: 80, marginBottom: 24 }}>🛍️</div>
                <h2 style={{
                    color: 'white',
                    fontSize: 28,
                    fontWeight: 900,
                    margin: '0 0 12px',
                    lineHeight: 1.2
                }}>
                    Welcome Back!
                </h2>
                <p style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: 0
                }}>
                    Shop the best products at the best prices. Login to continue.
                </p>
            </div>

            {/* Right form panel */}
            <div style={{
                background: '#ffffff',
                borderRadius: 24,
                padding: '48px 40px',
                width: '100%',
                maxWidth: 420,
                border: '2px solid #ffe4d6',
                boxShadow: '0 20px 60px rgba(232,96,60,0.1)'
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #e8603c, #f0a896)',
                        borderRadius: 16,
                        width: 56,
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 28,
                        margin: '0 auto 16px'
                    }}>
                        🛒
                    </div>
                    <h1 style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: '#3d1f18',
                        margin: '0 0 4px',
                        letterSpacing: '-0.5px'
                    }}>
                        Smart<span style={{ color: '#e8603c' }}>Shop</span>
                    </h1>
                    <p style={{
                        color: '#a06050',
                        fontSize: 14,
                        margin: 0
                    }}>
                        Sign in to your account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={onFinish}>
                    {/* Email */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={{
                            display: 'block',
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#3d1f18',
                            marginBottom: 6
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={values.email}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #ffe4d6',
                                borderRadius: 12,
                                fontSize: 14,
                                color: '#3d1f18',
                                background: '#fff8f5',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={e => e.target.style.borderColor = '#e8603c'}
                            onBlur={e => e.target.style.borderColor = '#ffe4d6'}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: 24 }}>
                        <label style={{
                            display: 'block',
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#3d1f18',
                            marginBottom: 6
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #ffe4d6',
                                borderRadius: 12,
                                fontSize: 14,
                                color: '#3d1f18',
                                background: '#fff8f5',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={e => e.target.style.borderColor = '#e8603c'}
                            onBlur={e => e.target.style.borderColor = '#ffe4d6'}
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: loading
                                ? '#f0a896'
                                : 'linear-gradient(135deg, #e8603c, #f0a896)',
                            border: 'none',
                            borderRadius: 30,
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 800,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: '0 8px 24px rgba(232,96,60,0.3)',
                            transition: 'all 0.2s',
                            letterSpacing: 0.5
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In →'}
                    </button>
                </form>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    margin: '24px 0'
                }}>
                    <div style={{ flex: 1, height: 1, background: '#ffe4d6' }} />
                    <span style={{ color: '#f0a896', fontSize: 12, fontWeight: 700 }}>OR</span>
                    <div style={{ flex: 1, height: 1, background: '#ffe4d6' }} />
                </div>

                {/* Register link */}
                <div style={{ textAlign: 'center' }}>
                    <span style={{ color: '#a06050', fontSize: 14 }}>
                        Don't have an account?{' '}
                    </span>
                    <Link
                        to="/register"
                        style={{
                            color: '#e8603c',
                            fontWeight: 800,
                            fontSize: 14,
                            textDecoration: 'none'
                        }}
                    >
                        Register now →
                    </Link>
                </div>

                {/* Demo credentials */}
                <div style={{
                    marginTop: 20,
                    background: '#fff0eb',
                    border: '1.5px solid #ffe4d6',
                    borderRadius: 12,
                    padding: '10px 14px',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: 12,
                        color: '#a06050',
                        fontWeight: 600
                    }}>
                        Demo: test@test.com / 123456
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;