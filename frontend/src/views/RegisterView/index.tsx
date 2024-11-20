import { useEffect, useState } from "react";
import { Button, Card, Container, Input } from "@/components";
import MainLayout from "../../layouts/MainLayout";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Navigate } from "react-router-dom";
import { useAuth, useToast, useTranslation } from "@/hooks";
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

  const { register, error } = useAuth();
  const { addToast } = useToast();
  const { t } = useTranslation({
    ns: ["auth", "backendErrors"],
  });

  useEffect(() => {
    if (error) {
      addToast({
        type: "error",
        message: t(`backendErrors:${error}`),
      });
    }
  }, [error]);

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
          <h2>{t("auth:register")}</h2>
          <p className="text-left text-sm text-foreground/60">
            {t("auth:registerDescription")}
          </p>
          <Input
            label={t("auth:firstName")}
            variant="primary"
            fullWidth
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label={t("auth:lastName")}
            variant="primary"
            fullWidth
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            label={t("auth:email")}
            variant="primary"
            fullWidth
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label={t("auth:password")}
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
            {t("auth:signUp")}
          </Button>
          <p className="text-center text-sm text-foreground/60">
            {t("auth:alreadyHaveAnAccount")}{" "}
            <a className="text-accent" href="/login">
              {t("auth:login")}
            </a>
          </p>
        </Card>
      </Container>
    </MainLayout>
  );
};

export default RegisterView;
