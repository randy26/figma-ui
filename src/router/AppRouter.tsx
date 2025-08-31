import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Welcome from '../pages/Welcome';
import AltaPresupuesto from '../pages/presupuesto/AltaPresupuesto';
import ConsultaPresupuestos from '../pages/presupuesto/consultaPresupuestos';
//import MuestrasConObservaciones from '../pages/muestra/MuestrasConObservaciones';
import IngresoMuestra from '../pages/muestra/ingresoMuestra';
import { useAuth } from "../router/AuthContext"

const AppRouter = () => {
  const { token, loading } = useAuth();
  const isAuthenticated = !!token;

  if (loading) return <div>Cargando...</div>; // Espera hasta leer localStorage

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/welcome"
        element={isAuthenticated ? <Layout><Welcome /></Layout> : <Navigate to="/login" />}
      />
      <Route
        path="/presupuestos"
        element={isAuthenticated ? <Layout><ConsultaPresupuestos /></Layout> : <Navigate to="/login" />}
      />
      <Route
        path="/presupuestos/nuevo"
        element={isAuthenticated ? <Layout><AltaPresupuesto /></Layout> : <Navigate to="/login" />}
      />
      <Route
        path="/ingresoMuestra"
        element={isAuthenticated ? <Layout><IngresoMuestra /></Layout> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
