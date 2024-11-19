import React from "react";

import Navbar from "../components/Navbar";
import Container from "../components/Container";
import { useAuth, useTranslation } from "@/hooks";

const MainLayout: React.FC<{
  children: React.ReactNode;
  footer?: boolean;
  className?: string;
}> = ({ children, footer = true, className = "" }) => {
  const { t } = useTranslation({
    ns: "navbar",
  });

  const defaultItems = [
    { label: t("navbar:links.home"), href: "/" },
    // { label: "Acerca de", href: "/about" },
    // { label: "Contactanos", href: "/contact" },
    { label: t("navbar:links.login"), href: "/login" },
    { label: t("navbar:links.register"), href: "/register" },
  ];

  const { user } = useAuth();

  const getItems = () => {
    if (user.role === "admin") {
      return [
        { label: t("navbar:links.profile"), href: "/profile" },
        { label: t("navbar:links.handyManManagement"), href: "/handyman" },
        { label: t("navbar:links.jobManagement"), href: "/job-petitions" },
      ];
    }

    if (user.role === "user") {
      return [
        { label: t("navbar:links.profile"), href: "/profile" },
        { label: t("navbar:links.myPetitions"), href: "/my-petitions" },
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
            © 2021 Servy. All rights reserved. Made with ❤️ by{" "}
            <a
              className="text-accent"
              href="https://github.com/abn1227"
              target="_blank"
              rel="noreferrer"
            >
              AbnRey
            </a>
          </p>
        </Container>
      )}
    </div>
  );
};

export default MainLayout;
