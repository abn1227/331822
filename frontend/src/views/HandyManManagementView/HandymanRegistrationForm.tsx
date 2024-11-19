import React, { useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { IHandyMan, IHandyManRecord } from "../../types/handyman";
import { handymanService } from "@/services/handymanService";
import { useCategories } from "@/hooks/useCategories";
import { useTranslation } from "@/hooks";
import { CategoryOption } from "@/types/categories";

interface HandymanRegistrationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  editData?: IHandyManRecord;
}

const HandymanRegistrationForm: React.FC<HandymanRegistrationFormProps> = ({
  onSuccess,
  onCancel,
  editData = null,
}) => {
  const [formData, setFormData] = useState<IHandyMan | IHandyManRecord>(
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

  const { expertise, services, availability } = useCategories();
  const { t } = useTranslation({
    ns: ["handyManManagement", "categories", "common"],
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("common:validation.required");
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t("common:validation.required");
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t("common:validation.required");
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = t("common:validation.phone");
    }
    if (!formData.expertise) {
      newErrors.expertise = t("common:validation.required");
    }
    if (formData.availability.length === 0) {
      newErrors.availability = t("common:validation.required");
    }
    if (formData.services.length === 0) {
      newErrors.services = t("common:validation.required");
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
        handymanService
          .update(editData._id, formData as IHandyManRecord)
          .then(() => {
            onSuccess();
          })
          .catch((error) => {
            console.error("Error al actualizar:", error);
          });
      } else {
        handymanService.create(formData).then(() => {
          onSuccess();
        });
      }
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
          label={t("handyManManagement:firstName")}
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          error={errors.firstName}
          required
        />

        <Input
          label={t("handyManManagement:lastName")}
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          error={errors.lastName}
          required
        />

        <Input
          label={t("handyManManagement:phone")}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
          required
        />

        <Select
          label={t("handyManManagement:expertise")}
          options={expertise.map((options: CategoryOption) => {
            return {
              value: options.value,
              label: t(`categories:expertise.${options.value}`),
            };
          })}
          value={formData.expertise}
          onChange={(value) =>
            setFormData({ ...formData, expertise: value as string })
          }
          error={errors.expertise}
          required
        />

        <Select
          label={t("handyManManagement:services")}
          options={services.map((options: CategoryOption) => {
            return {
              value: options.value,
              label: t(`categories:services.${options.value}`),
            };
          })}
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
          label={t("handyManManagement:availability")}
          options={availability.map((options: CategoryOption) => {
            return {
              value: options.value,
              label: t(`categories:availability.${options.value}`),
            };
          })}
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
          {t("common:buttons.cancel")}
        </Button>
        <Button variant="primary" type="submit" loading={isLoading}>
          {t("common:buttons.save")}
        </Button>
      </div>
    </form>
  );
};

export default HandymanRegistrationForm;
