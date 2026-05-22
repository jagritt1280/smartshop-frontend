import React, { useState, useEffect } from 'react';
import { message, Badge } from 'antd';
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const categoryEmojis = {
    Electronics: '💻',
    Fashion: '👟',
    Food: '🍕',
    Books: '📚',
    Sports: '⚽',
    Home: '🏠',
    Beauty: '💄',
    Toys: '🧸',
    Gaming: '🎮',
    Health: '💊',
    Kitchen: '🍳',
    Stationery: '✏️',
    Garden: '🌱'
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('default');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const { addToCart, totalItems } = useCart();
    const navigate = useNavigate();

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

    const applyAllFilters = (searchVal, cat, sort, min, max) => {
        let result = [...products];
        if(cat !== 'All') result = result.filter(p => p.category === cat);
        if(searchVal) result = result.filter(p =>
            p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
            p.category.toLowerCase().includes(searchVal.toLowerCase())
        );
        if(min) result = result.filter(p => p.price >= Number(min));
        if(max) result = result.filter(p => p.price <= Number(max));
        switch(sort) {
            case 'price_low': result.sort((a, b) => a.price - b.price); break;
            case 'price_high': result.sort((a, b) => b.price - a.price); break;
            case 'name_az': result.sort((a, b) => a.name.localeCompare(b.name)); break;
            case 'name_za': result.sort((a, b) => b.name.localeCompare(a.name)); break;
            default: break;
        }
        setFiltered(result);
    };

    const handleSearch = (value) => {
        setSearch(value);
        applyAllFilters(value, activeCategory, sortBy, minPrice, maxPrice);
    };

    const handleCategory = (cat) => {
        setActiveCategory(cat);
        applyAllFilters(search, cat, sortBy, minPrice, maxPrice);
    };

    const handleSort = (value) => {
        setSortBy(value);
        applyAllFilters(search, activeCategory, value, minPrice, maxPrice);
    };

    const handlePriceFilter = (min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
        applyAllFilters(search, activeCategory, sortBy, min, max);
    };

    const clearAllFilters = () => {
        setSortBy('default');
        setMinPrice('');
        setMaxPrice('');
        setSearch('');
        setActiveCategory('All');
        setFiltered(products);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        message.success(`${product.name} added to cart! 🛒`);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#fff8f5',
            fontFamily: "'Helvetica Neue', sans-serif"
        }}>
            {/* Hero Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #ffe4d6 0%, #ffd6e7 100%)',
                padding: '40px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <div style={{
                        background: '#e8603c',
                        color: 'white',
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: 2,
                        padding: '4px 12px',
                        borderRadius: 20,
                        display: 'inline-block',
                        marginBottom: 12
                    }}>
                        ✨ NEW ARRIVALS
                    </div>
                    <h1 style={{
                        fontSize: 32,
                        fontWeight: 900,
                        color: '#3d1f18',
                        margin: '0 0 8px',
                        lineHeight: 1.2
                    }}>
                        Shop with<br/>
                        <span style={{ color: '#e8603c' }}>Love & Joy</span>
                    </h1>
                    <p style={{
                        color: '#a06050',
                        fontSize: 14,
                        margin: '0 0 20px',
                        lineHeight: 1.6
                    }}>
                        {products.length} curated products just for you
                    </p>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'white',
                        border: '2px solid #ffe4d6',
                        borderRadius: 30,
                        padding: '8px 16px',
                        gap: 8,
                        maxWidth: 360
                    }}>
                        <SearchOutlined style={{ color: '#e8603c', fontSize: 16 }} />
                        <input
                            placeholder="Search products..."
                            value={search}
                            onChange={e => handleSearch(e.target.value)}
                            style={{
                                border: 'none',
                                outline: 'none',
                                fontSize: 14,
                                color: '#3d1f18',
                                background: 'transparent',
                                flex: 1,
                                fontFamily: "'Helvetica Neue', sans-serif"
                            }}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 80 }}>🛍️</div>
                    <Badge count={totalItems} color="#e8603c">
                        <button
                            onClick={() => navigate('/cart')}
                            style={{
                                background: '#e8603c',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: 30,
                                fontSize: 14,
                                fontWeight: 800,
                                cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(232,96,60,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8
                            }}
                        >
                            <ShoppingCartOutlined /> View Cart
                        </button>
                    </Badge>
                </div>
            </div>

            {/* Category Filter */}
            <div style={{
                padding: '16px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'white',
                borderBottom: '2px solid #ffe4d6'
            }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#3d1f18' }}>
                    Category:
                </span>
                <select
                    value={activeCategory}
                    onChange={e => handleCategory(e.target.value)}
                    style={{
                        background: '#fff0eb',
                        border: '2px solid #ffe4d6',
                        borderRadius: 25,
                        padding: '10px 20px',
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#e8603c',
                        cursor: 'pointer',
                        outline: 'none',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23e8603c' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 14px center',
                        paddingRight: 36,
                        minWidth: 200,
                        fontFamily: "'Helvetica Neue', sans-serif"
                    }}
                >
                    <option value="All">🛒 All Products ({products.length})</option>
                    {Object.entries(categoryEmojis).map(([cat, emoji]) => {
                        const count = products.filter(p => p.category === cat).length;
                        if(count === 0) return null;
                        return (
                            <option key={cat} value={cat}>
                                {emoji} {cat} ({count})
                            </option>
                        );
                    })}
                </select>
                <span style={{ fontSize: 12, color: '#a06050', fontWeight: 600, marginLeft: 'auto' }}>
                    Showing {filtered.length} of {products.length} products
                </span>
            </div>

            {/* Sort + Price Filter */}
            <div style={{
                padding: '16px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                background: '#fff8f5',
                borderBottom: '2px solid #ffe4d6',
                flexWrap: 'wrap'
            }}>
                {/* Sort */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#3d1f18' }}>Sort:</span>
                    <select
                        value={sortBy}
                        onChange={e => handleSort(e.target.value)}
                        style={{
                            background: '#fff0eb',
                            border: '2px solid #ffe4d6',
                            borderRadius: 25,
                            padding: '8px 16px',
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#e8603c',
                            cursor: 'pointer',
                            outline: 'none',
                            fontFamily: "'Helvetica Neue', sans-serif"
                        }}
                    >
                        <option value="default">✨ Default</option>
                        <option value="price_low">💰 Price: Low to High</option>
                        <option value="price_high">💎 Price: High to Low</option>
                        <option value="name_az">🔤 Name: A to Z</option>
                        <option value="name_za">🔤 Name: Z to A</option>
                    </select>
                </div>

                {/* Price Range */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#3d1f18' }}>Price:</span>
                    <input
                        type="number"
                        placeholder="Min ₹"
                        value={minPrice}
                        onChange={e => handlePriceFilter(e.target.value, maxPrice)}
                        style={{
                            width: 90,
                            padding: '8px 12px',
                            border: '2px solid #ffe4d6',
                            borderRadius: 25,
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#3d1f18',
                            background: '#fff0eb',
                            outline: 'none',
                            fontFamily: "'Helvetica Neue', sans-serif"
                        }}
                        onFocus={e => e.target.style.borderColor = '#e8603c'}
                        onBlur={e => e.target.style.borderColor = '#ffe4d6'}
                    />
                    <span style={{ color: '#a06050', fontWeight: 700 }}>—</span>
                    <input
                        type="number"
                        placeholder="Max ₹"
                        value={maxPrice}
                        onChange={e => handlePriceFilter(minPrice, e.target.value)}
                        style={{
                            width: 90,
                            padding: '8px 12px',
                            border: '2px solid #ffe4d6',
                            borderRadius: 25,
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#3d1f18',
                            background: '#fff0eb',
                            outline: 'none',
                            fontFamily: "'Helvetica Neue', sans-serif"
                        }}
                        onFocus={e => e.target.style.borderColor = '#e8603c'}
                        onBlur={e => e.target.style.borderColor = '#ffe4d6'}
                    />
                </div>

                {/* Clear filters */}
                {(sortBy !== 'default' || minPrice || maxPrice || activeCategory !== 'All' || search) && (
                    <button
                        onClick={clearAllFilters}
                        style={{
                            background: '#fff0eb',
                            border: '1.5px solid #ffe4d6',
                            color: '#e8603c',
                            padding: '8px 16px',
                            borderRadius: 25,
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 800,
                            marginLeft: 'auto'
                        }}
                    >
                        ✕ Clear All Filters
                    </button>
                )}
            </div>

            {/* Products grid */}
            <div style={{ padding: '32px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: 80 }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>🛍️</div>
                        <p style={{ color: '#a06050', fontWeight: 700 }}>Loading products...</p>
                    </div>
                ) : (
                    <>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                            gap: 20
                        }}>
                            {filtered.map(product => (
                                <div
                                    key={product.id}
                                    style={{
                                        background: 'white',
                                        border: '1.5px solid #ffe4d6',
                                        borderRadius: 20,
                                        overflow: 'hidden',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(232,96,60,0.15)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div style={{
                                        background: 'linear-gradient(135deg, #ffe4d6, #ffd6e7)',
                                        height: 180,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 72,
                                        position: 'relative'
                                    }}>
                                        {categoryEmojis[product.category] || '📦'}
                                        <div style={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            background: '#fff0eb',
                                            color: '#e8603c',
                                            fontSize: 10,
                                            fontWeight: 800,
                                            padding: '4px 10px',
                                            borderRadius: 20,
                                            border: '1px solid #ffe4d6'
                                        }}>
                                            {product.category}
                                        </div>
                                    </div>
                                    <div style={{ padding: '16px 18px' }}>
                                        <h3 style={{
                                            fontSize: 15,
                                            fontWeight: 800,
                                            color: '#3d1f18',
                                            margin: '0 0 4px',
                                            lineHeight: 1.3
                                        }}>
                                            {product.name}
                                        </h3>
                                        <p style={{
                                            fontSize: 12,
                                            color: '#a06050',
                                            margin: '0 0 12px',
                                            lineHeight: 1.5
                                        }}>
                                            {product.description}
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{
                                                fontSize: 20,
                                                fontWeight: 900,
                                                color: '#e8603c'
                                            }}>
                                                ₹{product.price?.toLocaleString()}
                                            </span>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                style={{
                                                    background: 'linear-gradient(135deg, #e8603c, #f0a896)',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '8px 16px',
                                                    borderRadius: 25,
                                                    fontSize: 12,
                                                    fontWeight: 800,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 4
                                                }}
                                            >
                                                <ShoppingCartOutlined /> Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div style={{ textAlign: 'center', padding: 60 }}>
                                <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
                                <h3 style={{ color: '#3d1f18', fontWeight: 800, margin: '0 0 8px' }}>
                                    No products found!
                                </h3>
                                <p style={{ color: '#a06050' }}>
                                    Try a different search or category
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    style={{
                                        background: '#e8603c',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 24px',
                                        borderRadius: 25,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        marginTop: 12
                                    }}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;