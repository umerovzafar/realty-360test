import axios from "axios";

import { create } from "zustand";

import type { Floor } from "../_types";

const axiosInstance = axios.create({
  baseURL: "https://gurulab-kids.uz/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

type FloorsStore = {
  floors: Floor[] | null;
  floor: Floor | null;
  fetchFloors: () => Promise<void>;
  fetchFloor: (id: number) => Promise<void>;
  addFloor: (newFloor: { label: string }) => Promise<void>;
  updateFloor: (id: number, updatedFloor: { label: string }) => Promise<void>;
  deleteFloor: (id: number) => Promise<void>;
};

export const useFloors = create<FloorsStore>((set) => ({
  floors: null,
  floor: null,
  fetchFloors: async () => {
    try {
      const response = await axiosInstance.get("/floors");

      set({ floors: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchFloor: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/floors/${id}`);

      set({ floor: null });
      set({ floor: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  addFloor: async (newFloor: { label: string }) => {
    try {
      const response = await axiosInstance.post("/floors", newFloor);

      set((state) => ({
        floors: [...(state.floors || []), response.data],
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateFloor: async (id: number, updatedFloor: { label: string }) => {
    try {
      const response = await axiosInstance.patch(`/floors/${id}`, updatedFloor);

      set((state) => ({
        floors: state.floors?.map((floor) =>
          floor.id === id ? response.data : floor,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  deleteFloor: async (id: number) => {
    try {
      await axiosInstance.delete(`/floors/${id}`);

      set((state) => ({
        floors: state.floors?.filter((floor) => floor.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
