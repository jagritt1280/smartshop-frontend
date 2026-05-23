# 🛒 SmartShop Frontend

Modern React e-commerce frontend for SmartShop microservices platform with soft pastel UI design.

## 🚀 Tech Stack

| Technology | Usage |
|-----------|-------|
| React 18 | Frontend framework |
| Ant Design 5 | UI component library |
| Axios | HTTP client |
| React Router 6 | Client-side routing |
| Context API | State management |
| QRCode.react | UPI QR generation |

## 🎨 Design System
Primary:    #e8603c (coral)
Secondary:  #f0a896 (soft pink)
Background: #fff8f5 (warm white)
Hero:       #ffe4d6 (peach)
Cards:      #ffffff with #ffe4d6 border
Text:       #3d1f18 (dark brown)

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | /login | User authentication |
| Register | /register | New account |
| Products | /products | Browse + filter + sort |
| Cart | /cart | Shopping cart |
| Checkout | /checkout | Shipping details |
| Payment | /payment | UPI QR payment |
| Orders | /orders | Order history |
| Profile | /profile | User profile + stats |

## ✨ Features

- ✅ JWT authentication
- ✅ Product search + category filter
- ✅ Sort by price/name
- ✅ Price range filter
- ✅ Shopping cart with quantity controls
- ✅ UPI payment with QR code
- ✅ Order tracking with status badges
- ✅ User profile with order stats
- ✅ Responsive soft pastel design
- ✅ Protected routes
- ✅ Loading states

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- SmartShop backend running

### Run locally:

```bash
# Clone
git clone https://github.com/jagritt1280/smartshop-frontend.git
cd smartshop-frontend

# Install
npm install

# Start
npm start
```

App runs at `http://localhost:3000`

## 🔗 API Configuration

```javascript
// src/services/api.js
const BASE_URL = 'http://localhost:8080';
```

Make sure SmartShop backend is running on port 8080!

## 💳 UPI Payment Flow
Cart → Checkout → Place Order →
Payment Gateway (QR Code) →
Scan with GPay/PhonePe/Paytm →
Payment Successful → Orders page

UPI ID: jagrittaneja217@okicici

## 🔗 Backend

[SmartShop Microservices](https://github.com/jagritt1280/smartshop-microservices)

## 👨‍💻 Author

**Jagrit Taneja**
- GitHub: [jagritt1280](https://github.com/jagritt1280)
- LinkedIn: [jagrit-taneja](https://linkedin.com/in/jagrit-taneja)
