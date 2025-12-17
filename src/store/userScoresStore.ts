import { create } from "zustand";
import { IUserScoreView } from "../interfaces/IUserScoreView";

type UserScoresStore = {
  userScores: IUserScoreView[];
};

export const useUserScoresStore = create<UserScoresStore>((set) => ({
  userScores: [],
}));
