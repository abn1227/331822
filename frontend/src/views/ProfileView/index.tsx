import { Button, Card } from "@/components";
import { useTranslation, useAuth } from "@/hooks";
import { useAppSelector } from "@/hooks/reduxHooks";
import MainLayout from "@/layouts/MainLayout";
import { useNavigate } from "react-router-dom";

const ProfileView = () => {
  const { logout } = useAuth();
  const { user } = useAppSelector((state) => state.auth);
  const { t } = useTranslation({
    ns: "profile",
  });
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="space-y-6 w-full">
        <Card className="p-4" variant="background">
          <h1 className="text-2xl font-bold text-center">
            {t("profile:card.greetings")}, {user.firstName}
          </h1>
          <p className="text-center">{t("profile:card.yourProfile")}</p>
          <div className="grid grid-cols-1 gap-4 p-4">
            <p>
              {t("profile:card.role")}: {user.role}
            </p>
            <p>
              {t("profile:card.email")}: {user.email}
            </p>
            <p>
              {t("profile:card.id")}: {user.id}
            </p>
            <p>
              {t("profile:card.firstName")}: {user.firstName}
            </p>
            <p>
              {t("profile:card.lastName")}: {user.lastName}
            </p>
          </div>
        </Card>
        <Card childrenClassName="p-4 flex flex-col gap-4" variant="background">
          <h1>{t("profile:options.title")}</h1>
          {user.role === "admin" && (
            <>
              {/* <Button variant="primary">{t("profile:options.edit")}</Button> */}
              <Button variant="primary" onClick={() => navigate("/handyman")}>
                {t("profile:options.manageHandyman")}
              </Button>
              <Button variant="primary">
                {t("profile:options.manageJobPetitions")}
              </Button>
            </>
          )}
          <Button variant="error" onClick={() => logout()}>
            {t("profile:options.logout")}
          </Button>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProfileView;
