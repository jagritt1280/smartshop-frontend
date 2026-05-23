import React, { useState } from 'react';
import { message } from 'antd';
import {
    CheckCircleOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const { cartItems, totalAmount, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // ✅ Pre-filled with user data
    const [values, setValues] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        if(!values.name || !values.email || !values.phone || !values.address) {
            message.error('Please fill all fields!');
            return;
        }
        setLoading(true);
        try {
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
            clearCart();
            navigate('/payment', {
                state: { orderId, amount: totalAmount }
            });
        } catch(error) {
            message.error(
                error.response?.data?.message || 'Checkout failed!'
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
        fontFamily: "'Helvetica Neue', sans-serif",
        transition: 'border-color 0.2s'
    };

    const labelStyle = {
        display: 'block',
        fontSize: 13,
        fontWeight: 700,
        color: '#3d1f18',
        marginBottom: 6
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#fff8f5',
            fontFamily: "'Helvetica Neue', sans-serif"
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #ffe4d6, #ffd6e7)',
                padding: '28px 32px'
            }}>
                <button
                    onClick={() => navigate('/cart')}
                    style={{
                        background: 'white',
                        border: '1.5px solid #ffe4d6',
                        color: '#e8603c',
                        padding: '8px 16px',
                        borderRadius: 25,
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        marginBottom: 16
                    }}
                >
                    <ArrowLeftOutlined /> Back to Cart
                </button>

                {/* Steps */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 16
                }}>
                    {['Cart', 'Checkout', 'Payment'].map((step, idx) => (
                        <React.Fragment key={step}>
                            <div style={{
                                background: idx === 1 ? '#e8603c' : idx < 1 ? '#f0a896' : '#ffe4d6',
                                color: idx <= 1 ? 'white' : '#a06050',
                                padding: '6px 16px',
                                borderRadius: 25,
                                fontSize: 12,
                                fontWeight: 800
                            }}>
                                {idx < 1 ? '✓ ' : ''}{step}
                            </div>
                            {idx < 2 && (
                                <div style={{
                                    height: 2,
                                    width: 24,
                                    background: idx < 1 ? '#e8603c' : '#ffe4d6',
                                    borderRadius: 2
                                }} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <h1 style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: '#3d1f18',
                    margin: 0
                }}>
                    Checkout
                </h1>
            </div>

            {/* Content */}
            <div style={{
                padding: '24px 32px',
                display: 'grid',
                gridTemplateColumns: '1fr 360px',
                gap: 24,
                maxWidth: 1100,
                margin: '0 auto'
            }}>
                {/* Left — Form */}
                <form onSubmit={handleCheckout}>
                    <div style={{
                        background: 'white',
                        border: '1.5px solid #ffe4d6',
                        borderRadius: 20,
                        padding: 24,
                        marginBottom: 16
                    }}>
                        <h3 style={{
                            fontSize: 16,
                            fontWeight: 900,
                            color: '#3d1f18',
                            margin: '0 0 20px'
                        }}>
                            📦 Shipping Details
                        </h3>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 16,
                            marginBottom: 16
                        }}>
                            <div>
                                <label style={labelStyle}>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={values.name}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#e8603c'}
                                    onBlur={e => e.target.style.borderColor = '#ffe4d6'}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="+91 9876543210"
                                    value={values.phone}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#e8603c'}
                                    onBlur={e => e.target.style.borderColor = '#ffe4d6'}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <label style={labelStyle}>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                value={values.email}
                                onChange={handleChange}
                                style={inputStyle}
                                onFocus={e => e.target.style.borderColor = '#e8603c'}
                                onBlur={e => e.target.style.borderColor = '#ffe4d6'}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Delivery Address</label>
                            <textarea
                                name="address"
                                placeholder="House no, Street, City, State, Pincode"
                                value={values.address}
                                onChange={handleChange}
                                rows={3}
                                style={{ ...inputStyle, resize: 'vertical' }}
                                onFocus={e => e.target.style.borderColor = '#e8603c'}
                                onBlur={e => e.target.style.borderColor = '#ffe4d6'}
                            />
                        </div>
                    </div>

                    {/* UPI Only Payment */}
                    <div style={{
                        background: 'white',
                        border: '2px solid #e8603c',
                        borderRadius: 20,
                        padding: 24
                    }}>
                        <h3 style={{
                            fontSize: 16,
                            fontWeight: 900,
                            color: '#3d1f18',
                            margin: '0 0 12px'
                        }}>
                            💳 Payment Method
                        </h3>
                        <div style={{
                            background: '#fff0eb',
                            border: '2px solid #e8603c',
                            borderRadius: 14,
                            padding: '14px 18px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14
                        }}>
                            <div style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                border: '6px solid #e8603c',
                                flexShrink: 0
                            }} />
                            <span style={{ fontSize: 24 }}>📱</span>
                            <div>
                                <p style={{
                                    margin: 0,
                                    fontSize: 14,
                                    fontWeight: 800,
                                    color: '#3d1f18'
                                }}>
                                    UPI Payment
                                </p>
                                <p style={{
                                    margin: 0,
                                    fontSize: 11,
                                    color: '#a06050',
                                    fontWeight: 600
                                }}>
                                    GPay, PhonePe, Paytm — Scan QR on next page
                                </p>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Right — Order Summary */}
                <div>
                    <div style={{
                        background: 'white',
                        border: '1.5px solid #ffe4d6',
                        borderRadius: 20,
                        padding: 24,
                        position: 'sticky',
                        top: 80
                    }}>
                        <h3 style={{
                            fontSize: 16,
                            fontWeight: 900,
                            color: '#3d1f18',
                            margin: '0 0 16px',
                            paddingBottom: 12,
                            borderBottom: '2px solid #ffe4d6'
                        }}>
                            🧾 Order Summary
                        </h3>

                        {cartItems.map(item => (
                            <div key={item.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 10
                            }}>
                                <div>
                                    <p style={{
                                        margin: 0,
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: '#3d1f18'
                                    }}>
                                        {item.name}
                                    </p>
                                    <p style={{
                                        margin: 0,
                                        fontSize: 11,
                                        color: '#a06050',
                                        fontWeight: 600
                                    }}>
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                                <span style={{
                                    fontSize: 14,
                                    fontWeight: 800,
                                    color: '#3d1f18'
                                }}>
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                </span>
                            </div>
                        ))}

                        <div style={{
                            borderTop: '1.5px solid #ffe4d6',
                            marginTop: 12,
                            paddingTop: 12
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 8
                            }}>
                                <span style={{ fontSize: 13, color: '#a06050', fontWeight: 600 }}>
                                    Subtotal
                                </span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#3d1f18' }}>
                                    ₹{totalAmount?.toLocaleString()}
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 12
                            }}>
                                <span style={{ fontSize: 13, color: '#a06050', fontWeight: 600 }}>
                                    Delivery
                                </span>
                                <span style={{ fontSize: 13, fontWeight: 800, color: '#10b981' }}>
                                    FREE 🎉
                                </span>
                            </div>

                            <div style={{
                                background: '#fff0eb',
                                border: '1.5px solid #ffe4d6',
                                borderRadius: 12,
                                padding: '12px 16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 16
                            }}>
                                <span style={{ fontSize: 16, fontWeight: 900, color: '#3d1f18' }}>
                                    Total
                                </span>
                                <span style={{ fontSize: 22, fontWeight: 900, color: '#e8603c' }}>
                                    ₹{totalAmount?.toLocaleString()}
                                </span>
                            </div>

                            <button
                                onClick={handleCheckout}
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
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 8
                                }}
                            >
                                <CheckCircleOutlined />
                                {loading
                                    ? 'Placing order...'
                                    : `Proceed to Pay ₹${totalAmount?.toLocaleString()} →`}
                            </button>
                        </div>

                        <div style={{
                            marginTop: 16,
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 16,
                            flexWrap: 'wrap'
                        }}>
                            <span style={{ fontSize: 11, color: '#a06050', fontWeight: 600 }}>
                                🔒 Secure checkout
                            </span>
                            <span style={{ fontSize: 11, color: '#a06050', fontWeight: 600 }}>
                                📱 UPI Payment
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;