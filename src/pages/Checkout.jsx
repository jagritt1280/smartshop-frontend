import React, { useState } from 'react';
import {
    Card, Form, Input, Button,
    Typography, Space, Divider,
    message, Radio, Steps
} from 'antd';
import {
    CreditCardOutlined,
    CheckCircleOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI, paymentAPI } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

const { Title, Text } = Typography;

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('UPI');
    const { cartItems, totalAmount, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleCheckout = async (values) => {
        setLoading(true);
        try {
            // Step 1: Create order
            const orderData = {
                userId: user?.id,
                items: cartItems.map(item => ({
                    productId: item.id,
                    productName: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount,
                shippingAddress: values.address
            };

            const orderResponse = await orderAPI.create(orderData);
            const orderId = orderResponse.data.id;

            // Step 2: Process payment
            const paymentData = {
                orderId: String(orderId),           // must be String
                userId: String(user?.id),           // must be String
                amount: totalAmount,
                paymentMethod,
                idempotencyKey: uuidv4()
            };

            await paymentAPI.process(paymentData);

            // Step 3: Clear cart and redirect
            clearCart();
            message.success('Order placed successfully!');
            navigate(`/orders`);

        } catch(error) {
            message.error(
                error.response?.data?.message || 'Checkout failed!'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
            <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/cart')}
                style={{ marginBottom: 24 }}
            >
                Back to Cart
            </Button>

            <Title level={2}>📦 Checkout</Title>

            <Steps
                current={1}
                items={[
                    { title: 'Cart' },
                    { title: 'Checkout' },
                    { title: 'Confirmation' }
                ]}
                style={{ marginBottom: 24 }}
            />

            <Space direction="horizontal"
                   align="start"
                   style={{ width: '100%' }}
                   size={24}
            >
                {/* Left — Order Form */}
                <Card title="Shipping Details"
                      style={{ flex: 1 }}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleCheckout}
                    >
                        <Form.Item
                            name="name"
                            label="Full Name"
                            initialValue={user?.name}
                            rules={[{
                                required: true,
                                message: 'Enter name!'
                            }]}
                        >
                            <Input size="large" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            initialValue={user?.email}
                            rules={[{
                                required: true,
                                message: 'Enter email!'
                            }]}
                        >
                            <Input size="large" />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[{
                                required: true,
                                message: 'Enter phone!'
                            }]}
                        >
                            <Input size="large" />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="Delivery Address"
                            rules={[{
                                required: true,
                                message: 'Enter address!'
                            }]}
                        >
                            <Input.TextArea rows={3} size="large" />
                        </Form.Item>

                        <Divider>Payment Method</Divider>

                        <Form.Item name="paymentMethod">
                            <Radio.Group
                                value={paymentMethod}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)}
                            >
                                <Space direction="vertical">
                                    <Radio value="UPI">
                                        📱 UPI
                                    </Radio>
                                    <Radio value="CARD">
                                        💳 Credit/Debit Card
                                    </Radio>
                                    <Radio value="COD">
                                        💵 Cash on Delivery
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            size="large"
                            icon={<CheckCircleOutlined />}
                        >
                            Place Order ₹{totalAmount}
                        </Button>
                    </Form>
                </Card>

                {/* Right — Order Summary */}
                <Card title="Order Summary"
                      style={{ width: 300 }}>
                    <Space direction="vertical"
                           style={{ width: '100%' }}>
                        {cartItems.map(item => (
                            <div key={item.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Text>{item.name} x{item.quantity}</Text>
                                <Text>₹{item.price * item.quantity}</Text>
                            </div>
                        ))}
                        <Divider />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Text strong>Total:</Text>
                            <Text strong style={{ color: '#1890ff' }}>
                                ₹{totalAmount}
                            </Text>
                        </div>
                    </Space>
                </Card>
            </Space>
        </div>
    );
};

export default Checkout;