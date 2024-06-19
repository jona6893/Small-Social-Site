import { create } from "zustand";
const feedStore = create((set) => ({
  feedList: [],
  setFeedList: (newFeedList) => set({ feedList: newFeedList }),
}));

export { feedStore };
