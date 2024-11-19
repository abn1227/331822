import { categoryService } from "@/services/categoryService";
import { CategoryState, ICategoryRecord } from "@/types/categories";
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
  jobPetitionStatus: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.list();
      return response.data;
    } catch (error) {
      console.debug(error);
      return rejectWithValue("Error al obtener las categorías");
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (!action.payload) {
          return;
        }

        const expertise = action.payload.find(
          (category: ICategoryRecord) => category.type === "expertise"
        );
        const services = action.payload.find(
          (category: ICategoryRecord) => category.type === "services"
        );
        const availability = action.payload.find(
          (category: ICategoryRecord) => category.type === "availability"
        );
        const jobPetitionStatus = action.payload.find(
          (category: ICategoryRecord) => category.type === "jobPetitionStatus"
        );

        state.expertise = expertise?.options || [];
        state.services = services?.options || [];
        state.availability = availability?.options || [];
        state.jobPetitionStatus = jobPetitionStatus?.options || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export default categoriesSlice.reducer;
