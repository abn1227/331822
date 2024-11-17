import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Input from "../../components/Input";
import MainLayout from "../../layouts/MainLayout";
import { Eye, EyeOff } from "lucide-react";

const LoginView = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <MainLayout>
      <Container
        width="lg"
        className="flex flex-col items-center justify-center gap-4"
      >
        <Card
          blur="sm"
          variant="transparent"
          childrenClassName="flex flex-col gap-6"
          className="w-full md:w-2/3"
        >
          <h2>Iniciar Sesión</h2>
          <p className="text-left text-sm text-foreground/60">
            Ingresa tu email y contraseña para iniciar sesión
          </p>
          <Input
            label="Email"
            fullWidth
            type="email"
            placeholder="example@example.com"
          />
          <Input
            label="Contraseña"
            fullWidth
            type={passwordVisible ? "text" : "password"}
            placeholder="Any password"
            rightIcon={
              <div
                className="cursor-pointer"
                onClick={() => {
                  setPasswordVisible(!passwordVisible);
                }}
              >
                {passwordVisible ? <EyeOff /> : <Eye />}
              </div>
            }
          />
          <Button variant="primary" className="w-full">
            Iniciar Sesión
          </Button>
          <p className="text-center text-sm text-foreground/60">
            ¿No tienes una cuenta?{" "}
            <a className="text-accent" href="/register">
              Registrate aquí
            </a>
          </p>
        </Card>
      </Container>
    </MainLayout>
  );
};

export default LoginView;
