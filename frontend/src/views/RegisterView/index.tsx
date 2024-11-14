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
        >
          <h2>Register</h2>
          <p className="text-center text-sm text-foreground/60">
            Enter your email and password to create an account
          </p>
          <Input label="Name" variant="primary" fullWidth />
          <Input label="Email" variant="primary" fullWidth type="email" />
          <Input
            label="Password"
            variant="secondary"
            fullWidth
            type="password"
          />
          <Button variant="primary" className="w-full">
            Register
          </Button>
          <p className="text-center text-sm text-foreground/60">
            Already have an account?{" "}
            <a className="text-primary" href="/login">
              Login
            </a>
          </p>
        </Card>
      </Container>
    </MainLayout>
  );
};

export default RegisterView;
