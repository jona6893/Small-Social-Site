import { create } from "zustand";

const userStore = create((set) => ({
  userInfo: {},
  setUserInfo: (newUserInfo) => set({ userInfo: newUserInfo }),
}));

export {userStore}