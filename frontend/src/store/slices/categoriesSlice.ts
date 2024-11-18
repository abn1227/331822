import { CategoryState } from "@/types/categories";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// interface CategoriesResponse {
//   expertise: string[];
//   services: string[];
//   availability: string[];
// }

const initialState: CategoryState = {
  expertise: [
    { value: "junior", label: "0 - 2 años" },
    { value: "intermediate", label: "2 - 5 años" },
    { value: "senior", label: "5 - 10 años" },
    { value: "expert", label: "Más de 10 años" },
  ],
  services: [
    { value: "plumbing", label: "Plomería" },
    { value: "electrical", label: "Electricidad" },
    { value: "carpentry", label: "Carpintería" },
    { value: "painting", label: "Pintura" },
    { value: "general", label: "Mantenimiento General" },
    { value: "cleaning", label: "Limpieza" },
    { value: "hvac", label: "Aire Acondicionado/Calefacción" },
  ],
  availability: [
    { value: "monday", label: "Lunes" },
    { value: "tuesday", label: "Martes" },
    { value: "wednesday", label: "Miércoles" },
    { value: "thursday", label: "Jueves" },
    { value: "friday", label: "Viernes" },
    { value: "saturday", label: "Sábado" },
    { value: "sunday", label: "Domingo" },
  ],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {}
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
