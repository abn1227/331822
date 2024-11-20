import { useEffect, useState } from "react";
import { Button, Card, Container, Input } from "@/components";
import MainLayout from "../../layouts/MainLayout";
import { Eye, EyeOff } from "lucide-react";
import { useAuth, useToast, useTranslation } from "@/hooks";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Navigate } from "react-router-dom";

const LoginView = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { addToast } = useToast();

  if (user && isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  const { login, error } = useAuth();
  const { t } = useTranslation({
    ns: ["auth", "backendErrors"],
  });

  const handleLogin = async () => {
    await login(email, password);
  };

  useEffect(() => {
    if (error) {
      addToast({
        type: "error",
        message: t(`backendErrors:${error}`),
      });
    }
  }, [error]);

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
          <h2>{t("auth:login")}</h2>
          <p className="text-left text-sm text-foreground/60">
            {t("auth:loginDescription")}
          </p>
          <Input
            label={t("auth:email")}
            fullWidth
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            label={t("auth:password")}
            fullWidth
            type={passwordVisible ? "text" : "password"}
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
            {t("auth:signIn")}
          </Button>
          <p className="text-center text-sm text-foreground/60">
            {t("auth:noAccount")}{" "}
            <a className="text-accent" href="/register">
              {t("auth:register")}
            </a>
          </p>
        </Card>
      </Container>
    </MainLayout>
  );
};

export default LoginView;
