import { create } from "zustand";
import { GAMEMODE } from "../interfaces/Types";
import { ScoresVariant } from "../interfaces/Enums";

type UserSelectStore = {
  gamemode: GAMEMODE;
  //obsolete
  convertsOnly: boolean;
  variant: ScoresVariant;
  setGamemode: (newGamemode: GAMEMODE) => void;
  setVariant: (value: ScoresVariant) => void;
};

export const useUserSelectStore = create<UserSelectStore>((set) => ({
  gamemode: GAMEMODE.OSU,
  convertsOnly: false,
  variant: ScoresVariant.SPECIFIC,
  setGamemode: (newGamemode: GAMEMODE) => {
    set({ gamemode: newGamemode });
  },
  setVariant: (value: ScoresVariant) => {
    set((state) => ({ variant: value }));
  },
}));
