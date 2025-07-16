import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../assets/styles/Login.css';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user === 'admin' && pass === '1234') {
      localStorage.setItem('auth', 'true');
      navigate('/welcome');
    } else {
      alert('Credenciales incorrectas');
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
