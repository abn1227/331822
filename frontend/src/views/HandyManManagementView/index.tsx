import { useEffect, useState, useCallback } from "react";

import MainLayout from "@/layouts/MainLayout";
import { Card, Input, Select, Button, Modal, Loader } from "@/components";
import { Phone, Calendar, Plus, Search, Pen, Trash } from "lucide-react";
import { useToast, useTranslation } from "@/hooks";
import { handymanService } from "@/services/handymanService";
import { IHandyManRecord } from "@/types/handyman";
import { CategoryOption } from "@/types/categories";

import HandymanRegistrationForm from "./HandymanRegistrationForm";
import { useCategories } from "@/hooks/useCategories";

const HandymanPage = () => {
  const RESULTS_PER_PAGE = 15;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [handymenList, setHandymenList] = useState<IHandyManRecord[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editData, setEditData] = useState<IHandyManRecord | undefined>(
    undefined
  );
  const [filters, setFilters] = useState({
    search: "",
    expertise: "",
    services: [] as string[],
    availability: [] as string[],
  });

  const {
    expertise,
    services,
    availability,
    loading: categoriesLoading,
  } = useCategories();

  const { addToast } = useToast();
  const { t } = useTranslation({
    ns: ["handyManManagement", "categories"],
  });

  const loadHandymen = useCallback(async () => {
    setLoading(true);
    handymanService
      .list(RESULTS_PER_PAGE, (page - 1) * RESULTS_PER_PAGE, filters)
      .then((response) => {
        setHandymenList(response.data.data);
        setTotalPages(response?.pagination?.totalPages || 1);
        setLoading(false);
      });
  }, [filters, page]);

  useEffect(() => {
    loadHandymen();
  }, [loadHandymen]);

  return (
    <MainLayout>
      {(loading || categoriesLoading) && (
        <Loader fullScreen variant="accent" size="lg" />
      )}
      <div className="space-y-6 w-full">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">
              {t("handyManManagement:title")}
            </h1>
            <p className="text-foreground/60">
              {t("handyManManagement:subtitle")}
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => {
              setEditData(undefined);
              setIsModalOpen(true);
            }}
            className="whitespace-nowrap"
          >
            <Plus size={20} className="mr-2" />
            {t("handyManManagement:addHandyman")}
          </Button>
        </div>

        <Card className="p-4" variant="background">
          <p className="text-foreground/60 mb-4">{t("filterBy")}</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label={t("handyManManagement:searchPlaceholder")}
              leftIcon={<Search size={20} />}
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />

            <Select
              label={t("handyManManagement:expertise")}
              options={expertise.map((options: CategoryOption) => {
                return {
                  value: options.value,
                  label: t(`categories:expertise.${options.value}`),
                };
              })}
              value={filters.expertise}
              onChange={(value) =>
                setFilters({ ...filters, expertise: value as string })
              }
            />

            <Select
              label={t("handyManManagement:services")}
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
              label={t("handyManManagement:availability")}
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

        {handymenList.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-80 overflow-y-auto">
              {handymenList.map((handyman) => (
                <Card
                  key={handyman._id}
                  className="hover:shadow-lg transition-shadow duration-200"
                  variant="background"
                >
                  <Pen
                    size={20}
                    className="absolute top-2 right-8 cursor-pointer text-accent"
                    onClick={() => {
                      setEditData(handyman);
                      setIsModalOpen(true);
                    }}
                  />
                  <Trash
                    size={20}
                    className="absolute top-2 right-2 cursor-pointer text-error"
                  />
                  <div className="flex items-start gap-4 p-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 justify-between">
                        <div className="rounded-full flex items-center justify-center w-1/2">
                          <span className="text-xl font-bold text-contrast-foreground/50 w-10 h-10 bg-primary/80 rounded-full flex items-center justify-center">
                            {handyman.firstName[0]}
                            {handyman.lastName[0]}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold w-1/2">
                          {handyman.firstName} {handyman.lastName}
                        </h3>
                      </div>
                      <p className="text-foreground/60 capitalize mb-2 text-center text-sm">
                        {t("handyManManagement:expertise")}:
                      </p>
                      <p className="text-foreground/60 capitalize mb-2 text-center">
                        {t(`categories:expertise.${handyman.expertise}`)}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                        <span className="flex items-center gap-1">
                          ⭐ {handyman.rating || "0"}
                        </span>
                        <span>{handyman.jobsCount || "0"} trabajos</span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <Phone size={16} />
                          {handyman.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <Calendar size={16} />
                          {handyman.availability.length}{" "}
                          {t("handyManManagement:daysAvailable")}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 flex-row">
                        {handyman.services.map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 bg-accent/10 rounded-full text-xs text-nowrap"
                          >
                            {t(`categories:services.${service}`)}
                          </span>
                        ))}
                      </div>
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
                {t("handyManManagement:previous")}
              </Button>
              <Button
                variant="transparent"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                {t("handyManManagement:next")}
              </Button>
            </div>
          </>
        ) : (
          <Card className="p-8 text-center" variant="error">
            <p className="text-foreground/60">
              {t("handyManManagement:noHandymansFound")}
            </p>
          </Card>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editData
            ? t("handyManManagement:editHandyman")
            : t("handyManManagement:createHandyman")
        }
        variant="background"
      >
        <HandymanRegistrationForm
          onSuccess={() => {
            setEditData(undefined);
            setIsModalOpen(false);
            loadHandymen();
            addToast({
              type: "success",
              message: t("handyManManagement:handymanRegisteredSuccessfully"),
            });
          }}
          onCancel={() => setIsModalOpen(false)}
          editData={editData}
        />
      </Modal>
    </MainLayout>
  );
};

export default HandymanPage;
