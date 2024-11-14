import React from "react";

import Navbar from "../components/Navbar";
import Container from "../components/Container";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar
        logo={<span className="text-xl font-bold">Handy</span>}
        items={[
          { label: "Home", href: "#" },
          { label: "About", href: "#" },
          { label: "Contact", href: "#" },
        ]}
      />
      <Container>{children}</Container>
    </div>
  );
};

export default MainLayout;
