import { create } from "zustand";
import { getUserCompletionNode } from "../service/UserService";
import { GAMEMODE } from "../interfaces/Types";
import { ScoresVariant } from "../interfaces/Enums";

type UserCompletionStore = {
  userCompletions: { completions: any; mapsTotal: number; playedTotal: number };
  getUserCompletionAsync: (
    userId: number,
    gamemode: GAMEMODE,
    variant: ScoresVariant
  ) => Promise<void>;
};

export const useUserCompletionStore = create<UserCompletionStore>(
  (set, get) => ({
    userCompletions: { completions: null, mapsTotal: 0, playedTotal: 0 },
    getUserCompletionAsync: async (
      userId: number,
      gamemode: GAMEMODE,
      variant: ScoresVariant
    ) => {
      const userCompletions = await getUserCompletionAsync(
        userId,
        gamemode,
        variant
      );

      let mapsTotal = 0;
      let playedTotal = 0;
      Object.keys(userCompletions?.completions ?? {})?.map((item, i) => {
        mapsTotal += parseInt(userCompletions.completions[item].total);
        playedTotal += parseInt(userCompletions.completions[item].completed);
      });

      set((state) => ({
        userCompletions: {
          completions: userCompletions?.completions,
          mapsTotal: mapsTotal,
          playedTotal: playedTotal,
        },
      }));
    },
  })
);

const getUserCompletionAsync = async (
  userId: number,
  gamemode: GAMEMODE,
  variant: ScoresVariant
) => {
  const completions = await getUserCompletionNode(userId, gamemode, variant);

  return completions;
};
