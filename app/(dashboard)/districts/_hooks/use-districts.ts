import axios from "axios";

import { create } from "zustand";

import type { District } from "../_types";

const axiosInstance = axios.create({
  baseURL: "https://gurulab-kids.uz/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

type DistrictsStore = {
  districts: District[] | null;
  district: District | null;
  fetchDistricts: () => Promise<void>;
  fetchDistrict: (id: number) => Promise<void>;
  addDistrict: (newDistrict: { label: string }) => Promise<void>;
  updateDistrict: (
    id: number,
    updatedDistrict: { label: string },
  ) => Promise<void>;
  deleteDistrict: (id: number) => Promise<void>;
};

export const useDistricts = create<DistrictsStore>((set) => ({
  districts: null,
  district: null,
  fetchDistricts: async () => {
    try {
      const response = await axiosInstance.get("/districts");

      set({ districts: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchDistrict: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/districts/${id}`);

      set({ district: null });
      set({ district: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  addDistrict: async (newDistrict: { label: string }) => {
    try {
      const response = await axiosInstance.post("/districts", newDistrict);

      set((state) => ({
        districts: [...(state.districts || []), response.data],
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateDistrict: async (id: number, updatedDistrict: { label: string }) => {
    try {
      const response = await axiosInstance.patch(
        `/districts/${id}`,
        updatedDistrict,
      );

      set((state) => ({
        districts: state.districts?.map((district) =>
          district.id === id ? response.data : district,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  deleteDistrict: async (id: number) => {
    try {
      await axiosInstance.delete(`/districts/${id}`);

      set((state) => ({
        districts: state.districts?.filter((district) => district.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
