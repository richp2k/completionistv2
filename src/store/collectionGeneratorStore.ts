import { create } from "zustand";
import { getUserCompletionNode } from "../service/UserService";
import { Filter, FilterValue, GAMEMODE } from "../interfaces/Types";
import { FILTERNAME, ScoresVariant } from "../interfaces/Enums";
import { generateCollectionNode } from "../service/CollectionsService";

type CollectionGeneratorStore = {
  gamemode: GAMEMODE;
  variant: ScoresVariant;
  unplayedOnly: boolean;
  maxAmountOfMaps: number;
  maxAmountOfMapsCustomValue: number | undefined;
  sortBy: string;
  sortByDirection: string;
  groupBy: string;

  setGamemode: (newGamemode: GAMEMODE) => void;
  setVariant: (value: ScoresVariant) => void;
  setUnplayedOnly: (value: boolean) => void;
  setMaxAmountOfMaps: (value: number) => void;
  setMaxAmountOfMapsCustomValue: (value: number | string | undefined) => void;
  setSortBy: (value: string) => void;
  setSortByDirection: (value: string) => void;
  setGroupBy: (value: string) => void;

  year: number | undefined;
  month: number | undefined;
  setYear: (value: number | undefined) => void;
  setMonth: (value: number | undefined) => void;

  filters: Filter[];
  addFilter: (filterName: FILTERNAME, values: FilterValue[]) => void;
  removeFilter: (filterName: FILTERNAME) => void;

  isGenerating: boolean;
  generatingMessage: string;
  exportFormat: string;
  setExportFormat: (value: string) => void;

  getUserCompletionAsync: (
    userId: number,
    gamemode: GAMEMODE,
    variant: ScoresVariant
  ) => Promise<void>;

  generateCollectionFromSelection: (userId?: number) => Promise<void>;
};

export const useCollectionGeneratorStore = create<CollectionGeneratorStore>(
  (set, get) => ({
    gamemode: GAMEMODE.OSU,
    variant: ScoresVariant.SPECIFIC,
    unplayedOnly: true,
    maxAmountOfMaps: -1,
    maxAmountOfMapsCustomValue: undefined,
    sortBy: "Date",
    sortByDirection: "asc",
    groupBy: "Date",

    year: undefined,
    month: undefined,

    setGamemode: (newGamemode: GAMEMODE) => {
      set({ gamemode: newGamemode });
    },
    setVariant: (value: ScoresVariant) => {
      set((state) => ({ variant: value }));
    },
    setUnplayedOnly: (value: boolean) => {
      set({ unplayedOnly: value });
    },
    setMaxAmountOfMaps: (value: number) => {
      set({ maxAmountOfMaps: value });
    },
    setMaxAmountOfMapsCustomValue: (value: number | undefined) => {
      if (
        value === undefined ||
        Number.isNaN(value) ||
        !Number.isInteger(value)
      ) {
        // set({ maxAmountOfMapsCustomValue: undefined });
        return;
      }
      set({ maxAmountOfMapsCustomValue: value });
    },
    setSortBy: (value: string) => {
      set({ sortBy: value });
    },
    setSortByDirection: (value: string) => {
      set({ sortByDirection: value });
    },
    setGroupBy: (value: string) => {
      set({ groupBy: value });
    },

    //TODO: should this be really assigned like this?
    setYear: (value: number | undefined) => {
      set({ year: value ? Number(value) : undefined });
    },
    setMonth: (value: number | undefined) => {
      set({ month: value ? Number(value) : undefined });
    },

    filters: [],

    addFilter: (filterName: FILTERNAME, values: FilterValue[]) =>
      set((state) => ({
        filters: addFilter(state.filters, filterName, values),
      })),
    removeFilter: (filterName: FILTERNAME) =>
      set((state) => ({ filters: removeFilter(state.filters, filterName) })),

    isGenerating: false,
    generatingMessage: "",
    exportFormat: ".ccgp",
    setExportFormat: (value: string) => {
      set((state) => ({ exportFormat: value }));
    },

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

      //   set((state) => ({
      //     userCompletions: {
      //       completions: userCompletions?.completions,
      //       mapsTotal: mapsTotal,
      //       playedTotal: playedTotal,
      //     },
      //   }));
    },
    generateCollectionFromSelection: async (userId?: number) => {
      set((state) => ({ isGenerating: true }));
      set((state) => ({ generatingMessage: "Generating" }));
      const state = get();
      // console.log("state: ", state);
      //TODO: this should be more tidy with custom value
      try {
        await generateCollectionNode(
          userId,
          state.gamemode,
          state.variant,
          state.unplayedOnly,
          state.maxAmountOfMaps === -2
            ? state.maxAmountOfMapsCustomValue ?? -1
            : state.maxAmountOfMaps,
          state.groupBy,
          state.filters,
          state.year,
          state.month,
          state.exportFormat
        );
      } catch {
        set((state) => ({ generatingMessage: "Server error" }));
        set((state) => ({ isGenerating: false }));
        return;
      }
      set((state) => ({ generatingMessage: "" }));
      set((state) => ({ isGenerating: false }));
    },
  })
);

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

const getUserCompletionAsync = async (
  userId: number,
  gamemode: GAMEMODE,
  variant: ScoresVariant
) => {
  const completions = await getUserCompletionNode(userId, gamemode, variant);

  return completions;
};
