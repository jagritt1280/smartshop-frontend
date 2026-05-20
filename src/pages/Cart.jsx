import React from 'react';
import { message } from 'antd';
import {
    DeleteOutlined,
    ShoppingOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const categoryEmojis = {
    Electronics: '💻',
    Fashion: '👟',
    Food: '🍕',
    Books: '📚',
    Sports: '⚽',
    Home: '🏠',
    Beauty: '💄',
    Toys: '🧸'
};

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        totalAmount,
        totalItems
    } = useCart();
    const navigate = useNavigate();

    if(cartItems.length === 0) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#fff8f5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Helvetica Neue', sans-serif",
                padding: 24
            }}>
                <div style={{ fontSize: 80, marginBottom: 24 }}>🛒</div>
                <h2 style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: '#3d1f18',
                    margin: '0 0 8px'
                }}>
                    Your cart is empty!
                </h2>
                <p style={{
                    color: '#a06050',
                    fontSize: 14,
                    margin: '0 0 24px'
                }}>
                    Add some products to get started
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
        );
    }

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
                    margin: 0
                }}>
                    My Cart
                    <span style={{
                        background: '#e8603c',
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 800,
                        padding: '4px 12px',
                        borderRadius: 20,
                        marginLeft: 12
                    }}>
                        {totalItems} items
                    </span>
                </h1>
            </div>

            <div style={{
                padding: '24px 32px',
                display: 'grid',
                gridTemplateColumns: '1fr 360px',
                gap: 24,
                maxWidth: 1200,
                margin: '0 auto'
            }}>
                {/* Cart Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {cartItems.map(item => (
                        <div
                            key={item.id}
                            style={{
                                background: 'white',
                                border: '1.5px solid #ffe4d6',
                                borderRadius: 16,
                                padding: 16,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16
                            }}
                        >
                            {/* Product emoji */}
                            <div style={{
                                background: 'linear-gradient(135deg, #ffe4d6, #ffd6e7)',
                                borderRadius: 12,
                                width: 72,
                                height: 72,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 36,
                                flexShrink: 0
                            }}>
                                {categoryEmojis[item.category] || '📦'}
                            </div>

                            {/* Product info */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    fontSize: 15,
                                    fontWeight: 800,
                                    color: '#3d1f18',
                                    margin: '0 0 4px'
                                }}>
                                    {item.name}
                                </h3>
                                <p style={{
                                    color: '#a06050',
                                    fontSize: 12,
                                    margin: '0 0 8px',
                                    fontWeight: 600
                                }}>
                                    {item.category}
                                </p>
                                <span style={{
                                    fontSize: 18,
                                    fontWeight: 900,
                                    color: '#e8603c'
                                }}>
                                    ₹{item.price?.toLocaleString()}
                                </span>
                            </div>

                            {/* Quantity controls */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                background: '#fff0eb',
                                border: '1.5px solid #ffe4d6',
                                borderRadius: 25,
                                padding: '4px 8px'
                            }}>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    style={{
                                        background: 'white',
                                        border: '1.5px solid #ffe4d6',
                                        color: '#e8603c',
                                        width: 28,
                                        height: 28,
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        fontSize: 16,
                                        fontWeight: 800,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    −
                                </button>
                                <span style={{
                                    fontSize: 14,
                                    fontWeight: 800,
                                    color: '#3d1f18',
                                    minWidth: 24,
                                    textAlign: 'center'
                                }}>
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    style={{
                                        background: '#e8603c',
                                        border: 'none',
                                        color: 'white',
                                        width: 28,
                                        height: 28,
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        fontSize: 16,
                                        fontWeight: 800,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            {/* Subtotal */}
                            <div style={{
                                textAlign: 'right',
                                minWidth: 80
                            }}>
                                <p style={{
                                    fontSize: 11,
                                    color: '#a06050',
                                    margin: '0 0 2px',
                                    fontWeight: 600
                                }}>
                                    Subtotal
                                </p>
                                <p style={{
                                    fontSize: 16,
                                    fontWeight: 900,
                                    color: '#3d1f18',
                                    margin: 0
                                }}>
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                </p>
                            </div>

                            {/* Delete */}
                            <button
                                onClick={() => {
                                    removeFromCart(item.id);
                                    message.success('Item removed!');
                                }}
                                style={{
                                    background: '#fff0eb',
                                    border: '1.5px solid #ffe4d6',
                                    color: '#e8603c',
                                    width: 36,
                                    height: 36,
                                    borderRadius: 10,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 14,
                                    flexShrink: 0
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = '#e8603c';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = '#fff0eb';
                                    e.currentTarget.style.color = '#e8603c';
                                }}
                            >
                                <DeleteOutlined />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
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
                            margin: '0 0 20px',
                            paddingBottom: 12,
                            borderBottom: '2px solid #ffe4d6'
                        }}>
                            Order Summary
                        </h3>

                        {/* Items breakdown */}
                        {cartItems.map(item => (
                            <div key={item.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 8
                            }}>
                                <span style={{
                                    fontSize: 13,
                                    color: '#a06050',
                                    fontWeight: 600
                                }}>
                                    {item.name} × {item.quantity}
                                </span>
                                <span style={{
                                    fontSize: 13,
                                    color: '#3d1f18',
                                    fontWeight: 700
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
                                <span style={{
                                    fontSize: 13,
                                    color: '#a06050',
                                    fontWeight: 600
                                }}>
                                    Delivery
                                </span>
                                <span style={{
                                    fontSize: 13,
                                    color: '#1d9e75',
                                    fontWeight: 800
                                }}>
                                    FREE 🎉
                                </span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                background: '#fff0eb',
                                border: '1.5px solid #ffe4d6',
                                borderRadius: 12,
                                padding: '12px 16px',
                                marginTop: 12
                            }}>
                                <span style={{
                                    fontSize: 16,
                                    fontWeight: 900,
                                    color: '#3d1f18'
                                }}>
                                    Total
                                </span>
                                <span style={{
                                    fontSize: 20,
                                    fontWeight: 900,
                                    color: '#e8603c'
                                }}>
                                    ₹{totalAmount?.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: 'linear-gradient(135deg, #e8603c, #f0a896)',
                                border: 'none',
                                borderRadius: 30,
                                color: 'white',
                                fontSize: 15,
                                fontWeight: 800,
                                cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(232,96,60,0.3)',
                                marginTop: 16,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8
                            }}
                        >
                            <ShoppingOutlined /> Proceed to Checkout
                        </button>

                        {/* Trust badges */}
                        <div style={{
                            marginTop: 16,
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 16
                        }}>
                            <span style={{
                                fontSize: 11,
                                color: '#a06050',
                                fontWeight: 600
                            }}>
                                🔒 Secure
                            </span>
                            <span style={{
                                fontSize: 11,
                                color: '#a06050',
                                fontWeight: 600
                            }}>
                                🚚 Free delivery
                            </span>
                            <span style={{
                                fontSize: 11,
                                color: '#a06050',
                                fontWeight: 600
                            }}>
                                ↩️ Easy returns
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;