import React from 'react';
import {
    Layout, Menu, Button, Badge,
    Typography, Space
} from 'antd';
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

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
    const { user, logout, isLoggedIn } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        {
            key: '/products',
            icon: <ShoppingOutlined />,
            label: 'Products'
        },
        {
            key: '/orders',
            icon: <OrderedListOutlined />,
            label: 'My Orders'
        }
    ];

    return (
        <Header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#001529',
            padding: '0 24px'
        }}>
            {/* Logo */}
            <Text
                style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/products')}
            >
                🛒 SmartShop
            </Text>

            {/* Menu */}
            {isLoggedIn && (
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                    style={{ flex: 1, marginLeft: 24 }}
                />
            )}

            {/* Right side */}
            <Space size={16}>
                {isLoggedIn ? (
                    <>
                        {/* Cart */}
                        <Badge count={totalItems}>
                            <Button
                                type="text"
                                icon={<ShoppingCartOutlined />}
                                style={{ color: 'white' }}
                                onClick={() => navigate('/cart')}
                            />
                        </Badge>

                        {/* User */}
                        <Space>
                            <UserOutlined style={{ color: 'white' }} />
                            <Text style={{ color: 'white' }}>
                                {user?.name || user?.email}
                            </Text>
                        </Space>

                        {/* Logout */}
                        <Button
                            type="text"
                            icon={<LogoutOutlined />}
                            style={{ color: 'white' }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Space>
                        <Button
                            type="text"
                            style={{ color: 'white' }}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </Button>
                    </Space>
                )}
            </Space>
        </Header>
    );
};

export default Navbar;