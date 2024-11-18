import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { Phone, Calendar, Plus, Search, Pen, Trash } from "lucide-react";
import Modal from "../../components/Modal";
import HandymanRegistrationForm from "./HandymanRegistrationForm";
import { useEffect, useState, useCallback } from "react";
import { handymanService } from "@/services/handymanService";
import { IHandyManRecord } from "@/types/handyman";
import Loader from "@/components/Loader";
import { useCategories } from "@/hooks/useCategories";
import { CategoryOption } from "@/types/categories";

const HandymanPage = () => {
  const RESULTS_PER_PAGE = 15;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [handymenList, setHandymenList] = useState<IHandyManRecord[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  const loadHandymen = useCallback(async () => {
    setLoading(true);
    handymanService
      .list(RESULTS_PER_PAGE, (page - 1) * RESULTS_PER_PAGE, filters)
      .then((response) => {
        setHandymenList(response.data);
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
              Registros de Prestadores de Servicios
            </h1>
            <p className="text-foreground/60">
              Busca y registra profesionales.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="whitespace-nowrap"
          >
            <Plus size={20} className="mr-2" />
            Agregar Profesional
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
              label="Expertiz"
              options={expertise}
              value={filters.expertise}
              onChange={(value) =>
                setFilters({ ...filters, expertise: value as string })
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
              label="Disponibilidad"
              options={availability}
              value={filters.availability}
              onChange={(value) =>
                setFilters({ ...filters, availability: value as string[] })
              }
              multiple
            />
          </div>
        </Card>

        {handymenList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-80 overflow-y-auto">
            {handymenList.map((handyman) => (
              <Card
                key={handyman._id}
                className="hover:shadow-lg transition-shadow duration-200"
                variant="background"
              >
                <Trash
                  size={20}
                  className="absolute top-2 right-2 cursor-pointer text-error"
                />
                <Pen
                  size={20}
                  className="absolute top-2 right-8 cursor-pointer text-accent"
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
                    <p className="text-foreground/60 capitalize mb-2 text-center">
                      {
                        expertise.find(
                          (opt: CategoryOption) =>
                            opt.value === handyman.expertise
                        )?.label
                      }
                    </p>

                    {/* Stats */}
                    {/* <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                      <span className="flex items-center gap-1">
                        ⭐ {handyman.rating}
                      </span>
                      <span>{handyman.totalJobs} trabajos</span>
                    </div> */}

                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <Phone size={16} />
                        {handyman.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar size={16} />
                        {handyman.availability.length} días disponibles
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 flex-row">
                      {handyman.services.map((service) => (
                        <span
                          key={service}
                          className="px-2 py-1 bg-accent/10 rounded-full text-xs text-nowrap"
                        >
                          {
                            services.find(
                              (opt: CategoryOption) => opt.value === service
                            )?.label
                          }
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center" variant="error">
            <p className="text-foreground/60">
              No se encontraron profesionales con los filtros seleccionados.
            </p>
          </Card>
        )}
      </div>

      {/* Paginación */}
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registro de Profesional"
        variant="background"
      >
        <HandymanRegistrationForm
          onSuccess={() => {
            setIsModalOpen(false);
            loadHandymen();
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </MainLayout>
  );
};

export default HandymanPage;
