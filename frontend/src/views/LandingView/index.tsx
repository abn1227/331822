import Container from "../../components/Container";
import {
  Container as ContainerIcon,
  Droplets,
  PaintbrushVertical,
} from "lucide-react";

import MainLayout from "../../layouts/MainLayout";
import Logistics from "../../assets/svg/logistics.svg";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useTranslation } from "@/hooks";

const LandingView = () => {
  const { t } = useTranslation({
    ns: ["landing", "common", "categories"],
  });

  return (
    <MainLayout footer={false}>
      <Container className="w-full h-full flex flex-col gap-10 md:gap-20 lg:gap-40">
        <Container className="flex flex-col gap-4">
          <Container className="flex flex-col md:flex-row items-center gap-4">
            <Card
              blur="sm"
              variant="transparent"
              className="flex flex-col gap-6 text-left"
              childrenClassName="flex flex-col gap-6"
            >
              <h1 className="text-2xl md:text-4xl font-bold text-left">
                {t("landing:greet")} <span className="text-accent">Servy</span>
              </h1>
              <p className="text-left text-sm md:text-base text-foreground/60">
                {t("landing:subtitle")}
              </p>
              {/* <p className="text-left text-sm md:text-base text-foreground/60"></p> */}
            </Card>
            <img src={Logistics} alt="Logistics" className="w-full md:w-2/3" />
          </Container>
          <Button variant="primary" className="w-full md:w-auto">
            {t("landing:button")}
          </Button>
        </Container>
        <Container className="flex flex-col items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold">
            {t("landing:ourServices")}
          </h1>
          <p className="text-sm md:text-base text-foreground/60">
            {t("landing:services")}
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <Card
              childrenClassName="flex flex-col items-center gap-4"
              className="w-full md:w-1/3"
            >
              <Droplets size={24} className="text-text" />
              <div>
                <h2 className="text-lg text-center md:text-xl font-bold">
                  {t("categories:services.plumbing")}
                </h2>
                <p className="text-sm md:text-base text-foreground/60">
                  {t("landing:plumbing")}
                </p>
              </div>
            </Card>
            <Card
              childrenClassName="flex flex-col items-center gap-4"
              className="w-full md:w-1/3"
            >
              <PaintbrushVertical size={24} className="text-text" />
              <div>
                <h2 className="text-lg text-center md:text-xl font-bold">
                  {t("categories:services.cleaning")}
                </h2>
                <p className="text-sm md:text-base text-foreground/60">
                  {t("landing:cleaning")}
                </p>
              </div>
            </Card>
            <Card
              childrenClassName="flex flex-col items-center gap-4"
              className="w-full md:w-1/3"
            >
              <ContainerIcon size={24} className="text-text" />
              <div>
                <h2 className="text-lg text-center md:text-xl font-bold">
                  {t("categories:services.general")}
                </h2>
                <p className="text-sm md:text-base text-foreground/60">
                  {t("landing:general")}
                </p>
              </div>
            </Card>
          </div>
        </Container>

        {/* Footer */}
        <Container className="flex flex-col items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold">
            {t("landing:contact")}
          </h1>
          <p className="text-sm md:text-base text-foreground/60">
            {t("landing:contactDescription")}
          </p>
          <Button variant="primary" className="w-full md:w-auto">
            {t("landing:contactButton")}
          </Button>

          <Container className="flex flex-col items-center gap-4">
            <p className="text-sm md:text-base text-foreground/60">
              © 2021 Servy. All rights reserved. Made with ❤️ by AbnRey
            </p>
          </Container>
        </Container>
      </Container>
    </MainLayout>
  );
};

export default LandingView;
