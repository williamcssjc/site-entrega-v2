// src/components/Layout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-claro text-escuro">
      <header className="bg-madeira text-branco">
        <nav className="max-w-5xl mx-auto flex items-center p-4">
          <Link to="/">
            <img src={logo} alt="Logo Arte Velha" className="h-10" />
          </Link>
          <ul className="ml-auto flex space-x-6">
            <li><Link to="/" className="hover:underline">Início</Link></li>
            <li><Link to="/cliente" className="hover:underline">Cliente</Link></li>
            <li><Link to="/vendedor" className="hover:underline">Vendedor</Link></li>
            <li><Link to="/logistica" className="hover:underline">Logística</Link></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-6">
        <Outlet />
      </main>

      <footer className="bg-madeira-light text-center text-sm p-4 text-escuro-600">
        © {new Date().getFullYear()} Arte Velha Móveis Rústicos
      </footer>
    </div>
  );
}
