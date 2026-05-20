import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import login from "./Login";

const { Title } = Typography;

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await authAPI.register(values);
            const data = response.data;

            const userData = {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role
            };

            login(userData, data.token); // auto login after register
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
                    Register
                </Title>

                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Enter name!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Full Name"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Enter email!' },
                            { type: 'email', message: 'Invalid email!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Enter password!' },
                            { min: 6, message: 'Min 6 characters!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Confirm password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if(!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Passwords do not match!');
                                }
                            })
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Confirm Password"
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
                            Register
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link to="/login">Login</Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Register;