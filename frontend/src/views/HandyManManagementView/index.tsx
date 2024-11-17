import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { Phone, Calendar, Plus, Search } from "lucide-react";
import Modal from "../../components/Modal";
import HandymanRegistrationForm from "./HandymanRegistrationForm.tsx";
import { useState } from "react";

const EXPERTISE_OPTIONS = [
  { value: "junior", label: "0 - 2 años" },
  { value: "intermediate", label: "2 - 5 años" },
  { value: "senior", label: "5 - 10 años" },
  { value: "expert", label: "Más de 10 años" },
];

const SERVICES_OPTIONS = [
  { value: "plumbing", label: "Plomería" },
  { value: "electrical", label: "Electricidad" },
  { value: "carpentry", label: "Carpintería" },
  { value: "painting", label: "Pintura" },
  { value: "general", label: "Mantenimiento General" },
  { value: "hvac", label: "Aire Acondicionado/Calefacción" },
];

const AVAILABILITY_OPTIONS = [
  { value: "monday", label: "Lunes" },
  { value: "tuesday", label: "Martes" },
  { value: "wednesday", label: "Miércoles" },
  { value: "thursday", label: "Jueves" },
  { value: "friday", label: "Viernes" },
  { value: "saturday", label: "Sábado" },
  { value: "sunday", label: "Domingo" },
];

const MOCK_HANDYMEN = [
  {
    id: "1",
    firstName: "Juan",
    lastName: "Pérez",
    phone: "+1234567890",
    expertise: "senior",
    services: ["plumbing", "electrical"],
    availability: ["monday", "wednesday", "friday"],
    rating: 4.5,
    totalJobs: 48,
  },
];

const HandymanPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    expertise: "",
    services: [] as string[],
    availability: [] as string[],
  });

  const handleFiltering = (handymen: typeof MOCK_HANDYMEN) => {
    return handymen.filter((handyman) => {
      const matchesSearch =
        filters.search === "" ||
        `${handyman.firstName} ${handyman.lastName}`
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesExpertise =
        filters.expertise === "" || handyman.expertise === filters.expertise;

      const matchesServices =
        filters.services.length === 0 ||
        filters.services.some((service) => handyman.services.includes(service));

      const matchesAvailability =
        filters.availability.length === 0 ||
        filters.availability.some((day) => handyman.availability.includes(day));

      return (
        matchesSearch &&
        matchesExpertise &&
        matchesServices &&
        matchesAvailability
      );
    });
  };

  const filteredHandymen = handleFiltering(MOCK_HANDYMEN);

  return (
    <MainLayout>
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
              options={EXPERTISE_OPTIONS}
              value={filters.expertise}
              onChange={(value) =>
                setFilters({ ...filters, expertise: value as string })
              }
            />

            <Select
              label="Servicios"
              options={SERVICES_OPTIONS}
              value={filters.services}
              onChange={(value) =>
                setFilters({ ...filters, services: value as string[] })
              }
              multiple
              searchable
            />

            <Select
              label="Disponibilidad"
              options={AVAILABILITY_OPTIONS}
              value={filters.availability}
              onChange={(value) =>
                setFilters({ ...filters, availability: value as string[] })
              }
              multiple
            />
          </div>
        </Card>

        {filteredHandymen.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHandymen.map((handyman) => (
              <Card
                key={handyman.id}
                className="hover:shadow-lg transition-shadow duration-200"
                variant="background"
              >
                <div className="flex items-start gap-4 p-6">
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
                        EXPERTISE_OPTIONS.find(
                          (opt) => opt.value === handyman.expertise
                        )?.label
                      }
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                      <span className="flex items-center gap-1">
                        ⭐ {handyman.rating}
                      </span>
                      <span>{handyman.totalJobs} trabajos</span>
                    </div>

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

                    <div className="mt-4 flex flex-wrap gap-2">
                      {handyman.services.map((service) => (
                        <span
                          key={service}
                          className="px-2 py-1 bg-accent/10 rounded-full text-xs"
                        >
                          {
                            SERVICES_OPTIONS.find(
                              (opt) => opt.value === service
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registro de Profesional"
        variant="background"
      >
        <HandymanRegistrationForm
          onSuccess={() => {
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </MainLayout>
  );
};

export default HandymanPage;
