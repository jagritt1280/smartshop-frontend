import React from 'react';
import {
    Table, Button, InputNumber,
    Card, Typography, Space,
    Popconfirm, message, Empty
} from 'antd';
import {
    DeleteOutlined,
    ShoppingOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const { Title, Text } = Typography;

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        totalAmount,
        totalItems
    } = useCart();
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
            render: (name) => <Text strong>{name}</Text>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <Text style={{ color: '#1890ff' }}>₹{price}</Text>
            )
        },
        {
            title: 'Quantity',
            key: 'quantity',
            render: (_, record) => (
                <InputNumber
                    min={1}
                    max={10}
                    value={record.quantity}
                    onChange={(value) => updateQuantity(record.id, value)}
                />
            )
        },
        {
            title: 'Subtotal',
            key: 'subtotal',
            render: (_, record) => (
                <Text strong>
                    ₹{record.price * record.quantity}
                </Text>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Remove this item?"
                    onConfirm={() => {
                        removeFromCart(record.id);
                        message.success('Item removed!');
                    }}
                >
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                    />
                </Popconfirm>
            )
        }
    ];

    if(cartItems.length === 0) {
        return (
            <div style={{ padding: 24 }}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/products')}
                    style={{ marginBottom: 24 }}
                >
                    Back to Products
                </Button>
                <Empty
                    description="Your cart is empty!"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                >
                    <Button
                        type="primary"
                        onClick={() => navigate('/products')}
                    >
                        Shop Now
                    </Button>
                </Empty>
            </div>
        );
    }

    return (
        <div style={{ padding: 24 }}>
            <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/products')}
                style={{ marginBottom: 24 }}
            >
                Back to Products
            </Button>

            <Title level={2}>🛒 My Cart ({totalItems} items)</Title>

            <Table
                dataSource={cartItems}
                columns={columns}
                rowKey="id"
                pagination={false}
                style={{ marginBottom: 24 }}
            />

            <Card style={{ maxWidth: 400, marginLeft: 'auto' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Text>Items ({totalItems}):</Text>
                        <Text>₹{totalAmount}</Text>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Text>Delivery:</Text>
                        <Text type="success">FREE</Text>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #f0f0f0',
                        paddingTop: 8
                    }}>
                        <Text strong style={{ fontSize: 18 }}>
                            Total:
                        </Text>
                        <Text strong style={{
                            fontSize: 18,
                            color: '#1890ff'
                        }}>
                            ₹{totalAmount}
                        </Text>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        block
                        icon={<ShoppingOutlined />}
                        onClick={() => navigate('/checkout')}
                    >
                        Proceed to Checkout
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default Cart;