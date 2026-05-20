import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await authAPI.login(values);
            const data = response.data;

            // response.data IS the user — no separate user object!
            const userData = {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role
            };

            login(userData, data.token); // ✅
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#f0f2f5'
        }}>
            <Card style={{ width: 400, borderRadius: 12 }}>
                <Title level={2} style={{ textAlign: 'center' }}>
                    🛒 SmartShop
                </Title>
                <Title level={4} style={{ textAlign: 'center' }}>
                    Login
                </Title>

                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Enter email!' },
                            { type: 'email', message: 'Invalid email!' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Enter password!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            size="large"
                        >
                            Login
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        Don't have an account?{' '}
                        <Link to="/register">Register</Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Login;