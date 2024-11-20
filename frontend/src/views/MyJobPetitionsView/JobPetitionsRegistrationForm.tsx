import React, { useState } from "react";
import { Input, Select, Button } from "@/components";
import { IJobPetition, IJobPetitionRecord } from "@/types/jobPetition";
import { jobPetitionService } from "@/services/jobPetitionService";
import { DatePicker, TimePicker } from "@/components";
import { useToast, useTranslation } from "@/hooks";
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
      availability: new Date()
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase(),
      date: new Date().toISOString(),
      time: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { services } = useCategories();
  const { addToast } = useToast();
  const { t } = useTranslation({
    ns: ["backendErrors", "jobPetitionManagement", "categories"],
  });

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
            addToast({
              type: "error",
              message: t(`backendErrors:${error.message}`),
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
          label={t("jobPetitionManagement:service")}
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
          label={t("jobPetitionManagement:description")}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <DatePicker
          label={t("jobPetitionManagement:askedDay")}
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
          label={t("jobPetitionManagement:time")}
          value={formData.time}
          onChange={(value) => setFormData({ ...formData, time: value })}
          error={errors.time}
          minTime="09:00"
          maxTime="16:00"
          required
          placeholder={t("jobPetitionManagement:timePlaceholder")}
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
          {t("common:buttons.cancel")}
        </Button>
        <Button variant="primary" type="submit" loading={isLoading}>
          {t("common:buttons.save")}
        </Button>
      </div>
    </form>
  );
};

export default JobPetitionRegistrationForm;
