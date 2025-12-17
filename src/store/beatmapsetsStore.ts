import { create } from "zustand";
import { IBeatmapsetView } from "../interfaces/IBeatmapsetView";
import { Filter, FilterValue, GAMEMODE } from "../interfaces/Types";
import {
  getBeatmapsetsForYearFullNode,
  getBeatmapsetsForYearNode,
  getBeatmapsNode,
} from "../service/BeatmapsService";
import { FILTERNAME, ScoresVariant } from "../interfaces/Enums";
import { IUserScoreView } from "../interfaces/IUserScoreView";
import { useUserStore } from "./userStore";
import {
  fetchBeatmapsetsForYear,
  fetchBeatmapsetsForYearFull,
} from "../misc/utils";
import {
  applyCompletionFilter,
  applyUserMissCountFilter,
  applyUserRankFilter,
} from "../modules/Filters";
import { getUserScoresForYearNode } from "../service/UserService";
import { IBeatmapView } from "../interfaces/IBeatmapView";
import { IBeatmapExtended } from "../interfaces/IBeatmapExtended";

type BeatmapsetsStore = {
  beatmapsets: IBeatmapsetView[];
  year: number | undefined;
  month: number | undefined;
  state:
    | {
        gamemode: GAMEMODE;
        variant: ScoresVariant;
        year: number | undefined;
        month: number | undefined;
      }
    | undefined;
  filters: Filter[];
  userScores: IUserScoreView[];
  beatmaps: IBeatmapExtended[];
  setYear: (value: number | undefined) => void;
  setMonth: (value: number | undefined) => void;
  addFilter: (filterName: FILTERNAME, values: FilterValue[]) => void;
  removeFilter: (filterName: FILTERNAME) => void;
  fetchBeatmapsetsAsync: (
    gamemode: GAMEMODE,
    variant: ScoresVariant,
    userId: number | undefined
  ) => Promise<void>;
  fetchUserScoresAsync: (userId: number) => Promise<void>;
  fetchBeatmapsAsync: () => Promise<void>;
  clearUserScores: () => void;
  clearBeatmaps: () => void;
};

export const useBeatmapsetsStore = create<BeatmapsetsStore>((set, get) => ({
  beatmapsets: [],
  year: undefined,
  month: undefined,
  state: undefined,
  filters: [],
  userScores: [],
  beatmaps: [],
  setYear: (value: number | undefined) => set((state) => ({ year: value })),
  setMonth: (value: number | undefined) => set((state) => ({ month: value })),
  addFilter: (filterName: FILTERNAME, values: FilterValue[]) =>
    set((state) => ({ filters: addFilter(state.filters, filterName, values) })),
  removeFilter: (filterName: FILTERNAME) =>
    set((state) => ({ filters: removeFilter(state.filters, filterName) })),
  fetchBeatmapsetsAsync: async (
    gamemode: GAMEMODE,
    variant: ScoresVariant,
    userId: number | undefined
  ) => {
    const newState = {
      gamemode: gamemode,
      variant: variant,
      year: get().year ?? 2007,
      month: get().month,
    };
    const beatmapsets = await fetchBeatmapsets(
      newState.gamemode,
      newState.variant,
      newState.year,
      newState.month,
      userId
    );
    set((state) => ({
      state: newState,
      beatmapsets: beatmapsets,
    }));
  },
  fetchUserScoresAsync: async (userId: number) => {
    const state = get().state;
    if (!state) {
      return;
    }
    const userScores = await fetchUserScores(
      userId,
      state.gamemode,
      state.variant,
      state.year ?? 2007,
      state.month
    );

    set((state) => ({ userScores: userScores }));
  },
  fetchBeatmapsAsync: async () => {
    const state = get().state;
    const beatmaps = await getBeatmapsNode(
      state.gamemode,
      state.variant,
      state.year
    );
    set((state) => ({ beatmaps: beatmaps }));
  },
  clearUserScores: () => set((state) => ({ userScores: [] })),
  clearBeatmaps: () => set((state) => ({ beatmaps: [] })),
}));

const addFilter = (
  filters: Filter[],
  filterName: FILTERNAME,
  values: FilterValue[]
) => {
  return [
    ...filters?.filter((x) => x.name !== filterName),
    {
      name: filterName,
      values: values,
    },
  ];
};

const removeFilter = (filters: Filter[], filterName: FILTERNAME) => {
  return [...filters?.filter((x) => x.name !== filterName)];
};

const fetchUserScores = (
  userId: number,
  gamemode: GAMEMODE,
  variant: ScoresVariant,
  year: number,
  month?: number
) => {
  const userScores = getUserScoresForYearNode(
    userId,
    gamemode,
    variant,
    year,
    month
  );
  return userScores;
};

// const applyFilters = async (
//   filters: Filter[],
//   beatmapsets: IBeatmapsetView[],
//   userScores: IUserScoreView[]
// ) => {
//   if (!beatmapsets) {
//     return;
//   }
//   let _beatmapsets = [...beatmapsets];
//   let _userScores = userScores;
//   const missCountFilter = filters.find((x) => x.name === FILTERNAME.MISSCOUNT);
//   const rankFilter = filters.find((x) => x.name === FILTERNAME.RANK);
//   const completionFilter = filters.find(
//     (x) => x.name === FILTERNAME.COMPLETION
//   );
//   //if filters required beatmaps and/or user scores - fetch them upfront
//   if ((rankFilter || missCountFilter) && !userScores) {
//     const beatmapsetsFull = await fetchBeatmapsetsForYearFull(
//       userId ?? userStore.userId!,
//       selectedGamemode,
//       beatmapsYearRef.current?.value,
//       beatmapsMonthRef.current?.value,
//       convertsOnly
//     );
//     setBeatmapsets(beatmapsetsFull);
//     return;
//   }
//   const userFilterBeatmapsets = (bs, us) =>
//     bs.filter((x) => us.some((y) => y.beatmapset_id === x.id));
//   //would be faster to check against user scores return them here and apply all the filters at the end...
//   if (rankFilter) {
//     _userScores = applyUserRankFilter(rankFilter, _userScores);
//     _beatmapsets = userFilterBeatmapsets(_beatmapsets, _userScores);
//   }
//   if (missCountFilter) {
//     _userScores = applyUserMissCountFilter(missCountFilter, _userScores);
//     _beatmapsets = userFilterBeatmapsets(_beatmapsets, _userScores);
//   }
//   if (completionFilter) {
//     _beatmapsets = applyCompletionFilter(_beatmapsets, completionFilter);
//   }
//   return _beatmapsets;
// };

const fetchBeatmapsets = async (
  gamemode: GAMEMODE,
  variant: ScoresVariant,
  year: number,
  month?: number,
  userId?: number
) => {
  let beatmapsets: any[] = [];
  const beatmapsYear = !Number.isInteger(Number(year)) ? 2007 : year;
  const beatmapsMonth = !Number.isInteger(Number(month)) ? null : month;

  beatmapsets = (await fetchBeatmapsetsForYear(
    gamemode,
    variant,
    beatmapsYear,
    beatmapsMonth,
    userId
  ))!;

  if (!beatmapsets) {
    return [];
  }

  return beatmapsets;
};
