import axios from "axios";

import { create } from "zustand";

import type { Balcony } from "../_types";

const axiosInstance = axios.create({
  baseURL: "https://gurulab-kids.uz/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

type BalconiesStore = {
  balconies: Balcony[] | null;
  balcony: Balcony | null;
  fetchBalconies: () => Promise<void>;
  fetchBalcony: (id: number) => Promise<void>;
  addBalcony: (newBalcony: { label: string }) => Promise<void>;
  updateBalcony: (
    id: number,
    updatedBalcony: { label: string },
  ) => Promise<void>;
  deleteBalcony: (id: number) => Promise<void>;
};

export const useBalconies = create<BalconiesStore>((set) => ({
  balconies: null,
  balcony: null,
  fetchBalconies: async () => {
    try {
      const response = await axiosInstance.get("/balconies");

      set({ balconies: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchBalcony: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/balconies/${id}`);

      set({ balcony: null });
      set({ balcony: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  addBalcony: async (newBalcony: { label: string }) => {
    try {
      const response = await axiosInstance.post("/balconies", newBalcony);

      set((state) => ({
        balconies: [...(state.balconies || []), response.data],
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateBalcony: async (id: number, updatedBalcony: { label: string }) => {
    try {
      const response = await axiosInstance.patch(
        `/balconies/${id}`,
        updatedBalcony,
      );

      set((state) => ({
        balconies: state.balconies?.map((balcony) =>
          balcony.id === id ? response.data : balcony,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  deleteBalcony: async (id: number) => {
    try {
      await axiosInstance.delete(`/balconies/${id}`);

      set((state) => ({
        balconies: state.balconies?.filter((balcony) => balcony.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
