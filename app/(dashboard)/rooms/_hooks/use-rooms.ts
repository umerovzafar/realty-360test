import axios from "axios";

import { create } from "zustand";

import type { Room } from "../_types";

const axiosInstance = axios.create({
  baseURL: "https://gurulab-kids.uz/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

type RoomsStore = {
  rooms: Room[] | null;
  room: Room | null;
  fetchRooms: () => Promise<void>;
  fetchRoom: (id: number) => Promise<void>;
  addRoom: (newRoom: { label: string }) => Promise<void>;
  updateRoom: (id: number, updatedRoom: { label: string }) => Promise<void>;
  deleteRoom: (id: number) => Promise<void>;
};

export const useRooms = create<RoomsStore>((set) => ({
  rooms: null,
  room: null,
  fetchRooms: async () => {
    try {
      const response = await axiosInstance.get("/rooms");

      set({ rooms: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchRoom: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/rooms/${id}`);

      set({ room: null });
      set({ room: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  addRoom: async (newRoom: { label: string }) => {
    try {
      const response = await axiosInstance.post("/rooms", newRoom);

      set((state) => ({
        rooms: [...(state.rooms || []), response.data],
      }));
    } catch (error) {
      console.log(error);
    }
  },
  updateRoom: async (id: number, updatedRoom: { label: string }) => {
    try {
      const response = await axiosInstance.patch(`/rooms/${id}`, updatedRoom);

      set((state) => ({
        rooms: state.rooms?.map((room) =>
          room.id === id ? response.data : room,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  deleteRoom: async (id: number) => {
    try {
      await axiosInstance.delete(`/rooms/${id}`);

      set((state) => ({
        rooms: state.rooms?.filter((room) => room.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
