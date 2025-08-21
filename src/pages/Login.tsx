import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../assets/styles/Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { login } from '../service/authService';

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ usuario: user, password: pass });
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuario', response.usuario);
      navigate('/welcome');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error inesperado');
    }
  };
  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-left">
          <h1>Figma</h1>
        </div>
        <div className="login-divider" />
        <div className="login-right">
          <h2>Ingresar a su Cuenta</h2>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Usuario"
              value={user}
              onChange={e => setUser(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
