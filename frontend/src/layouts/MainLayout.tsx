import React from "react";

import Navbar from "../components/Navbar";
import Container from "../components/Container";

const MainLayout: React.FC<{ children: React.ReactNode; footer?: boolean }> = ({
  children,
  footer = true,
}) => {
  return (
    <div className="flex flex-col h-screen items-center justify-between">
      <Navbar
        logo={<span className="text-xl font-bold">Servy</span>}
        items={[
          { label: "Inicio", href: "/" },
          { label: "Acerca de", href: "/about" },
          { label: "Contactanos", href: "/contact" },
          { label: "Iniciar Sesión", href: "/login" },
          { label: "Registrarse", href: "/register" },
        ]}
      />
      <Container className="mt-20 p-4 md:mt-30">{children}</Container>
      {/* Footer */}
      {footer && (
        <Container className="fixed bottom-0 left-0 right-0 flex flex-col items-center gap-4">
          <p className="text-sm md:text-base text-foreground/60">
            © 2021 Servy. All rights reserved. Made with ❤️ by AbnRey
          </p>
        </Container>
      )}
    </div>
  );
};

export default MainLayout;
