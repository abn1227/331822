import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { fetchCategories } from "@/store/slices/categoriesSlice";

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const { expertise, services, availability, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return {
    expertise,
    services,
    availability,
    loading,
    error,
  };
};
