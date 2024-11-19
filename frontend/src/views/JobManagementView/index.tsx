import { Button, Card, Input, Loader, Select } from "@/components";
import { useCategories } from "@/hooks/useCategories";
import MainLayout from "@/layouts/MainLayout";
import { jobPetitionService } from "@/services/jobPetitionService";
import { CategoryOption } from "@/types/categories";
import { IJobPetitionRecord } from "@/types/jobPetition";
import { Search } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks";

const JobManagementView = () => {
  const RESULTS_PER_PAGE = 15;
  const [loading, setLoading] = useState(false);
  const [petitionsList, setMyPetitionsList] = useState<IJobPetitionRecord[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    service: [] as string[],
    status: [] as string[],
    availability: [] as string[],
  });

  const {
    services,
    availability,
    jobPetitionStatus,
    loading: categoriesLoading,
  } = useCategories();

  const statusColor = {
    pending: "text-warning",
    assignated: "text-success",
    rejected: "text-error",
    completed: "text-accent",
  };

  const navigate = useNavigate();

  const { t } = useTranslation({
    ns: ["jobPetitionManagement", "categories", "common"],
  });

  const loadPetitions = useCallback(async () => {
    setLoading(true);
    jobPetitionService
      .list(RESULTS_PER_PAGE, (page - 1) * RESULTS_PER_PAGE, filters)
      .then((response) => {
        setMyPetitionsList(response.data.data);
        setTotalPages(response?.pagination?.totalPages || 1);
        setLoading(false);
      });
  }, [filters, page]);

  const handleAcceptPetition = async (petition: IJobPetitionRecord) => {
    navigate(`/job-petitions/${petition._id}`);
  };

  const handleRejectPetition = async (petition: IJobPetitionRecord) => {
    setLoading(true);
    await jobPetitionService.changeStatus(petition._id, "rejected");
    loadPetitions();
  };

  const handleCompletePetition = async (petition: IJobPetitionRecord) => {
    setLoading(true);
    await jobPetitionService.changeStatus(petition._id, "completed");
    loadPetitions();
  };

  useEffect(() => {
    loadPetitions();
  }, [loadPetitions]);

  return (
    <MainLayout>
      {loading ||
        (categoriesLoading && <Loader fullScreen variant="accent" size="lg" />)}
      <div className="space-y-6 w-full">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">
              {t("jobPetitionManagement:title")}
            </h1>
            <p className="text-foreground/60">
              {t("jobPetitionManagement:subtitle")}
            </p>
          </div>
        </div>

        <Card className="p-4" variant="background">
          <p className="text-foreground/60 mb-4">{t("filterBy")}</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label={t("jobPetitionManagement:searchPlaceholder")}
              leftIcon={<Search size={20} />}
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />

            <Select
              label={t("jobPetitionManagement:status")}
              options={jobPetitionStatus.map((options: CategoryOption) => {
                return {
                  value: options.value,
                  label: t(`categories:jobPetitionStatus.${options.value}`),
                };
              })}
              value={filters.status}
              onChange={(value) =>
                setFilters({ ...filters, status: value as string[] })
              }
              multiple
            />

            <Select
              label={t("jobPetitionManagement:service")}
              options={services.map((options: CategoryOption) => {
                return {
                  value: options.value,
                  label: t(`categories:services.${options.value}`),
                };
              })}
              value={filters.service}
              onChange={(value) =>
                setFilters({ ...filters, service: value as string[] })
              }
              multiple
              searchable
            />

            <Select
              label={t("jobPetitionManagement:askedDay")}
              options={availability.map((options: CategoryOption) => {
                return {
                  value: options.value,
                  label: t(`categories:availability.${options.value}`),
                };
              })}
              value={filters.availability}
              onChange={(value) =>
                setFilters({ ...filters, availability: value as string[] })
              }
              multiple
            />
          </div>
        </Card>

        {petitionsList.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-80 overflow-y-auto">
              {petitionsList.map((petition) => (
                <Card
                  key={petition._id}
                  className="hover:shadow-lg transition-shadow duration-200"
                  variant="background"
                >
                  <div className="flex items-start gap-4 p-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center justify-center w-full">
                          <span className="text-xl font-bold text-contrast-foreground bg-primary/80 rounded-xl flex items-center justify-center w-full text-center">
                            {t(`categories:services.${petition.service}`)}
                          </span>
                        </div>
                      </div>
                      {petition.status && (
                        <p
                          className={`capitalize mb-2 text-center ${
                            statusColor[petition.status]
                          }`}
                        >
                          {t(`categories:jobPetitionStatus.${petition.status}`)}
                        </p>
                      )}
                      <h3 className="font-semibold w-full text-justify">
                        {petition.description}
                      </h3>

                      <div className="flex items-center gap-2 mt-4">
                        <p className="text-sm text-foreground/60">
                          {t("jobPetitionManagement:askedDay")}:
                        </p>
                        <p className="text-sm text-foreground/60 font-bold">
                          {`${moment(petition.date).format("DD/MM/YYYY")} (${t(
                            `categories:availability.${petition.availability}`
                          )})`}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <p className="text-sm text-foreground/60">
                          {t("jobPetitionManagement:time")}:
                        </p>
                        <p className="text-sm text-foreground/60 font-bold">
                          {petition.time}
                        </p>
                      </div>
                      {petition.status === "pending" && (
                        <div className="flex items-center justify-between gap-2 mt-4">
                          <Button
                            variant="error"
                            onClick={() => {
                              handleRejectPetition(petition);
                            }}
                          >
                            {t("jobPetitionManagement:reject")}
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => {
                              handleAcceptPetition(petition);
                            }}
                          >
                            {t("jobPetitionManagement:accept")}
                          </Button>
                        </div>
                      )}
                      {petition.status === "assignated" && (
                        <div className="flex items-center justify-between gap-2 mt-4">
                          <Button
                            variant="primary"
                            onClick={() => {
                              handleAcceptPetition(petition);
                            }}
                          >
                            {t("jobPetitionManagement:viewDetails")}
                          </Button>
                          <Button
                            variant="success"
                            onClick={() => {
                              handleCompletePetition(petition);
                            }}
                          >
                            {t("jobPetitionManagement:complete")}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="transparent"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                {t("jobPetitionManagement:previous")}
              </Button>
              <Button
                variant="transparent"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                {t("jobPetitionManagement:next")}
              </Button>
            </div>
          </div>
        ) : (
          <Card className="p-8 text-center" variant="error">
            <p className="text-foreground/60">
              {t("jobPetitionManagement:noPetitionsFound")}
            </p>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default JobManagementView;
