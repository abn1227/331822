import Container from "../../components/Container";
import { Container as ContainerIcon } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import Logistics from "../../assets/svg/logistics.svg";
import Button from "../../components/Button";
import Card from "../../components/Card";

const LandingView = () => {
  return (
    <MainLayout>
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
                Welcome to <span className="text-accent">Handy</span>
              </h1>
              <p className="text-left text-sm md:text-base text-foreground/60">
                At handy we focus on making your life easier and more efficient.
              </p>
              <p className="text-left text-sm md:text-base text-foreground/60">
                We offer a wide range of services to help you achieve your goals
                and achieve your dreams.
              </p>
            </Card>
            <img src={Logistics} alt="Logistics" className="w-full md:w-2/3" />
          </Container>
          <Button variant="primary" className="w-full md:w-auto">
            Get Started Now
          </Button>
        </Container>
        <Container className="flex flex-col items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Our Services</h1>
          <p className="text-sm md:text-base text-foreground/60">
            At handy we offer a wide range of services to help you achieve your
            goals and achieve your dreams.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <img src={Logistics} alt="Logistics" className="w-8 md:w-4" />
              <div>
                <h2 className="text-lg md:text-xl font-bold">Logistics</h2>
                <p className="text-sm md:text-base text-foreground/60">
                  We offer a wide range of services to help you achieve your
                  goals and achieve your dreams.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <ContainerIcon size={24} />
              <div>
                <h2 className="text-lg md:text-xl font-bold">Logistics</h2>
                <p className="text-sm md:text-base text-foreground/60">
                  We offer a wide range of services to help you achieve your
                  goals and achieve your dreams.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <img src={Logistics} alt="Logistics" className="w-8 md:w-4" />
              <div>
                <h2 className="text-lg md:text-xl font-bold">Logistics</h2>
                <p className="text-sm md:text-base text-foreground/60">
                  We offer a wide range of services to help you achieve your
                  goals and achieve your dreams.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <img src={Logistics} alt="Logistics" className="w-8 md:w-4" />
              <div>
                <h2 className="text-lg md:text-xl font-bold">Logistics</h2>
                <p className="text-sm md:text-base text-foreground/60">
                  We offer a wide range of services to help you achieve your
                  goals and achieve your dreams.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </MainLayout>
  );
};

export default LandingView;
