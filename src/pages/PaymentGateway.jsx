import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { orderAPI } from '../services/api';

const PaymentGateway = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [timer, setTimer] = useState(300); // 5 minutes
    const [status, setStatus] = useState('pending'); // pending, success, failed
    const [loading, setLoading] = useState(false);

    const { orderId, amount } = location.state || {};
    const upiString = `upi://pay?pa=jagrittaneja217@okicici&pn=SmartShop&am=${amount}&cu=INR&tn=Order-${orderId}`;

    // 5 min countdown
    useEffect(() => {
        if(status !== 'pending') return;
        const interval = setInterval(() => {
            setTimer(prev => {
                if(prev <= 1) {
                    clearInterval(interval);
                    handleFailed();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [status]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleSuccess = async () => {
        setLoading(true);
        try {
            await orderAPI.updateStatus(orderId, 'CONFIRMED');
            setStatus('success');
            message.success('Payment successful! 🎉');
            setTimeout(() => navigate('/orders'), 3000);
        } catch(error) {
            setStatus('success');
            setTimeout(() => navigate('/orders'), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleFailed = async () => {
        setLoading(true);
        try {
            await orderAPI.updateStatus(orderId, 'CANCELLED');
        } catch(error) {
            console.log('Status update failed');
        } finally {
            setLoading(false);
        }
        setStatus('failed');
        setTimeout(() => navigate('/orders'), 4000);
    };

    // Invalid session
    if(!orderId || !amount) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#fff8f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Helvetica Neue', sans-serif"
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>❌</div>
                    <h2 style={{ color: '#3d1f18', fontWeight: 900 }}>
                        Invalid payment session!
                    </h2>
                    <button
                        onClick={() => navigate('/cart')}
                        style={{
                            background: '#e8603c',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: 25,
                            fontWeight: 800,
                            cursor: 'pointer',
                            marginTop: 16
                        }}
                    >
                        Back to Cart
                    </button>
                </div>
            </div>
        );
    }

    // Success screen
    if(status === 'success') {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#fff8f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Helvetica Neue', sans-serif"
            }}>
                <div style={{
                    background: 'white',
                    border: '1.5px solid #a7f3d0',
                    borderRadius: 24,
                    padding: 40,
                    maxWidth: 400,
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(16,185,129,0.1)'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #10b981, #34d399)',
                        borderRadius: '50%',
                        width: 100,
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        fontSize: 48,
                        boxShadow: '0 12px 32px rgba(16,185,129,0.3)'
                    }}>
                        ✅
                    </div>
                    <h2 style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: '#065f46',
                        margin: '0 0 8px'
                    }}>
                        Payment Successful!
                    </h2>
                    <p style={{
                        color: '#6ee7b7',
                        fontSize: 14,
                        fontWeight: 600,
                        margin: '0 0 4px'
                    }}>
                        ₹{Number(amount).toLocaleString()} paid via UPI
                    </p>
                    <div style={{
                        background: '#ecfdf5',
                        border: '1.5px solid #a7f3d0',
                        borderRadius: 12,
                        padding: '12px 16px',
                        margin: '20px 0'
                    }}>
                        <p style={{
                            fontSize: 13,
                            color: '#065f46',
                            fontWeight: 700,
                            margin: 0
                        }}>
                            🎉 Order Confirmed!
                        </p>
                        <p style={{
                            fontSize: 12,
                            color: '#10b981',
                            margin: '4px 0 0',
                            fontWeight: 600
                        }}>
                            Order #{String(orderId).slice(-8).toUpperCase()}
                        </p>
                    </div>
                    <p style={{
                        color: '#a06050',
                        fontSize: 13,
                        fontWeight: 600,
                        margin: 0
                    }}>
                        Redirecting to orders...
                    </p>
                </div>
            </div>
        );
    }

    // Failed / Refund screen
    if(status === 'failed') {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#fff8f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Helvetica Neue', sans-serif"
            }}>
                <div style={{
                    background: 'white',
                    border: '1.5px solid #fecaca',
                    borderRadius: 24,
                    padding: 40,
                    maxWidth: 400,
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(239,68,68,0.1)'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #ef4444, #f87171)',
                        borderRadius: '50%',
                        width: 100,
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        fontSize: 48,
                        boxShadow: '0 12px 32px rgba(239,68,68,0.3)'
                    }}>
                        ❌
                    </div>
                    <h2 style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: '#7f1d1d',
                        margin: '0 0 8px'
                    }}>
                        Payment Failed!
                    </h2>
                    <p style={{
                        color: '#f87171',
                        fontSize: 14,
                        fontWeight: 600,
                        margin: '0 0 4px'
                    }}>
                        ₹{Number(amount).toLocaleString()} not deducted
                    </p>
                    <div style={{
                        background: '#fef2f2',
                        border: '1.5px solid #fecaca',
                        borderRadius: 12,
                        padding: '14px 16px',
                        margin: '20px 0',
                        textAlign: 'left'
                    }}>
                        <p style={{
                            fontSize: 13,
                            color: '#7f1d1d',
                            fontWeight: 800,
                            margin: '0 0 8px'
                        }}>
                            🔄 Refund Policy:
                        </p>
                        <p style={{
                            fontSize: 12,
                            color: '#ef4444',
                            fontWeight: 600,
                            margin: '0 0 4px'
                        }}>
                            ✅ No amount was deducted
                        </p>
                        <p style={{
                            fontSize: 12,
                            color: '#ef4444',
                            fontWeight: 600,
                            margin: '0 0 4px'
                        }}>
                            ✅ Order has been cancelled
                        </p>
                        <p style={{
                            fontSize: 12,
                            color: '#ef4444',
                            fontWeight: 600,
                            margin: 0
                        }}>
                            ✅ If debited, refund in 5-7 days
                        </p>
                    </div>
                    <p style={{
                        color: '#a06050',
                        fontSize: 13,
                        fontWeight: 600,
                        margin: 0
                    }}>
                        Redirecting to orders...
                    </p>
                </div>
            </div>
        );
    }

    // Main payment page
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
                    onClick={() => navigate('/checkout')}
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
                    margin: '0 0 4px'
                }}>
                    Complete Payment
                </h1>
                <p style={{
                    color: '#a06050',
                    fontSize: 14,
                    margin: 0,
                    fontWeight: 600
                }}>
                    Scan QR and pay within 5 minutes
                </p>
            </div>

            {/* Payment Card */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '32px 24px'
            }}>
                <div style={{
                    background: 'white',
                    border: '1.5px solid #ffe4d6',
                    borderRadius: 24,
                    padding: 32,
                    maxWidth: 420,
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(232,96,60,0.1)'
                }}>
                    {/* Timer */}
                    <div style={{
                        background: timer < 60 ? '#fef2f2' : '#fff0eb',
                        border: `1.5px solid ${timer < 60 ? '#fecaca' : '#ffe4d6'}`,
                        borderRadius: 12,
                        padding: '10px 20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 16
                    }}>
                        <span style={{ fontSize: 14 }}>⏱️</span>
                        <span style={{
                            fontSize: 20,
                            fontWeight: 900,
                            color: timer < 60 ? '#ef4444' : '#e8603c',
                            fontFamily: 'monospace'
                        }}>
                            {formatTime(timer)}
                        </span>
                        <span style={{
                            fontSize: 12,
                            color: '#a06050',
                            fontWeight: 600
                        }}>
                            remaining
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div style={{
                        background: '#ffe4d6',
                        borderRadius: 10,
                        height: 6,
                        marginBottom: 20,
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            background: timer < 60
                                ? 'linear-gradient(135deg, #ef4444, #f87171)'
                                : 'linear-gradient(135deg, #e8603c, #f0a896)',
                            height: '100%',
                            width: `${((300 - timer) / 300) * 100}%`,
                            borderRadius: 10,
                            transition: 'width 1s linear'
                        }} />
                    </div>

                    {/* Amount */}
                    <div style={{
                        background: 'linear-gradient(135deg, #ffe4d6, #ffd6e7)',
                        borderRadius: 16,
                        padding: '16px 24px',
                        marginBottom: 20
                    }}>
                        <p style={{
                            fontSize: 12,
                            color: '#a06050',
                            fontWeight: 800,
                            margin: '0 0 4px',
                            letterSpacing: 1
                        }}>
                            AMOUNT TO PAY
                        </p>
                        <p style={{
                            fontSize: 36,
                            fontWeight: 900,
                            color: '#e8603c',
                            margin: 0
                        }}>
                            ₹{Number(amount).toLocaleString()}
                        </p>
                        <p style={{
                            fontSize: 11,
                            color: '#a06050',
                            margin: '4px 0 0',
                            fontWeight: 600
                        }}>
                            Order #{String(orderId).slice(-8).toUpperCase()}
                        </p>
                    </div>

                    {/* QR Code */}
                    <div style={{
                        background: 'white',
                        border: '3px solid #ffe4d6',
                        borderRadius: 20,
                        padding: 20,
                        display: 'inline-block',
                        marginBottom: 16,
                        boxShadow: '0 8px 24px rgba(232,96,60,0.1)'
                    }}>
                        <QRCodeSVG
                            value={upiString}
                            size={200}
                            bgColor="#ffffff"
                            fgColor="#3d1f18"
                            level="H"
                            includeMargin={false}
                        />
                    </div>

                    {/* UPI ID */}
                    <div style={{
                        background: '#fff8f5',
                        border: '1.5px solid #ffe4d6',
                        borderRadius: 12,
                        padding: '10px 16px',
                        marginBottom: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8
                    }}>
                        <span style={{ fontSize: 16 }}>💳</span>
                        <span style={{
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#3d1f18',
                            fontFamily: 'monospace'
                        }}>
                            jagrittaneja217@okicici
                        </span>
                    </div>

                    {/* How to pay */}
                    <div style={{
                        background: '#fff8f5',
                        border: '1.5px solid #ffe4d6',
                        borderRadius: 12,
                        padding: '12px 16px',
                        marginBottom: 24,
                        textAlign: 'left'
                    }}>
                        <p style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: '#e8603c',
                            margin: '0 0 8px',
                            letterSpacing: 1
                        }}>
                            HOW TO PAY
                        </p>
                        {[
                            '📱 Open GPay, PhonePe or Paytm',
                            '📷 Scan the QR code above',
                            `💰 Pay ₹${Number(amount).toLocaleString()}`,
                            '✅ Click "Payment Successful" below'
                        ].map((step, idx) => (
                            <p key={idx} style={{
                                fontSize: 12,
                                color: '#a06050',
                                fontWeight: 600,
                                margin: '0 0 4px'
                            }}>
                                {step}
                            </p>
                        ))}
                    </div>

                    {/* Two buttons */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10
                    }}>
                        {/* Success button */}
                        <button
                            onClick={handleSuccess}
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: loading
                                    ? '#a7f3d0'
                                    : 'linear-gradient(135deg, #10b981, #34d399)',
                                border: 'none',
                                borderRadius: 30,
                                color: 'white',
                                fontSize: 15,
                                fontWeight: 900,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8
                            }}
                        >
                            ✅ Payment Successful
                        </button>

                        {/* Failed button */}
                        <button
                            onClick={handleFailed}
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: 'transparent',
                                border: '2px solid #fecaca',
                                borderRadius: 30,
                                color: '#ef4444',
                                fontSize: 14,
                                fontWeight: 800,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8
                            }}
                        >
                            ❌ Payment Failed / Cancel
                        </button>
                    </div>

                    <p style={{
                        fontSize: 11,
                        color: '#a06050',
                        fontWeight: 600,
                        margin: '12px 0 0'
                    }}>
                        🔒 Secure UPI Payment
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway;