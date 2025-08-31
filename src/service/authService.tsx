import { API_URL } from '../config/api.config';

export interface LoginRequestDto {
  usuario: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
  usuario: string;
}

export interface MenuDto {
  id: number;
  nombre: string;
  url: string;
  icono: string;
}

export const login = async (credentials: LoginRequestDto): Promise<AuthResponseDto> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error('Credenciales inválidas');

  return res.json();
};

export const getMenus = async (): Promise<MenuDto[]> => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/auth/menus`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Error al obtener menús');

  return res.json();
};
