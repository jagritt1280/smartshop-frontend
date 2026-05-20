import React from 'react';
import { Badge, Space } from 'antd';
import {
    ShoppingCartOutlined,
    UserOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    OrderedListOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout, isLoggedIn } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { path: '/products', icon: <ShoppingOutlined />, label: 'Products' },
        { path: '/orders', icon: <OrderedListOutlined />, label: 'My Orders' }
    ];

    return (
        <nav style={{
            background: '#ffffff',
            borderBottom: '2px solid #ffe4d6',
            padding: '0 32px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 2px 12px rgba(232,96,60,0.08)'
        }}>

            {/* Logo */}
            <div
                onClick={() => navigate('/products')}
                style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                }}
            >
                <div style={{
                    background: 'linear-gradient(135deg, #e8603c, #f0a896)',
                    borderRadius: 10,
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18
                }}>
                    🛒
                </div>
                <span style={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: '#3d1f18',
                    letterSpacing: '-0.5px'
                }}>
                    Smart<span style={{ color: '#e8603c' }}>Shop</span>
                </span>
            </div>

            {/* Nav Links */}
            {isLoggedIn && (
                <div style={{ display: 'flex', gap: 4 }}>
                    {navLinks.map(link => (
                        <button
                            key={link.path}
                            onClick={() => navigate(link.path)}
                            style={{
                                background: location.pathname === link.path
                                    ? '#fff0eb'
                                    : 'transparent',
                                border: location.pathname === link.path
                                    ? '1.5px solid #ffe4d6'
                                    : '1.5px solid transparent',
                                color: location.pathname === link.path
                                    ? '#e8603c'
                                    : '#a06050',
                                padding: '8px 18px',
                                borderRadius: 25,
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => {
                                if(location.pathname !== link.path) {
                                    e.currentTarget.style.background = '#fff8f5';
                                    e.currentTarget.style.color = '#e8603c';
                                }
                            }}
                            onMouseLeave={e => {
                                if(location.pathname !== link.path) {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#a06050';
                                }
                            }}
                        >
                            {link.icon} {link.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Right Side */}
            <Space size={12}>
                {isLoggedIn ? (
                    <>
                        {/* Cart */}
                        <Badge
                            count={totalItems}
                            color="#e8603c"
                        >
                            <button
                                onClick={() => navigate('/cart')}
                                style={{
                                    background: '#fff0eb',
                                    border: '1.5px solid #ffe4d6',
                                    color: '#e8603c',
                                    width: 40,
                                    height: 40,
                                    borderRadius: 12,
                                    cursor: 'pointer',
                                    fontSize: 16,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <ShoppingCartOutlined />
                            </button>
                        </Badge>

                        {/* User pill */}
                        <div style={{
                            background: '#fff0eb',
                            border: '1.5px solid #ffe4d6',
                            borderRadius: 25,
                            padding: '6px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #e8603c, #f0a896)',
                                borderRadius: '50%',
                                width: 24,
                                height: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 11,
                                color: 'white',
                                fontWeight: 800
                            }}>
                                {(user?.name || user?.email || 'U')[0].toUpperCase()}
                            </div>
                            <span style={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: '#3d1f18'
                            }}>
                                {user?.name || user?.email}
                            </span>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'transparent',
                                border: '1.5px solid #ffe4d6',
                                color: '#a06050',
                                padding: '8px 14px',
                                borderRadius: 25,
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = '#fff0eb';
                                e.currentTarget.style.color = '#e8603c';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#a06050';
                            }}
                        >
                            <LogoutOutlined /> Logout
                        </button>
                    </>
                ) : (
                    <Space size={8}>
                        <button
                            onClick={() => navigate('/login')}
                            style={{
                                background: 'transparent',
                                border: '1.5px solid #ffe4d6',
                                color: '#e8603c',
                                padding: '8px 20px',
                                borderRadius: 25,
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: 700
                            }}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            style={{
                                background: 'linear-gradient(135deg, #e8603c, #f0a896)',
                                border: 'none',
                                color: 'white',
                                padding: '8px 20px',
                                borderRadius: 25,
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: 800,
                                boxShadow: '0 4px 12px rgba(232,96,60,0.3)'
                            }}
                        >
                            Register
                        </button>
                    </Space>
                )}
            </Space>
        </nav>
    );
};

export default Navbar;