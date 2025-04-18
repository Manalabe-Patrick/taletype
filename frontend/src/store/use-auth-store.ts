import { create } from "zustand";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { handleApiError } from "../utils/error-handler.js";
import { axiosInstance } from "../lib/axios.ts";
import { UserFormData } from "../pages/signup-page.tsx";

type AuthStore = {
  socket: Socket | null;
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
  logout: () => void;
  login: (data: UserFormData) => void;
  signup: (data: UserFormData) => void;
  updateProfile: (data: User) => void;
  onlineUsers: string[];
};

export interface User {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: UserFormData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      handleApiError(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: UserFormData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      handleApiError(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      handleApiError(error);
    }
  },

  updateProfile: async (data: User) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      data.profilePic = res.data;
      set({ authUser: data });
      toast.success("Profile updated successfully");
    } catch (error) {
      handleApiError(error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
