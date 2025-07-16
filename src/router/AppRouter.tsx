import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Welcome from '../pages/Welcome';
import ConsultaMuestra from '../pages/muestra/consultaMuestra';

const AppRouter = () => {
  const isAuthenticated = localStorage.getItem('auth') === 'true';

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/welcome"
        element={
          isAuthenticated ? (
            <Layout>
              <Welcome />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/observaciones"
        element={
          isAuthenticated ? (
            <Layout>
              <ConsultaMuestra />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
