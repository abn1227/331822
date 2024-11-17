import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Input from "../../components/Input";
import MainLayout from "../../layouts/MainLayout";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const LoginView = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { login } = useAuth();

  const handleLogin = async () => {
    const response = await login(email, password);
    console.log(response);
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
          <h2>Iniciar Sesión</h2>
          <p className="text-left text-sm text-foreground/60">
            Ingresa tu email y contraseña para iniciar sesión
          </p>
          <Input
            label="Email"
            fullWidth
            type="email"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            label="Contraseña"
            fullWidth
            type={passwordVisible ? "text" : "password"}
            placeholder="Any password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
          <Button variant="primary" className="w-full" onClick={handleLogin}>
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
