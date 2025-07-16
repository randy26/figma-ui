import '../assets/styles/Sidebar.css';
import { CiImport, CiSearch, CiShuffle, CiRead } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { PiGridFourLight } from "react-icons/pi"; // Para "Tablero"
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span>Proanalisis</span>
        {/* <span>{'<'}</span> */}
      </div>

      <div className="user-info">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="User Avatar"
          className="avatar"
        />
        <div className="user-details">
          <span className="name">Javier Laudisi</span>
          <span className="email">prueba@proanalisis.com.ar</span>
        </div>
      </div>
<ul className="sidebar-menu">
  <li>
    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
      <PiGridFourLight size={18} />
      <span>Tablero</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/presupuestos" className={({ isActive }) => isActive ? 'active' : ''}>
      <CiImport size={18} />
      <span>Presupuestos</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/facturacion" className={({ isActive }) => isActive ? 'active' : ''}>
      <CiShuffle size={18} />
      <span>Facturación</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/publicaciones" className={({ isActive }) => isActive ? 'active' : ''}>
      <FaUserCircle size={18} />
      <span>Publicaciones</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/observaciones" className={({ isActive }) => isActive ? 'active' : ''}>
      <CiRead size={18} />
      <span>Observaciones Ingresos</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/consultas" className={({ isActive }) => isActive ? 'active' : ''}>
      <CiSearch size={18} />
      <span>Consultas</span>
    </NavLink>
  </li>
</ul>


      <div className="settings">
        <span>Settings</span>
      </div>
    </div>
  );
};

export default Sidebar;
