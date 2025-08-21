// src/Layout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";

export const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {/* Page content */}
      <Outlet />
    </>
  );
};
