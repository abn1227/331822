import React from "react";

import Navbar from "../components/Navbar";
import Container from "../components/Container";
import { useAuth } from "@/hooks/useAuth";

const MainLayout: React.FC<{
  children: React.ReactNode;
  footer?: boolean;
  className?: string;
}> = ({ children, footer = true, className = "" }) => {
  const defaultItems = [
    { label: "Inicio", href: "/" },
    // { label: "Acerca de", href: "/about" },
    // { label: "Contactanos", href: "/contact" },
    { label: "Iniciar Sesión", href: "/login" },
    { label: "Registrarse", href: "/register" },
  ];

  const { user } = useAuth();

  const getItems = () => {
    if (user.role === "admin") {
      return [
        { label: "Perfil", href: "/profile" },
        { label: "Gestionar Prestadores de Servicios", href: "/handyman" },
        { label: "Gestionar Trabajos", href: "/job-petitions" },
      ];
    }

    if (user.role === "user") {
      return [
        { label: "Perfil", href: "/profile" },
        { label: "Mis Peticiones", href: "/my-petitions" },
      ];
    }

    return defaultItems;
  };

  return (
    <div className="flex flex-col h-screen items-center justify-between">
      <Navbar
        logo={<span className="text-xl font-bold">Servy</span>}
        items={getItems()}
      />
      <Container className={`mt-20 p-4 md:mt-30 ${className}`}>
        {children}
      </Container>
      {/* Footer */}
      {footer && (
        <Container className="bottom-0 left-0 right-0 flex flex-col items-center gap-4">
          <p className="text-sm md:text-base text-foreground/60">
            © 2021 Servy. All rights reserved. Made with ❤️ by AbnRey
          </p>
        </Container>
      )}
    </div>
  );
};

export default MainLayout;
