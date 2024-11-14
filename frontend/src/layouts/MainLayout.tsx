import React from "react";

import Navbar from "../components/Navbar";
import Container from "../components/Container";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar
        logo={<span className="text-xl font-bold">Handy</span>}
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Login", href: "/login" },
          { label: "Register", href: "/register" },
        ]}
      />
      <Container className="mt-20 md:mt-40 lg:mt-60">{children}</Container>
    </div>
  );
};

export default MainLayout;
