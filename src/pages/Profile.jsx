import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    ShoppingOutlined,
    EditOutlined,
    CheckOutlined,
    CloseOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const Profile = () => {
    const { user, login, token } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await orderAPI.getMyOrders(user?.id);
            setOrders(response.data);
        } catch(error) {
            console.log('Could not load orders');
        } finally {
            setLoading(false);
        }
    };

    const totalSpent = orders.reduce(
        (sum, order) => sum + (order.totalAmount || 0), 0
    );

    const handleSaveName = () => {
        if(!name.trim()) {
            message.error('Name cannot be empty!');
            return;
        }
        // Update user in context
        login({ ...user, name }, token);
        setEditing(false);
        message.success('Name updated!');
    };

    const statusConfig = {
        PENDING:   { color: '#f59e0b', bg: '#fffbeb', emoji: '⏳' },
        CONFIRMED: { color: '#3b82f6', bg: '#eff6ff', emoji: '✅' },
        SHIPPED:   { color: '#06b6d4', bg: '#ecfeff', emoji: '🚚' },
        DELIVERED: { color: '#10b981', bg: '#ecfdf5', emoji: '🎉' },
        CANCELLED: { color: '#ef4444', bg: '#fef2f2', emoji: '❌' }
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
                    <ArrowLeftOutlined /> Back
                </button>
                <h1 style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: '#3d1f18',
                    margin: 0
                }}>
                    My Profile
                </h1>
            </div>

            <div style={{
                padding: '24px 32px',
                maxWidth: 900,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20
            }}>

                {/* Profile Card */}
                <div style={{
                    background: 'white',
                    border: '1.5px solid #ffe4d6',
                    borderRadius: 20,
                    padding: 24,
                    gridColumn: '1 / -1'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 20
                    }}>
                        {/* Avatar */}
                        <div style={{
                            background: 'linear-gradient(135deg, #e8603c, #f0a896)',
                            borderRadius: '50%',
                            width: 80,
                            height: 80,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 32,
                            fontWeight: 900,
                            color: 'white',
                            flexShrink: 0
                        }}>
                            {(user?.name || 'U')[0].toUpperCase()}
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1 }}>
                            {/* Name with edit */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                marginBottom: 6
                            }}>
                                {editing ? (
                                    <>
                                        <input
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 800,
                                                color: '#3d1f18',
                                                border: '2px solid #e8603c',
                                                borderRadius: 8,
                                                padding: '4px 10px',
                                                outline: 'none',
                                                background: '#fff8f5'
                                            }}
                                        />
                                        <button
                                            onClick={handleSaveName}
                                            style={{
                                                background: '#e8603c',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: 8,
                                                padding: '6px 10px',
                                                cursor: 'pointer',
                                                fontSize: 12
                                            }}
                                        >
                                            <CheckOutlined />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditing(false);
                                                setName(user?.name || '');
                                            }}
                                            style={{
                                                background: '#fff0eb',
                                                color: '#e8603c',
                                                border: '1.5px solid #ffe4d6',
                                                borderRadius: 8,
                                                padding: '6px 10px',
                                                cursor: 'pointer',
                                                fontSize: 12
                                            }}
                                        >
                                            <CloseOutlined />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h2 style={{
                                            fontSize: 22,
                                            fontWeight: 900,
                                            color: '#3d1f18',
                                            margin: 0
                                        }}>
                                            {user?.name}
                                        </h2>
                                        <button
                                            onClick={() => setEditing(true)}
                                            style={{
                                                background: '#fff0eb',
                                                border: '1.5px solid #ffe4d6',
                                                color: '#e8603c',
                                                borderRadius: 8,
                                                padding: '4px 8px',
                                                cursor: 'pointer',
                                                fontSize: 12
                                            }}
                                        >
                                            <EditOutlined /> Edit
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Email */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                marginBottom: 6
                            }}>
                                <MailOutlined style={{ color: '#e8603c' }} />
                                <span style={{
                                    fontSize: 14,
                                    color: '#a06050',
                                    fontWeight: 600
                                }}>
                                    {user?.email}
                                </span>
                            </div>

                            {/* Role badge */}
                            <div style={{
                                background: '#fff0eb',
                                border: '1.5px solid #ffe4d6',
                                color: '#e8603c',
                                fontSize: 11,
                                fontWeight: 800,
                                padding: '3px 12px',
                                borderRadius: 20,
                                display: 'inline-block',
                                letterSpacing: 1
                            }}>
                                {user?.role || 'USER'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div style={{
                    background: 'white',
                    border: '1.5px solid #ffe4d6',
                    borderRadius: 20,
                    padding: 24,
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: 40, marginBottom: 8 }}>📦</div>
                    <h2 style={{
                        fontSize: 36,
                        fontWeight: 900,
                        color: '#e8603c',
                        margin: '0 0 4px'
                    }}>
                        {orders.length}
                    </h2>
                    <p style={{
                        color: '#a06050',
                        fontSize: 14,
                        fontWeight: 700,
                        margin: 0
                    }}>
                        Total Orders
                    </p>
                </div>

                <div style={{
                    background: 'white',
                    border: '1.5px solid #ffe4d6',
                    borderRadius: 20,
                    padding: 24,
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: 40, marginBottom: 8 }}>💰</div>
                    <h2 style={{
                        fontSize: 36,
                        fontWeight: 900,
                        color: '#e8603c',
                        margin: '0 0 4px'
                    }}>
                        ₹{totalSpent.toLocaleString()}
                    </h2>
                    <p style={{
                        color: '#a06050',
                        fontSize: 14,
                        fontWeight: 700,
                        margin: 0
                    }}>
                        Total Spent
                    </p>
                </div>

                {/* Recent Orders */}
                <div style={{
                    background: 'white',
                    border: '1.5px solid #ffe4d6',
                    borderRadius: 20,
                    padding: 24,
                    gridColumn: '1 / -1'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 16
                    }}>
                        <h3 style={{
                            fontSize: 16,
                            fontWeight: 900,
                            color: '#3d1f18',
                            margin: 0
                        }}>
                            📋 Recent Orders
                        </h3>
                        <button
                            onClick={() => navigate('/orders')}
                            style={{
                                background: '#fff0eb',
                                border: '1.5px solid #ffe4d6',
                                color: '#e8603c',
                                padding: '6px 14px',
                                borderRadius: 25,
                                cursor: 'pointer',
                                fontSize: 12,
                                fontWeight: 700
                            }}
                        >
                            View All →
                        </button>
                    </div>

                    {loading ? (
                        <p style={{ color: '#a06050', textAlign: 'center' }}>
                            Loading orders...
                        </p>
                    ) : orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 24 }}>
                            <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
                            <p style={{ color: '#a06050', fontWeight: 700 }}>
                                No orders yet!
                            </p>
                            <button
                                onClick={() => navigate('/products')}
                                style={{
                                    background: '#e8603c',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 24px',
                                    borderRadius: 25,
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    fontSize: 13
                                }}
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10
                        }}>
                            {orders.slice(0, 3).map(order => {
                                const status = statusConfig[order.status]
                                    || statusConfig.PENDING;
                                return (
                                    <div
                                        key={order.id}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            background: '#fff8f5',
                                            border: '1.5px solid #ffe4d6',
                                            borderRadius: 12,
                                            padding: '12px 16px'
                                        }}
                                    >
                                        <div>
                                            <p style={{
                                                fontSize: 12,
                                                fontWeight: 800,
                                                color: '#3d1f18',
                                                margin: '0 0 2px',
                                                fontFamily: 'monospace'
                                            }}>
                                                #{String(order.id || '')
                                                .slice(-8).toUpperCase()}
                                            </p>
                                            <p style={{
                                                fontSize: 11,
                                                color: '#a06050',
                                                margin: 0,
                                                fontWeight: 600
                                            }}>
                                                {order.items?.length} items •{' '}
                                                {new Date(order.createdAt)
                                                    .toLocaleDateString('en-IN')}
                                            </p>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10
                                        }}>
                                            <span style={{
                                                fontSize: 15,
                                                fontWeight: 900,
                                                color: '#e8603c'
                                            }}>
                                                ₹{order.totalAmount
                                                ?.toLocaleString()}
                                            </span>
                                            <span style={{
                                                background: status.bg,
                                                color: status.color,
                                                fontSize: 11,
                                                fontWeight: 800,
                                                padding: '4px 10px',
                                                borderRadius: 20
                                            }}>
                                                {status.emoji} {order.status}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Account Info */}
                <div style={{
                    background: 'white',
                    border: '1.5px solid #ffe4d6',
                    borderRadius: 20,
                    padding: 24,
                    gridColumn: '1 / -1'
                }}>
                    <h3 style={{
                        fontSize: 16,
                        fontWeight: 900,
                        color: '#3d1f18',
                        margin: '0 0 16px'
                    }}>
                        ⚙️ Account Info
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 12
                    }}>
                        {[
                            { label: 'User ID', value: `#${user?.id}` },
                            { label: 'Role', value: user?.role || 'USER' },
                            { label: 'Email', value: user?.email },
                            { label: 'Member Since', value: '2026' }
                        ].map(item => (
                            <div
                                key={item.label}
                                style={{
                                    background: '#fff8f5',
                                    border: '1.5px solid #ffe4d6',
                                    borderRadius: 12,
                                    padding: '12px 16px'
                                }}
                            >
                                <p style={{
                                    fontSize: 11,
                                    color: '#a06050',
                                    fontWeight: 800,
                                    margin: '0 0 4px',
                                    letterSpacing: 1,
                                    textTransform: 'uppercase'
                                }}>
                                    {item.label}
                                </p>
                                <p style={{
                                    fontSize: 14,
                                    fontWeight: 800,
                                    color: '#3d1f18',
                                    margin: 0
                                }}>
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;