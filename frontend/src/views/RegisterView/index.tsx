import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Input from "../../components/Input";
import MainLayout from "../../layouts/MainLayout";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

const RegisterView = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (user && isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  const { register } = useAuth();

  const handleRegister = async () => {
    await register(email, password, firstName, lastName);
  };
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
          <Input
            label="Nombres"
            variant="primary"
            fullWidth
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label="Apellidos"
            variant="primary"
            fullWidth
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            label="Email"
            variant="primary"
            fullWidth
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Contraseña"
            variant="secondary"
            fullWidth
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Button variant="primary" className="w-full" onClick={handleRegister}>
            Registrarse
          </Button>
          <p className="text-center text-sm text-foreground/60">
            ¿Ya tienes una cuenta?{" "}
            <a className="text-accent" href="/login">
              Iniciar sesión
            </a>
          </p>
        </Card>
      </Container>
    </MainLayout>
  );
};

export default RegisterView;
