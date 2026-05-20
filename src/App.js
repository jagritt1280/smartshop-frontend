import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import 'antd/dist/reset.css';

const { Content } = Layout;

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Layout style={{ minHeight: '100vh' }}>
              <Navbar />
              <Content>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected routes */}
                  <Route path="/products" element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  } />
                  <Route path="/cart" element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  } />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } />

                  {/* Default redirect */}
                  <Route path="/" element={
                    <Navigate to="/products" replace />
                  } />
                  <Route path="*" element={
                    <Navigate to="/products" replace />
                  } />
                </Routes>
              </Content>
            </Layout>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;