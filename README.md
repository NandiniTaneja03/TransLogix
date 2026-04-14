# TransLogix - Complete Logistics Management System

A full-featured logistics management platform built with React.js, featuring separate dashboards for Admin, Driver, and Vendor roles with a modern dark theme UI.

## 🎨 Features

### Multi-Role System
- **Admin Dashboard** - Complete system management and analytics
- **Driver Dashboard** - Delivery management and earnings tracking
- **Vendor Dashboard** - Order creation and reports

### Key Features
- 🔐 Role-based authentication
- 📊 Real-time analytics and charts
- 📦 Order management system
- 💰 Financial tracking
- 🚚 Driver management
- 📈 Sales reports
- 🎯 Traffic source analytics
- 👥 Customer management
- 💳 Transaction history
- 📱 Fully responsive design
- 🌙 Dark theme UI

## 📁 Project Structure

```
translogix-full/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── Drivers.js
│   │   │   ├── Finance.js
│   │   │   ├── ManageOrders.js
│   │   │   ├── RecentCustomers.js
│   │   │   ├── SalesChart.js
│   │   │   ├── StatsCard.js
│   │   │   ├── TrafficSources.js
│   │   │   └── Transactions.js
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   └── Sidebar.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   ├── RegisterDriver.js
│   │   │   └── RegisterVendor.js
│   │   ├── Driver/
│   │   │   ├── DriverDashboard.js
│   │   │   ├── MyOrders.js
│   │   │   └── Wallet.js
│   │   ├── Home/
│   │   │   ├── Home.js
│   │   │   ├── Features.js
│   │   │   └── Hero.js
│   │   └── Vendor/
│   │       ├── VendorDashboard.js
│   │       ├── CreateOrder.js
│   │       └── Reports.js
│   ├── routes/
│   │   └── ProtectedRoute.js
│   ├── styles/
│   │   ├── App.css
│   │   ├── AdminDashboard.css
│   │   ├── Sidebar.css
│   │   ├── Header.css
│   │   ├── Login.css
│   │   ├── Drivers.css
│   │   └── ... (other CSS files)
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🎨 Design Theme

### Color Palette
- **Background**: `#0f111a` (Dark Blue-Black)
- **Surface**: `#1a1d29` (Dark Blue-Gray)
- **Border**: `#2d3142` (Light Gray)
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Purple)
- **Gradient**: `linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)`
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#a0a0a0` (Gray)
- **Text Muted**: `#6b7280` (Dark Gray)

### UI Elements
- Border radius: `10-20px`
- Shadows: `rgba(0, 0, 0, 0.3-0.5)`
- Transitions: `0.2-0.3s ease`
- Hover effects: `translateY(-2 to -4px)`

## 🚀 Installation & Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm start
```

3. **Build for Production**
```bash
npm build
```

4. **Run Tests**
```bash
npm test
```

## 📝 Available Routes

### Public Routes
- `/` - Home page
- `/features` - Features page
- `/login` - Login page
- `/register-driver` - Driver registration
- `/register-vendor` - Vendor registration

### Protected Routes (Admin)
- `/admin` - Admin dashboard
- `/admin/drivers` - Drivers management
- `/admin/finance` - Financial overview
- `/admin/orders` - Orders management

### Protected Routes (Driver)
- `/driver` - Driver dashboard
- `/driver/orders` - Driver's orders
- `/driver/wallet` - Driver's wallet

### Protected Routes (Vendor)
- `/vendor` - Vendor dashboard
- `/vendor/create-order` - Create new order
- `/vendor/reports` - Vendor reports

## 🔐 Authentication

The app uses Context API for state management:
- `AuthContext` provides authentication state
- `ProtectedRoute` component guards private routes
- User data stored in localStorage
- Role-based route access

### Login Credentials (Demo)
You can login with any email/password and select the role:
- Admin
- Driver  
- Vendor

## 📊 Dashboard Components

### Admin Dashboard
- **Stats Cards**: Today's sales, total sales, total orders
- **Sales Chart**: Interactive line chart with time filters
- **Traffic Sources**: Visual breakdown of traffic channels
- **Recent Customers**: Table of latest customers
- **Transactions**: Recent transaction list

### Driver Dashboard
- Delivery statistics
- Active orders table
- Earnings tracker
- Rating display

### Vendor Dashboard
- Order creation form
- Sales reports
- Business analytics

## 🎯 Key Features Detail

### Sidebar Navigation
- Collapsible design
- Role-based menu items
- Active state indicators
- Weather widget
- Badge notifications

### Header
- Search functionality
- Notification bell
- Shopping cart icon
- User dropdown menu with:
  - Profile
  - Account Settings
  - Notifications
  - Activity History
  - Help & Support
  - Logout

### Charts & Analytics
- SVG-based line charts
- Real-time data visualization
- Multiple time period filters
- Export to PDF functionality

## 🛠️ Technologies Used

- **React 18.2.0** - UI library
- **React Router DOM 6.20.0** - Routing
- **Context API** - State management
- **CSS3** - Styling
- **SVG** - Charts and icons

## 📱 Responsive Design

- **Desktop**: Full sidebar + multi-column layouts
- **Tablet**: Adjusted grid layouts
- **Mobile**: Hamburger menu, single column

## 🎨 Component Styling

All components use the matching dark theme:
- Consistent border-radius and shadows
- Hover states with elevation
- Gradient buttons and accents
- Smooth transitions
- Status badges with role-specific colors

## 💡 Customization

### Changing Colors
Edit `/src/styles/App.css` for global theme colors

### Adding New Routes
1. Create component in appropriate folder
2. Add route in `App.js`
3. Update sidebar menu if needed

### Adding New Dashboard Widgets
1. Create component in `/src/components/`
2. Import in dashboard file
3. Add to dashboard grid

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Deploy the /build folder to your hosting service
```

## 🤝 Contributing

This is a complete template project. Feel free to:
- Add new features
- Improve existing components
- Fix bugs
- Enhance UI/UX

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

Design inspired by modern SaaS dashboards with a focus on:
- Clean, professional aesthetics
- Intuitive user experience
- Performance optimization
- Accessibility standards

---

**Built with ❤️ for the logistics industry**