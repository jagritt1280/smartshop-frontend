import React, { useState } from 'react';
import { message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if(!values.name) newErrors.name = 'Enter your name!';
        if(!values.email) newErrors.email = 'Enter your email!';
        if(!values.password) newErrors.password = 'Enter password!';
        if(values.password.length < 6) newErrors.password = 'Min 6 characters!';
        if(values.password !== values.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match!';
        return newErrors;
    };

    const onFinish = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        try {
            const response = await authAPI.register({
                name: values.name,
                email: values.email,
                password: values.password
            });
            const data = response.data;
            const userData = {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role
            };
            login(userData, data.token);
            message.success('Registration successful!');
            navigate('/products');
        } catch(error) {
            message.error(
                error.response?.data?.message || 'Registration failed!'
            );
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        border: '2px solid #ffe4d6',
        borderRadius: 12,
        fontSize: 14,
        color: '#3d1f18',
        background: '#fff8f5',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
        fontFamily: "'Helvetica Neue', sans-serif"
    };

    const labelStyle = {
        display: 'block',
        fontSize: 13,
        fontWeight: 700,
        color: '#3d1f18',
        marginBottom: 6
    };

    const errorStyle = {
        color: '#e8603c',
        fontSize: 11,
        fontWeight: 600,
        marginTop: 4
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
            <div style={{
                background: '#ffffff',
                borderRadius: 24,
                padding: '48px 40px',
                width: '100%',
                maxWidth: 440,
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
                    <p style={{ color: '#a06050', fontSize: 14, margin: 0 }}>
                        Create your account
                    </p>
                </div>

                <form onSubmit={onFinish}>
                    {/* Name */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Jagrit Taneja"
                            value={values.name}
                            onChange={handleChange}
                            style={{
                                ...inputStyle,
                                borderColor: errors.name ? '#e8603c' : '#ffe4d6'
                            }}
                            onFocus={e => e.target.style.borderColor = '#e8603c'}
                            onBlur={e => e.target.style.borderColor = errors.name ? '#e8603c' : '#ffe4d6'}
                        />
                        {errors.name && <p style={errorStyle}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={values.email}
                            onChange={handleChange}
                            style={{
                                ...inputStyle,
                                borderColor: errors.email ? '#e8603c' : '#ffe4d6'
                            }}
                            onFocus={e => e.target.style.borderColor = '#e8603c'}
                            onBlur={e => e.target.style.borderColor = errors.email ? '#e8603c' : '#ffe4d6'}
                        />
                        {errors.email && <p style={errorStyle}>{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Min 6 characters"
                            value={values.password}
                            onChange={handleChange}
                            style={{
                                ...inputStyle,
                                borderColor: errors.password ? '#e8603c' : '#ffe4d6'
                            }}
                            onFocus={e => e.target.style.borderColor = '#e8603c'}
                            onBlur={e => e.target.style.borderColor = errors.password ? '#e8603c' : '#ffe4d6'}
                        />
                        {errors.password && <p style={errorStyle}>{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div style={{ marginBottom: 24 }}>
                        <label style={labelStyle}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Repeat your password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            style={{
                                ...inputStyle,
                                borderColor: errors.confirmPassword ? '#e8603c' : '#ffe4d6'
                            }}
                            onFocus={e => e.target.style.borderColor = '#e8603c'}
                            onBlur={e => e.target.style.borderColor = errors.confirmPassword ? '#e8603c' : '#ffe4d6'}
                        />
                        {errors.confirmPassword &&
                            <p style={errorStyle}>{errors.confirmPassword}</p>}
                    </div>

                    {/* Submit */}
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
                        {loading ? 'Creating account...' : 'Create Account →'}
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

                {/* Login link */}
                <div style={{ textAlign: 'center' }}>
                    <span style={{ color: '#a06050', fontSize: 14 }}>
                        Already have an account?{' '}
                    </span>
                    <Link
                        to="/login"
                        style={{
                            color: '#e8603c',
                            fontWeight: 800,
                            fontSize: 14,
                            textDecoration: 'none'
                        }}
                    >
                        Sign in →
                    </Link>
                </div>

                {/* Benefits */}
                <div style={{
                    marginTop: 20,
                    background: '#fff0eb',
                    border: '1.5px solid #ffe4d6',
                    borderRadius: 12,
                    padding: '12px 16px'
                }}>
                    <p style={{
                        margin: '0 0 6px',
                        fontSize: 12,
                        color: '#e8603c',
                        fontWeight: 800
                    }}>
                        ✨ Why join SmartShop?
                    </p>
                    <p style={{ margin: '2px 0', fontSize: 11, color: '#a06050', fontWeight: 600 }}>
                        🚚 Free delivery on all orders
                    </p>
                    <p style={{ margin: '2px 0', fontSize: 11, color: '#a06050', fontWeight: 600 }}>
                        🔒 Secure payments with idempotency
                    </p>
                    <p style={{ margin: '2px 0', fontSize: 11, color: '#a06050', fontWeight: 600 }}>
                        📦 Real-time order tracking
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;