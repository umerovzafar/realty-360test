import axios from "axios";

import { create } from "zustand";

import type { Type } from "../_types";

const axiosInstance = axios.create({
  baseURL: "https://gurulab-kids.uz/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

type TypesStore = {
  types: Type[] | null;
  type: Type | null;
  fetchTypes: () => Promise<void>;
  fetchType: (id: number) => Promise<void>;
  addType: (newType: { label: string }) => Promise<void>;
  updateType: (id: number, updatedType: { label: string }) => Promise<void>;
  deleteType: (id: number) => Promise<void>;
};

export const useTypes = create<TypesStore>((set) => ({
  types: null,
  type: null,
  fetchTypes: async () => {
    try {
      const response = await axiosInstance.get("/types");

      set({ types: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchType: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/types/${id}`);

      set({ type: null });
      set({ type: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  addType: async (newType: { label: string }) => {
    try {
      const response = await axiosInstance.post("/types", newType);

      set((state) => ({
        types: [...(state.types || []), response.data],
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateType: async (id: number, updatedType: { label: string }) => {
    try {
      const response = await axiosInstance.patch(`/types/${id}`, updatedType);

      set((state) => ({
        types: state.types?.map((type) =>
          type.id === id ? response.data : type,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  deleteType: async (id: number) => {
    try {
      await axiosInstance.delete(`/types/${id}`);

      set((state) => ({
        types: state.types?.filter((type) => type.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
