import { ICategory } from "@/models/Category";
import { CategoryRepository } from "@/repositories/CategoryRepository";

const categories = [
  {
    type: "expertise",
    options: [
      {
        value: "junior",
        label: "0 - 2 años",
      },
      {
        value: "intermediate",
        label: "2 - 5 años",
      },
      {
        value: "senior",
        label: "5 - 10 años",
      },
      {
        value: "expert",
        label: "Más de 10 años",
      },
    ],
  },
  {
    type: "services",
    options: [
      {
        value: "plumbing",
        label: "Plomería",
      },
      {
        value: "electrical",
        label: "Electricidad",
      },
      {
        value: "carpentry",
        label: "Carpintería",
      },
      {
        value: "painting",
        label: "Pintura",
      },
      {
        value: "general",
        label: "Mantenimiento General",
      },
      {
        value: "cleaning",
        label: "Limpieza",
      },
      {
        value: "hvac",
        label: "Aire Acondicionado/Calefacción",
      },
    ],
  },
  {
    type: "availability",
    options: [
      {
        value: "monday",
        label: "Lunes",
      },
      {
        value: "tuesday",
        label: "Martes",
      },
      {
        value: "wednesday",
        label: "Miércoles",
      },
      {
        value: "thursday",
        label: "Jueves",
      },
      {
        value: "friday",
        label: "Viernes",
      },
      {
        value: "saturday",
        label: "Sábado",
      },
      {
        value: "sunday",
        label: "Domingo",
      },
    ],
  },
];

async function categoriesSeeder() {
  const categoryRepository = new CategoryRepository();
  await categoryRepository.batchDelete();
  await categoryRepository.batchCreate(categories as ICategory[]);
  console.log("Categories seeded successfully");
}

export default categoriesSeeder;
