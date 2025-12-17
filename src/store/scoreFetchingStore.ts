import { create } from "zustand";
import { GAMEMODE } from "../interfaces/Types";
import { getBeatmapsIdsNode } from "../service/BeatmapsService";
import {
  fetchUserScoresOnBeatmapsNode,
  getUserScoresBeatmapIdsNode,
} from "../service/UserService";
import { useUserStore } from "./userStore";
import { useUserSelectStore } from "./store";
import { ScoresVariant } from "../interfaces/Enums";

type ScoreFetchingStore = {
  //TODO it would probably be nice to create substructure that holds fetching info in case someone changes gamemode or userId to avoid incorrect request being send and allow for things like pausing or something
  unplayedOnly: boolean;
  year: number | undefined;
  setYear: (value: number | undefined) => void;
  isFetchingScores: boolean;
  fetchingState:
    | {
        gamemode: GAMEMODE;
        unplayedOnly: boolean;
        variant: ScoresVariant;
        year: number | undefined;
        userId: number;
        beatmapsIdsToCheck: number[] | undefined;
      }
    | undefined;
  beatmapCountToCheck: number;
  checkedBeatmapCount: number;
  fetchUserScores: (
    userId: number,
    gamemode: GAMEMODE,
    variant: ScoresVariant
  ) => Promise<void>;
};

export const useScoreFetchingStore = create<ScoreFetchingStore>((set, get) => ({
  unplayedOnly: true,
  convertsOnly: false,
  year: undefined,
  isFetchingScores: false,
  fetchingState: undefined,
  beatmapCountToCheck: 0,
  checkedBeatmapCount: 0,
  setYear: (value: number | undefined) => set((state) => ({ year: value })),
  fetchUserScores: async (
    userId: number,
    gamemode: GAMEMODE,
    variant: ScoresVariant
  ) => {
    if (!useUserStore.getState().isLoggedIn) {
      alert("please log in first!");
      return;
    }
    let fetchingState = get().fetchingState;
    if (
      !fetchingState ||
      fetchingState.gamemode !== gamemode ||
      fetchingState.variant !== variant ||
      fetchingState.unplayedOnly !== get().unplayedOnly ||
      fetchingState.year !== get().year ||
      (userId && fetchingState.userId !== userId) ||
      fetchingState.beatmapsIdsToCheck.length === 0
    ) {
      const beatmapsIds = await getBeatmapsIdsToCheck(
        gamemode,
        variant,
        get().year,
        userId,
        get().unplayedOnly
      );
      //TODO check returned value
      fetchingState = {
        gamemode: gamemode,
        year: get().year,
        variant: variant,
        unplayedOnly: get().unplayedOnly,
        userId: userId,
        beatmapsIdsToCheck: beatmapsIds,
      };
      set((state) => ({
        beatmapCountToCheck: beatmapsIds.length,
        isFetchingScores: true,
        fetchingState: fetchingState,
      }));
    }

    //TODO move to actual fetching
    alert(
      `Fetching scores for userId ${fetchingState.userId} for gamemode ${
        fetchingState.gamemode
      } ${fetchingState.year ? ` for year ${fetchingState.year}` : ""} `
    );

    const sliceSize = 5;
    while (fetchingState.beatmapsIdsToCheck.length > 0) {
      const _sliceSize =
        sliceSize > fetchingState.beatmapsIdsToCheck.length
          ? fetchingState.beatmapsIdsToCheck.length
          : sliceSize;
      const beatmapsIdsSlice = fetchingState.beatmapsIdsToCheck.splice(
        0,
        _sliceSize
      );
      // console.log(beatmapsIdsSlice);
      //TODO check returned boolean to decide whatever we need to redo the thingy
      //actually better to do it in the function a few times
      const dupa = await checkUserScoresOnBeatmaps(
        fetchingState.userId,
        fetchingState.gamemode,
        beatmapsIdsSlice
      );
      set((state) => ({
        checkedBeatmapCount: (state.checkedBeatmapCount += _sliceSize),
      }));
    }
  },
}));

const getBeatmapsIdsToCheck = async (
  gamemode: GAMEMODE,
  variant: ScoresVariant,
  year: number | undefined,
  userId: number,
  unplayedOnly: boolean
) => {
  let beatmapsIds = await getBeatmapsIdsNode(gamemode, variant, year);

  if (unplayedOnly) {
    //TODO maybe fetch the scores either way in UserSCoresStore and just filter out beatmapIds from there?
    const userScoresBeatmapsIds = await getUserScoresBeatmapIdsNode(
      userId,
      gamemode,
      variant,
      year
    );

    beatmapsIds = beatmapsIds?.filter(
      (x) => !userScoresBeatmapsIds!.some((y) => y === x)
    );
  }

  return beatmapsIds;
};

const checkUserScoresOnBeatmaps = async (
  userId: number,
  gamemode: GAMEMODE,
  beatmapsIds: number[]
): Promise<boolean> => {
  const result = await fetchUserScoresOnBeatmapsNode(
    userId,
    useUserStore.getState().authToken?.access_token,
    gamemode ?? "osu",
    beatmapsIds
  );

  if (result.rateLimitRemaining === -1) {
    //repeat this iteration
    return false;
  }
  if (result.ratelimitRemaining < 30) {
    await new Promise((r) => setTimeout(r, 20000));
  } else if (result.ratelimitRemaining < 100) {
    await new Promise((r) => setTimeout(r, 11000));
  } else if (result.ratelimitRemaining < 200) {
    await new Promise((r) => setTimeout(r, 3000));
  }

  return true;
};
