import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Public/Home';
import Login from './pages/Public/Login';
import Dashboard from './pages/Admin/Dashboard';
import Inventory from './pages/Admin/Inventory';
import Reservations from './pages/Admin/Reservations';
import AdminMenu from './pages/Admin/AdminMenu';
import Orders from './pages/Admin/Orders';
import Billing from './pages/Admin/Billing';
import Users from './pages/Admin/Users';
import Reports from './pages/Admin/Reports';
import PublicLayout from './components/Layout/PublicLayout';
import AdminLayout from './components/Layout/AdminLayout';

// Mock Auth simple basado en localStorage
const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="pedidos" element={<Orders />} />
          <Route path="reservas" element={<Reservations />} />
          <Route path="inventarios" element={<Inventory />} />
          <Route path="facturacion" element={<Billing />} />
          <Route path="reportes" element={<Reports />} />
          <Route path="usuarios" element={<Users />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
