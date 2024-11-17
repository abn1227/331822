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

const LandingView = () => {
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
                Bienvenido a <span className="text-accent">Servy</span>
              </h1>
              <p className="text-left text-sm md:text-base text-foreground/60">
                En Servy ofrecemos una amplia gama de servicios para ayudarte a
                encontrar el profesional indicado para el trabajo que requieras.
              </p>
              {/* <p className="text-left text-sm md:text-base text-foreground/60"></p> */}
            </Card>
            <img src={Logistics} alt="Logistics" className="w-full md:w-2/3" />
          </Container>
          <Button variant="primary" className="w-full md:w-auto">
            Únete ya
          </Button>
        </Container>
        <Container className="flex flex-col items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Our Services</h1>
          <p className="text-sm md:text-base text-foreground/60">
            En Servy ofrecemos te ofrecemos los siguientes servicios y mas.
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <Card
              childrenClassName="flex flex-col items-center gap-4"
              className="w-full md:w-1/3"
            >
              <Droplets size={24} className="text-text" />
              <div>
                <h2 className="text-lg text-center md:text-xl font-bold">
                  Plomería
                </h2>
                <p className="text-sm md:text-base text-foreground/60">
                  ¿Necesitas un servicio de plomería? No te preocupes, tenemos
                  un servicio de plomería para ti.
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
                  Limpieza
                </h2>
                <p className="text-sm md:text-base text-foreground/60">
                  También ofrecemos servicios de limpieza para que puedas
                  mantener tu casa u oficina limpia y organizada.
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
                  Mas Servicios
                </h2>
                <p className="text-sm md:text-base text-foreground/60">
                  Registrate ahora y obtén acceso a muchos servicios más. ¡No te
                  pierdas la oportunidad de disfrutar de nuestra oferta de
                  servicios!
                </p>
              </div>
            </Card>
          </div>
        </Container>

        {/* Footer */}
        <Container className="flex flex-col items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Contact Us</h1>
          <p className="text-sm md:text-base text-foreground/60">
            Si tienes alguna pregunta o necesitas ayuda, no dudes en
            contactarnos.
          </p>
          <Button variant="primary" className="w-full md:w-auto">
            Contact Us
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
