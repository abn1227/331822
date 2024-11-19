import { Button, Card, Input, Loader, Modal, Select } from "@/components";
import { useCategories } from "@/hooks/useCategories";
import MainLayout from "@/layouts/MainLayout";
import { jobPetitionService } from "@/services/jobPetitionService";
import { CategoryOption } from "@/types/categories";
import { IJobPetitionRecord } from "@/types/jobPetition";
import { Plus, Search } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

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

  const {
    expertise,
    services,
    availability,
    jobPetitionStatus,
    loading: categoriesLoading,
  } = useCategories();

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
              Mis Peticiones de Servicios
            </h1>
            <p className="text-foreground/60">
              Busca y solicita trabajos de nuestros profesionales.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="whitespace-nowrap"
          >
            <Plus size={20} className="mr-2" />
            Solicitar Un Servicio
          </Button>
        </div>

        <Card className="p-4" variant="background">
          <p className="text-foreground/60 mb-4">Filtrar por:</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label="Buscar por nombre..."
              leftIcon={<Search size={20} />}
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />

            <Select
              label="Estado"
              options={jobPetitionStatus}
              value={filters.status}
              onChange={(value) =>
                setFilters({ ...filters, status: value as string })
              }
            />

            <Select
              label="Servicios"
              options={services}
              value={filters.services}
              onChange={(value) =>
                setFilters({ ...filters, services: value as string[] })
              }
              multiple
              searchable
            />

            <Select
              label="Día solicitado"
              options={availability}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-80 overflow-y-auto">
              {myPetitionsList.map((petition) => (
                <Card
                  key={petition._id}
                  className="hover:shadow-lg transition-shadow duration-200"
                  variant="background"
                >
                  <div className="flex items-start gap-4 p-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 justify-between">
                        <div className="rounded-full flex items-center justify-center w-1/2">
                          <span className="text-xl font-bold text-contrast-foreground/50 w-10 h-10 bg-primary/80 rounded-full flex items-center justify-center">
                            {petition.service}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold w-1/2">
                          {petition.description}
                        </h3>
                      </div>
                      <p className="text-foreground/60 capitalize mb-2 text-center">
                        {
                          expertise.find(
                            (opt: CategoryOption) =>
                              opt.value === petition.service
                          )?.label
                        }
                      </p>
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
                Anterior
              </Button>
              <Button
                variant="transparent"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Siguiente
              </Button>
            </div>
          </div>
        ) : (
          <Card className="p-8 text-center" variant="error">
            <p className="text-foreground/60">
              No se encontraron peticiones con los filtros seleccionados.
            </p>
          </Card>
        )}
      </div>
      {/* Paginación */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Solicitar Servicio"
        variant="background"
      >
        <></>
        {/* <JobPetitionRegistrationForm
          onSuccess={() => {
            setIsModalOpen(false);
            loadMyPetitions();
          }}
          onCancel={() => setIsModalOpen(false)}
        /> */}
      </Modal>
    </MainLayout>
  );
};

export default MyJobPetitionsView;
