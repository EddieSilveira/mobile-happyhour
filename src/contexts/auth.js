import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND } from '../constants/index';

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem('@HappyHour:usuario');
      const storagedToken = await AsyncStorage.getItem('@HappyHour:token');

      if (storagedUser && storagedToken) {
        setUsuario(JSON.parse(storagedUser));
        setToken(storagedToken);
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  async function signIn(email, senha) {
    const url = `${BACKEND}/login`;
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, senha: senha }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        setUsuario(data.usuario);
        await AsyncStorage.setItem(
          '@HappyHour:usuario',
          JSON.stringify(data.usuario),
        );
        await AsyncStorage.setItem('@HappyHour:token', data.token);
      })
      .catch(function (error) {
        console.error(
          `Houve um problema ao fazer o cadastro: ${error.message}`,
        );
      });
  }

  async function signOut() {
    AsyncStorage.clear().then(() => {
      setUsuario(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!usuario, usuario, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
