import React, { useState, useEffect } from 'react';
import {
    Row, Col, Card, Button, Badge,
    message, Typography, Input, Spin
} from 'antd';
import {
    ShoppingCartOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const { Title, Text } = Typography;
const { Search } = Input;

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const { addToCart, totalItems } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await productAPI.getAll();
            setProducts(response.data);
            setFiltered(response.data);
        } catch(error) {
            message.error('Failed to load products!');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        const result = products.filter(p =>
            p.name.toLowerCase().includes(value.toLowerCase()) ||
            p.category.toLowerCase().includes(value.toLowerCase())
        );
        setFiltered(result);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        message.success(`${product.name} added to cart!`);
    };

    if(loading) return (
        <div style={{ textAlign: 'center', padding: 100 }}>
            <Spin size="large" />
        </div>
    );

    return (
        <div style={{ padding: 24 }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24
            }}>
                <Title level={2}>🛍️ Products</Title>
                <Badge count={totalItems}>
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        size="large"
                        href="/cart"
                    >
                        Cart
                    </Button>
                </Badge>
            </div>

            <Search
                placeholder="Search products..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginBottom: 24 }}
            />

            <Row gutter={[16, 16]}>
                {filtered.map(product => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                        <Card
                            hoverable
                            cover={
                                <div style={{
                                    height: 200,
                                    background: '#f0f2f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 64
                                }}>
                                    🛍️
                                </div>
                            }
                            actions={[
                                <Button
                                    type="primary"
                                    icon={<ShoppingCartOutlined />}
                                    onClick={() => handleAddToCart(product)}
                                    block
                                >
                                    Add to Cart
                                </Button>
                            ]}
                        >
                            <Card.Meta
                                title={product.name}
                                description={
                                    <div>
                                        <Text type="secondary">
                                            {product.category}
                                        </Text>
                                        <br />
                                        <Text strong style={{
                                            fontSize: 18,
                                            color: '#1890ff'
                                        }}>
                                            ₹{product.price}
                                        </Text>
                                        <br />
                                        <Text type="secondary">
                                            {product.description}
                                        </Text>
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {filtered.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: 50 }}>
                    <Text type="secondary">No products found!</Text>
                </div>
            )}
        </div>
    );
};

export default Products;