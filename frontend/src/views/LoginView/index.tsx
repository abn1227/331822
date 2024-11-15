import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Input from "../../components/Input";
import MainLayout from "../../layouts/MainLayout";

const LoginView = () => {
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
          <Input label="Email" variant="primary" fullWidth type="email" />
          <Input
            label="Contraseña"
            variant="secondary"
            fullWidth
            type="password"
          />
          <Button variant="primary" className="w-full">
            Iniciar Sesión
          </Button>
          <p className="text-center text-sm text-foreground/60">
            ¿No tienes una cuenta?{" "}
            <a className="text-primary" href="/register">
              Registrate aquí
            </a>
          </p>
        </Card>
      </Container>
    </MainLayout>
  );
};

export default LoginView;
