import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Input from "../../components/Input";
import MainLayout from "../../layouts/MainLayout";

const RegisterView = () => {
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
          <h2>Registrarse</h2>
          <p className="text-left text-sm text-foreground/60">
            Ingresa tus datos para registrarte
          </p>
          <Input label="Nombres" variant="primary" fullWidth required />
          <Input label="Apellidos" variant="primary" fullWidth required />
          <Input
            label="Email"
            variant="primary"
            fullWidth
            type="email"
            required
          />
          <Input
            label="Contraseña"
            variant="secondary"
            fullWidth
            type="password"
            required
          />
          <Button variant="primary" className="w-full">
            Registrarse
          </Button>
          <p className="text-center text-sm text-foreground/60">
            ¿Ya tienes una cuenta?{" "}
            <a className="text-primary" href="/login">
              Iniciar sesión
            </a>
          </p>
        </Card>
      </Container>
    </MainLayout>
  );
};

export default RegisterView;
