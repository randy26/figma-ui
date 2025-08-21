import '../assets/styles/Sidebar.css';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMenus } from '../service/authService';
import type { MenuDto } from '../service/authService';

// íconos
import {
  CiImport,
  CiSearch,
  CiShuffle,
  CiRead,
} from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { PiGridFourLight } from "react-icons/pi";

const iconMap: Record<string, React.ReactNode> = {
  tablero: <PiGridFourLight size={18} />,
  presupuestos: <CiImport size={18} />,
  facturacion: <CiShuffle size={18} />,
  publicaciones: <FaUserCircle size={18} />,
  observaciones: <CiRead size={18} />,
  consultas: <CiSearch size={18} />,
};

const HorizontalMenu = () => {
  const [menus, setMenus] = useState<MenuDto[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await getMenus();
        setMenus(data);
      } catch (error) {
        console.error("Error cargando menús:", error);
      }
    };

    fetchMenus();
  }, []);

  return (
    <nav className="horizontal-menu">
      <ul>
        {menus.map(menu => (
          <li key={menu.id}>
            <NavLink to={menu.url} className={({ isActive }) => isActive ? 'active' : ''}>
              {iconMap[menu.icono] || <FaUserCircle size={18} />}
              <span>{menu.nombre}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HorizontalMenu;
