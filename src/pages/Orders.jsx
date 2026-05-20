import { useAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import {
    ShoppingOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';

const statusConfig = {
    PENDING:   { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', emoji: '⏳' },
    CONFIRMED: { color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe', emoji: '✅' },
    SHIPPED:   { color: '#06b6d4', bg: '#ecfeff', border: '#a5f3fc', emoji: '🚚' },
    DELIVERED: { color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0', emoji: '🎉' },
    CANCELLED: { color: '#ef4444', bg: '#fef2f2', border: '#fecaca', emoji: '❌' }
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await orderAPI.getMyOrders(user?.id);
            setOrders(response.data);
        } catch(error) {
            message.error('Failed to load orders!');
        } finally {
            setLoading(false);
        }
    };

    if(loading) return (
        <div style={{
            minHeight: '100vh',
            background: '#fff8f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Helvetica Neue', sans-serif"
        }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <p style={{ color: '#a06050', fontWeight: 700 }}>
                Loading your orders...
            </p>
        </div>
    );

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
                    onClick={() => navigate('/products')}
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
                    <ArrowLeftOutlined /> Continue Shopping
                </button>
                <h1 style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: '#3d1f18',
                    margin: '0 0 4px'
                }}>
                    My Orders
                </h1>
                <p style={{
                    color: '#a06050',
                    fontSize: 14,
                    margin: 0,
                    fontWeight: 600
                }}>
                    {orders.length} order{orders.length !== 1 ? 's' : ''} placed
                </p>
            </div>

            <div style={{ padding: '24px 32px', maxWidth: 900, margin: '0 auto' }}>
                {orders.length === 0 ? (
                    /* Empty state */
                    <div style={{
                        background: 'white',
                        border: '1.5px solid #ffe4d6',
                        borderRadius: 24,
                        padding: '60px 40px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: 80, marginBottom: 20 }}>📦</div>
                        <h2 style={{
                            fontSize: 22,
                            fontWeight: 900,
                            color: '#3d1f18',
                            margin: '0 0 8px'
                        }}>
                            No orders yet!
                        </h2>
                        <p style={{
                            color: '#a06050',
                            fontSize: 14,
                            margin: '0 0 24px'
                        }}>
                            Start shopping to see your orders here
                        </p>
                        <button
                            onClick={() => navigate('/products')}
                            style={{
                                background: 'linear-gradient(135deg, #e8603c, #f0a896)',
                                color: 'white',
                                border: 'none',
                                padding: '14px 32px',
                                borderRadius: 30,
                                fontSize: 15,
                                fontWeight: 800,
                                cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(232,96,60,0.3)'
                            }}
                        >
                            🛍️ Start Shopping
                        </button>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16
                    }}>
                        {orders.map(order => {
                            const status = statusConfig[order.status] ||
                                statusConfig.PENDING;
                            return (
                                <div
                                    key={order.id}
                                    style={{
                                        background: 'white',
                                        border: '1.5px solid #ffe4d6',
                                        borderRadius: 20,
                                        overflow: 'hidden'
                                    }}
                                >
                                    {/* Order header */}
                                    <div style={{
                                        background: '#fff8f5',
                                        borderBottom: '1.5px solid #ffe4d6',
                                        padding: '14px 20px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <span style={{
                                                fontSize: 12,
                                                color: '#a06050',
                                                fontWeight: 700
                                            }}>
                                                ORDER ID
                                            </span>
                                            <p style={{
                                                fontSize: 13,
                                                fontWeight: 800,
                                                color: '#3d1f18',
                                                margin: '2px 0 0',
                                                fontFamily: 'monospace'
                                            }}>
                                                #{String(order.id || '').slice(-8).toUpperCase() || order.id}
                                            </p>
                                        </div>

                                        <div style={{ textAlign: 'center' }}>
                                            <span style={{
                                                fontSize: 12,
                                                color: '#a06050',
                                                fontWeight: 700
                                            }}>
                                                DATE
                                            </span>
                                            <p style={{
                                                fontSize: 13,
                                                fontWeight: 700,
                                                color: '#3d1f18',
                                                margin: '2px 0 0'
                                            }}>
                                                {new Date(order.createdAt)
                                                    .toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                            </p>
                                        </div>

                                        <div style={{ textAlign: 'center' }}>
                                            <span style={{
                                                fontSize: 12,
                                                color: '#a06050',
                                                fontWeight: 700
                                            }}>
                                                TOTAL
                                            </span>
                                            <p style={{
                                                fontSize: 16,
                                                fontWeight: 900,
                                                color: '#e8603c',
                                                margin: '2px 0 0'
                                            }}>
                                                ₹{order.totalAmount?.toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Status badge */}
                                        <div style={{
                                            background: status.bg,
                                            border: `1.5px solid ${status.border}`,
                                            color: status.color,
                                            padding: '6px 14px',
                                            borderRadius: 25,
                                            fontSize: 12,
                                            fontWeight: 800,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 4
                                        }}>
                                            {status.emoji} {order.status}
                                        </div>
                                    </div>

                                    {/* Order items */}
                                    <div style={{ padding: '14px 20px' }}>
                                        <p style={{
                                            fontSize: 11,
                                            color: '#a06050',
                                            fontWeight: 800,
                                            margin: '0 0 10px',
                                            letterSpacing: 1
                                        }}>
                                            ITEMS ORDERED
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 8
                                        }}>
                                            {order.items?.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: '#fff0eb',
                                                        border: '1.5px solid #ffe4d6',
                                                        borderRadius: 25,
                                                        padding: '6px 14px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6
                                                    }}
                                                >
                                                    <span style={{
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        color: '#3d1f18'
                                                    }}>
                                                        {item.productName}
                                                    </span>
                                                    <span style={{
                                                        background: '#e8603c',
                                                        color: 'white',
                                                        fontSize: 10,
                                                        fontWeight: 800,
                                                        padding: '2px 7px',
                                                        borderRadius: 20
                                                    }}>
                                                        ×{item.quantity}
                                                    </span>
                                                    <span style={{
                                                        fontSize: 12,
                                                        color: '#e8603c',
                                                        fontWeight: 800
                                                    }}>
                                                        ₹{item.price?.toLocaleString()}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Shipping address */}
                                        {order.shippingAddress && (
                                            <div style={{
                                                marginTop: 12,
                                                padding: '8px 12px',
                                                background: '#fff8f5',
                                                border: '1.5px solid #ffe4d6',
                                                borderRadius: 10,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8
                                            }}>
                                                <span style={{ fontSize: 14 }}>📍</span>
                                                <span style={{
                                                    fontSize: 12,
                                                    color: '#a06050',
                                                    fontWeight: 600
                                                }}>
                                                    {order.shippingAddress}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;