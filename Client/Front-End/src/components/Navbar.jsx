import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to="/">Movies Bank DB</Link>
      <Link to="/">Inicio</Link>
      <Link to="/saved-movies">Favoritas</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Inicia Sesion</Link>
      ) : (
        <button onClick={logout}> Cerrar Sesion </button>
      )}
    </div>
  );
};