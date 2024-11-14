import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import Input from "../components/Input";

const LoginView = () => {
  return (
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
          Enter your email and password to log in
        </p>
        <Input label="Email" variant="primary" fullWidth type="email" />
        <Input label="Password" variant="secondary" fullWidth type="password" />
        <Button variant="primary" className="w-full">
          Login
        </Button>
        <p className="text-center text-sm text-foreground/60">
          Don't have an account? <span className="text-primary">Sign up</span>
        </p>
      </Card>
    </Container>
  );
};

export default LoginView;
