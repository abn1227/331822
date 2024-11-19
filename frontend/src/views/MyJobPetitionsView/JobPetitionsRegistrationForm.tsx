import React, { useEffect, useState } from "react";
import { Input, Select, Button } from "@/components";
import { IJobPetition, IJobPetitionRecord } from "@/types/jobPetition";
import { jobPetitionService } from "@/services/jobPetitionService";
import { DatePicker, TimePicker } from "@/components";
import { useToast } from "@/hooks";
import { useCategories } from "@/hooks/useCategories";

interface JobPetitionRegistrationForm {
  onSuccess: () => void;
  onCancel: () => void;
  editData?: IJobPetitionRecord;
}

const JobPetitionRegistrationForm: React.FC<JobPetitionRegistrationForm> = ({
  onSuccess,
  onCancel,
  editData = null,
}) => {
  const MAX_DATE = new Date();
  MAX_DATE.setMonth(MAX_DATE.getMonth() + 2);

  const [formData, setFormData] = useState<IJobPetition | IJobPetitionRecord>(
    editData || {
      description: "",
      service: "",
      availability: "",
      date: new Date().toISOString(),
      time: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { services } = useCategories();
  const { addToast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.service.trim()) {
      newErrors.service = "El servicio es requerido";
    }

    if (!formData.date.trim()) {
      newErrors.date = "La fecha es requerida";
    }

    if (!formData.time.trim()) {
      newErrors.time = "La hora es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      if (editData) {
        jobPetitionService
          .update(editData._id, formData as IJobPetitionRecord)
          .then(() => {
            onSuccess();
          });
      } else {
        jobPetitionService
          .create(formData)
          .then(() => {
            onSuccess();
          })
          .catch((error) => {
            const messageParsed = JSON.parse(error.message);
            addToast({
              type: "error",
              message: messageParsed.message,
            });
          });
      }
    } catch (error) {
      addToast({
        type: "error",
        message: "Error al registrar petición de servicio",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Select
          label="Selecciona el tipo de servicio"
          options={services}
          value={formData.service}
          onChange={(value) =>
            setFormData({ ...formData, service: value as string })
          }
          error={errors.service}
          required
          searchable
        />
        <Input
          label="Descripción"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Descripción del servicio"
        />
        <DatePicker
          label="Fecha solicitud"
          value={new Date(formData.date)}
          onChange={(e) =>
            setFormData({
              ...formData,
              date: e.toISOString(),
              availability: e
                .toLocaleDateString("en-US", { weekday: "long" })
                .toLowerCase(),
            })
          }
          error={errors.date}
          minDate={new Date()}
          maxDate={MAX_DATE}
          placeholder="Fecha solicitud"
          required
          className="w-full"
          variant="primary"
        />
        <TimePicker
          label="Hora solicitud"
          value={formData.time}
          onChange={(value) => setFormData({ ...formData, time: value })}
          error={errors.time}
          minTime="09:00"
          maxTime="16:00"
          placeholder="Hora solicitud"
          required
          className="w-full"
          variant="primary"
          format24h={false}
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

export default JobPetitionRegistrationForm;
