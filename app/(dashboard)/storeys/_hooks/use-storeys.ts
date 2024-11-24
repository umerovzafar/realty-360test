import axios from "axios";

import { create } from "zustand";

import type { Storey } from "../_types";

const axiosInstance = axios.create({
  baseURL: "https://gurulab-kids.uz/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

type StoreysStore = {
  storeys: Storey[] | null;
  storey: Storey | null;
  fetchStoreys: () => Promise<void>;
  fetchStorey: (id: number) => Promise<void>;
  addStorey: (newStorey: { label: string }) => Promise<void>;
  updateStorey: (id: number, updatedStorey: { label: string }) => Promise<void>;
  deleteStorey: (id: number) => Promise<void>;
};

export const useStoreys = create<StoreysStore>((set) => ({
  storeys: null,
  storey: null,
  fetchStoreys: async () => {
    try {
      const response = await axiosInstance.get("/storeys");

      set({ storeys: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchStorey: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/storeys/${id}`);

      set({ storey: null });
      set({ storey: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  addStorey: async (newStorey: { label: string }) => {
    try {
      const response = await axiosInstance.post("/storeys", newStorey);

      set((state) => ({
        storeys: [...(state.storeys || []), response.data],
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateStorey: async (id: number, updatedStorey: { label: string }) => {
    try {
      const response = await axiosInstance.patch(
        `/storeys/${id}`,
        updatedStorey,
      );

      set((state) => ({
        storeys: state.storeys?.map((storey) =>
          storey.id === id ? response.data : storey,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  deleteStorey: async (id: number) => {
    try {
      await axiosInstance.delete(`/storeys/${id}`);

      set((state) => ({
        storeys: state.storeys?.filter((storey) => storey.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
