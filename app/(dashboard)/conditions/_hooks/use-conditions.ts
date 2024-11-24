import axios from "axios";

import { create } from "zustand";

import type { Condition } from "../_types";

const axiosInstance = axios.create({
  baseURL: "https://gurulab-kids.uz/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

type ConditionsStore = {
  conditions: Condition[] | null;
  condition: Condition | null;
  fetchConditions: () => Promise<void>;
  fetchCondition: (id: number) => Promise<void>;
  addCondition: (newCondition: { label: string }) => Promise<void>;
  updateCondition: (
    id: number,
    updatedCondition: { label: string },
  ) => Promise<void>;
  deleteCondition: (id: number) => Promise<void>;
};

export const useConditions = create<ConditionsStore>((set) => ({
  conditions: null,
  condition: null,
  fetchConditions: async () => {
    try {
      const response = await axiosInstance.get("/conditions");

      set({ conditions: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchCondition: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/conditions/${id}`);

      set({ condition: null });
      set({ condition: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  addCondition: async (newCondition: { label: string }) => {
    try {
      const response = await axiosInstance.post("/conditions", newCondition);

      set((state) => ({
        conditions: [...(state.conditions || []), response.data],
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateCondition: async (id: number, updatedCondition: { label: string }) => {
    try {
      const response = await axiosInstance.patch(
        `/conditions/${id}`,
        updatedCondition,
      );

      set((state) => ({
        conditions: state.conditions?.map((condition) =>
          condition.id === id ? response.data : condition,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  deleteCondition: async (id: number) => {
    try {
      await axiosInstance.delete(`/conditions/${id}`);

      set((state) => ({
        conditions: state.conditions?.filter(
          (condition) => condition.id !== id,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
