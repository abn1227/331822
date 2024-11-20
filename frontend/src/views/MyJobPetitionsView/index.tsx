import { Button, Card, Input, Loader, Modal, Select } from "@/components";
import { useCategories } from "@/hooks/useCategories";
import MainLayout from "@/layouts/MainLayout";
import { jobPetitionService } from "@/services/jobPetitionService";
import { CategoryOption } from "@/types/categories";
import { IJobPetitionRecord } from "@/types/jobPetition";
import { Plus, Search } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import JobPetitionRegistrationForm from "./JobPetitionsRegistrationForm";
import moment from "moment";
import { useToast, useTranslation } from "@/hooks";
import Rating from "@/components/Rating";
import { jobStatsService } from "@/services/jobStatsService";

const MyJobPetitionsView = () => {
  const RESULTS_PER_PAGE = 15;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myPetitionsList, setMyPetitionsList] = useState<IJobPetitionRecord[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    services: [] as string[],
    status: "" as string,
    availability: [] as string[],
  });
  const [rating, setRating] = useState(0);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [focusedPetition, setFocusedPetition] = useState<IJobPetitionRecord>();

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

  const { t } = useTranslation({
    ns: ["jobPetitionManagement", "categories", "common"],
  });

  const { addToast } = useToast();

  const loadMyPetitions = useCallback(async () => {
    setLoading(true);
    jobPetitionService
      .listMyPetitions(RESULTS_PER_PAGE, (page - 1) * RESULTS_PER_PAGE, {})
      .then((response) => {
        setMyPetitionsList(response.data.data);
        setTotalPages(response?.pagination?.totalPages || 1);
        setLoading(false);
      });
  }, [filters, page]);

  const handleRatePetition = async (value: number) => {
    if (!focusedPetition) {
      return;
    }
    setLoading(true);
    await jobStatsService.changeRating(focusedPetition._id, value);
    await jobPetitionService.changeRating(focusedPetition._id, value);
    addToast({
      type: "success",
      message: t("jobPetitionManagement:thanksForRating"),
    });
    setFocusedPetition(undefined);
    setRating(0);
    setIsRatingModalOpen(false);
    loadMyPetitions();
  };

  useEffect(() => {
    loadMyPetitions();
  }, [loadMyPetitions]);

  return (
    <MainLayout>
      {loading ||
        (categoriesLoading && <Loader fullScreen variant="accent" size="lg" />)}
      <div className="space-y-6 w-full">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">
              {t("jobPetitionManagement:myPetitions")}
            </h1>
            <p className="text-foreground/60">
              {t("jobPetitionManagement:searchAndRequestJob")}
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="whitespace-nowrap"
          >
            <Plus size={20} className="mr-2" />
            {t("jobPetitionManagement:requestService")}
          </Button>
        </div>

        <Card className="p-4" variant="background">
          <p className="text-foreground/60 mb-4">
            {t("jobPetitionManagement:filterBy")}
          </p>
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
                setFilters({ ...filters, status: value as string })
              }
            />

            <Select
              label={t("jobPetitionManagement:service")}
              options={services.map((options: CategoryOption) => {
                return {
                  value: options.value,
                  label: t(`categories:services.${options.value}`),
                };
              })}
              value={filters.services}
              onChange={(value) =>
                setFilters({ ...filters, services: value as string[] })
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

        {myPetitionsList.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-80 overflow-y-auto">
              {myPetitionsList.map((petition) => (
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
                          {moment(petition.date).format("DD/MM/YYYY")}
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
                      {petition.status === "completed" && (
                        <div className="flex items-center justify-between gap-2 mt-4">
                          <Button
                            variant="primary"
                            disabled={petition.rating ? petition.rating > 0 : false}
                            onClick={() => {
                              setFocusedPetition(petition);
                              setIsRatingModalOpen(true);
                            }}
                          >
                            {t("jobPetitionManagement:rateJob")}
                          </Button>
                          <Rating
                            value={petition.rating}
                            variant="accent"
                            readOnly
                          />
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
                {t("common:buttons.previous")}
              </Button>
              <Button
                variant="transparent"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                {t("common:buttons.next")}
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("jobPetitionManagement:requestService")}
        variant="background"
      >
        <JobPetitionRegistrationForm
          onSuccess={() => {
            setIsModalOpen(false);
            loadMyPetitions();
          }}
          onCancel={() => setIsModalOpen(false)}
        ></JobPetitionRegistrationForm>
      </Modal>

      <Modal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        title={t("jobPetitionManagement:rateJob")}
        variant="transparent"
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <Rating
            value={rating}
            onChange={(value) => handleRatePetition(value)}
            max={5}
            variant="accent"
            allowHalf
            showValue
          />
        </div>
      </Modal>
    </MainLayout>
  );
};

export default MyJobPetitionsView;
