import React, { useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { IHandyMan } from "../../types/handyman";
import { handymanService } from "@/services/handymanService";

interface HandymanRegistrationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  editData?: IHandyMan;
}

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
  { value: "cleaning", label: "Limpieza" },
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

const HandymanRegistrationForm: React.FC<HandymanRegistrationFormProps> = ({
  onSuccess,
  onCancel,
  editData,
}) => {
  const [formData, setFormData] = useState<IHandyMan>(
    editData || {
      firstName: "",
      lastName: "",
      phone: "",
      expertise: "",
      availability: [],
      services: [],
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Número de teléfono inválido";
    }
    if (!formData.expertise) {
      newErrors.expertise = "Seleccione una especialidad";
    }
    if (formData.availability.length === 0) {
      newErrors.availability = "Seleccione al menos un día de disponibilidad";
    }
    if (formData.services.length === 0) {
      newErrors.services = "Seleccione al menos un servicio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      handymanService.create(formData).then(() => {
        // console.log(response);
        onSuccess();
      });
    } catch (error) {
      console.error("Error al registrar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Nombre"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          error={errors.firstName}
          placeholder="Juan"
          required
        />

        <Input
          label="Apellido"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          error={errors.lastName}
          placeholder="Pérez"
          required
        />

        <Input
          label="Teléfono"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
          required
          placeholder="+1234567890"
        />

        <Select
          label="Especialidad"
          options={EXPERTISE_OPTIONS}
          value={formData.expertise}
          onChange={(value) =>
            setFormData({ ...formData, expertise: value as string })
          }
          error={errors.expertise}
          required
        />

        <Select
          label="Servicios Ofrecidos"
          options={SERVICES_OPTIONS}
          value={formData.services}
          onChange={(value) =>
            setFormData({ ...formData, services: value as string[] })
          }
          error={errors.services}
          required
          multiple
          searchable
        />

        <Select
          label="Disponibilidad"
          options={AVAILABILITY_OPTIONS}
          value={formData.availability}
          onChange={(value) =>
            setFormData({ ...formData, availability: value as string[] })
          }
          error={errors.availability}
          required
          multiple
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          variant="transparent"
          type="button"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button variant="primary" type="submit" loading={isLoading}>
          Registrar
        </Button>
      </div>
    </form>
  );
};

export default HandymanRegistrationForm;
