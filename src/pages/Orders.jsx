import { useAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react';

import {
    Table, Tag, Card, Typography,
    Button, Space, message, Spin
} from 'antd';
import {
    ShoppingOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';

const { Title, Text } = Typography;

const statusColors = {
    PENDING: 'orange',
    CONFIRMED: 'blue',
    SHIPPED: 'cyan',
    DELIVERED: 'green',
    CANCELLED: 'red'
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

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <Text code>#{id}</Text>
        },
        {
            title: 'Items',
            dataIndex: 'items',
            key: 'items',
            render: (items) => (
                <Space direction="vertical" size={0}>
                    {items?.map((item, idx) => (
                        <Text key={idx}>
                            {item.productName} x{item.quantity}
                        </Text>
                    ))}
                </Space>
            )
        },
        {
            title: 'Total',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount) => (
                <Text strong style={{ color: '#1890ff' }}>
                    ₹{amount}
                </Text>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={statusColors[status] || 'default'}>
                    {status}
                </Tag>
            )
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => (
                <Text type="secondary">
                    {new Date(date).toLocaleDateString()}
                </Text>
            )
        }
    ];

    if(loading) return (
        <div style={{ textAlign: 'center', padding: 100 }}>
            <Spin size="large" />
        </div>
    );

    return (
        <div style={{ padding: 24 }}>
            <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/products')}
                style={{ marginBottom: 24 }}
            >
                Continue Shopping
            </Button>

            <Title level={2}>📋 My Orders</Title>

            {orders.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: 50 }}>
                    <ShoppingOutlined style={{
                        fontSize: 64,
                        color: '#d9d9d9'
                    }} />
                    <Title level={4} type="secondary">
                        No orders yet!
                    </Title>
                    <Button
                        type="primary"
                        onClick={() => navigate('/products')}
                    >
                        Start Shopping
                    </Button>
                </Card>
            ) : (
                <Table
                    dataSource={orders}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            )}
        </div>
    );
};

export default Orders;