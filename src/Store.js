import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      addUser: (user) => {
        set(() => ({
          user: user,
        }));
      },
    }),
    {
      name: "question-answer-storage",
    }
  )
);
