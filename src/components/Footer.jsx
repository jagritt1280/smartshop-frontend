import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const techBadges = ['Spring Boot', 'React', 'Docker', 'Kafka', 'MySQL', 'MongoDB'];
    const features = ['🔐 JWT Auth', '🌐 API Gateway', '📡 Eureka Discovery', '⚡ Kafka Events', '🔄 Idempotent Payments', '🐳 Docker Ready'];
    const quickLinks = [
        { label: '🛍️ Products', path: '/products' },
        { label: '🛒 My Cart', path: '/cart' },
        { label: '📋 My Orders', path: '/orders' }
    ];

    return (
        <footer style={{ background: '#3d1f18', fontFamily: "'Helvetica Neue', sans-serif" }}>

            <div style={{ padding: '48px 32px 32px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 32, maxWidth: 1200, margin: '0 auto' }}>

                {/* Brand */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <div style={{ background: 'linear-gradient(135deg, #e8603c, #f0a896)', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                            🛒
                        </div>
                        <span style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>
                            Smart<span style={{ color: '#f0a896' }}>Shop</span>
                        </span>
                    </div>
                    <p style={{ color: '#c4947a', fontSize: 13, lineHeight: 1.7, margin: '0 0 20px', maxWidth: 260 }}>
                        A production-grade microservices e-commerce platform built with Spring Boot, React, Docker and Kafka.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {techBadges.map(tech => (
                            <span key={tech} style={{ background: 'rgba(232,96,60,0.2)', border: '1px solid rgba(232,96,60,0.3)', color: '#f0a896', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ color: 'white', fontSize: 13, fontWeight: 800, letterSpacing: 1, margin: '0 0 16px', textTransform: 'uppercase' }}>
                        Quick Links
                    </h4>
                    {quickLinks.map(link => (
                        <p key={link.path} onClick={() => navigate(link.path)} style={{ color: '#c4947a', fontSize: 13, margin: '0 0 10px', cursor: 'pointer', fontWeight: 600 }}
                           onMouseEnter={e => { e.target.style.color = '#f0a896'; }}
                           onMouseLeave={e => { e.target.style.color = '#c4947a'; }}>
                            {link.label}
                        </p>
                    ))}
                </div>

                {/* Features */}
                <div>
                    <h4 style={{ color: 'white', fontSize: 13, fontWeight: 800, letterSpacing: 1, margin: '0 0 16px', textTransform: 'uppercase' }}>
                        Features
                    </h4>
                    {features.map(f => (
                        <p key={f} style={{ color: '#c4947a', fontSize: 12, margin: '0 0 8px', fontWeight: 600 }}>
                            {f}
                        </p>
                    ))}
                </div>

                {/* Developer */}
                <div>
                    <h4 style={{ color: 'white', fontSize: 13, fontWeight: 800, letterSpacing: 1, margin: '0 0 16px', textTransform: 'uppercase' }}>
                        Developer
                    </h4>
                    <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <div style={{ background: 'linear-gradient(135deg, #e8603c, #f0a896)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: 'white' }}>
                                JT
                            </div>
                            <div>
                                <p style={{ color: 'white', fontSize: 13, fontWeight: 800, margin: 0 }}>Jagrit Taneja</p>
                                <p style={{ color: '#c4947a', fontSize: 11, margin: 0, fontWeight: 600 }}>Software Engineer</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <a href="https://github.com/jagritt1280/smartshop-microservices" target="_blank" rel="noreferrer" style={{ color: '#f0a896', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                                🐙 GitHub — Backend
                            </a>
                            <a href="https://github.com/jagritt1280/smartshop-frontend" target="_blank" rel="noreferrer" style={{ color: '#f0a896', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                                🐙 GitHub — Frontend
                            </a>
                            <a href="https://linkedin.com/in/jagrit-taneja" target="_blank" rel="noreferrer" style={{ color: '#f0a896', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                                💼 LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0 32px' }} />

            <div style={{ padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
                <p style={{ color: '#c4947a', fontSize: 12, margin: 0, fontWeight: 600 }}>
                    © 2026 SmartShop — Built with ❤️ by Jagrit Taneja
                </p>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ color: '#c4947a', fontSize: 11, fontWeight: 700 }}>🔒 Secure</span>
                    <span style={{ color: '#c4947a', fontSize: 11, fontWeight: 700 }}>🚚 Free Delivery</span>
                    <span style={{ color: '#c4947a', fontSize: 11, fontWeight: 700 }}>↩️ Easy Returns</span>
                </div>
            </div>

        </footer>
    );
};

export default Footer;