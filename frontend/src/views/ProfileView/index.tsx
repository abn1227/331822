import Button from "@/components/Button";
import Card from "@/components/Card";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useAuth } from "@/hooks/useAuth";
import MainLayout from "@/layouts/MainLayout";
import { useNavigate } from "react-router-dom";

const ProfileView = () => {
  const { logout } = useAuth();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="space-y-6 w-full">
        <Card className="p-4" variant="background">
          <h1>Hola, {user.firstName}</h1>
          <p>Estas es tu perfil</p>
          <p>Role: {user.role}</p>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
          <p>Nombre: {user.firstName}</p>
          <p>Apellido: {user.lastName}</p>
        </Card>
        <Card childrenClassName="p-4 flex flex-col gap-4" variant="background">
          <h1>Elige una opción</h1>
          {user.role === "admin" && (
            <>
              <Button variant="primary">Editar Perfil</Button>
              <Button variant="primary" onClick={() => navigate("/handyman")}>
                Gestionar Prestadores de Servicios
              </Button>
              <Button variant="primary">Gestionar Trabajos</Button>
            </>
          )}
          <Button variant="error" onClick={() => logout()}>
            Cerrar Sesión
          </Button>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProfileView;
