import { useEffect, useState } from "react";
import { FILTERNAME } from "../interfaces/Enums";
import {
  applyBeatmapStarRatingFilter,
  applyCompletionFilter,
  applyUserMissCountFilter,
  applyUserRankFilter,
} from "../modules/Filters";
import { useBeatmapsetsStore } from "../store/beatmapsetsStore";
import { Filter } from "../interfaces/Types";
import { useProfileId } from "./useProfileId";
import { useUserSelectStore } from "../store/store";

export const useBeatmapsetsView = () => {
  const [beatmapsetsView, setBeatmapsetsView] = useState<any[]>([]);
  const userId = useProfileId();
  const beatmapsets = useBeatmapsetsStore((state) => state.beatmapsets);
  const filters = useBeatmapsetsStore((state) => state.filters);
  const userScores = useBeatmapsetsStore((state) => state.userScores);
  const fetchUserScoresAsync = useBeatmapsetsStore(
    (state) => state.fetchUserScoresAsync
  );
  const clearUserScores = useBeatmapsetsStore((state) => state.clearUserScores);
  const beatmaps = useBeatmapsetsStore((state) => state.beatmaps);
  const fetchBeatmapsAsync = useBeatmapsetsStore(
    (state) => state.fetchBeatmapsAsync
  );
  const clearBeatmaps = useBeatmapsetsStore((state) => state.clearBeatmaps);

  const fetchBeatmapsetsAsync = useBeatmapsetsStore(
    (state) => state.fetchBeatmapsetsAsync
  );

  const containsUserFilters = (filters: Filter[]) => {
    return filters.some(
      (x) => x.name === FILTERNAME.MISSCOUNT || x.name === FILTERNAME.RANK
    );
  };

  const containsBeatmapFilters = (filters: Filter[]) => {
    return filters.some((x) => x.name === FILTERNAME.STARRATING);
  };

  useEffect(() => {
    if (beatmapsets && beatmapsets[0]) {
      //this doesnt work, cause completion is returned from fetchBeatmapsAsync
      const gamemode = useUserSelectStore.getState().gamemode;
      const variant = useUserSelectStore.getState().variant;
      fetchBeatmapsetsAsync(gamemode, variant, userId);
    }
  }, [userId]);

  //check if only month has changed and if so, do not fetch scores again
  //TODO: this triggers even when no beatmaps are fetched - user may want to setup filters first and only then look up beatmaps... this has to be fixed
  useEffect(() => {
    if (containsUserFilters(filters)) {
      fetchUserScoresAsync(userId);
    } else {
      clearUserScores();
    }

    if (
      beatmapsets &&
      Array.isArray(beatmapsets) &&
      beatmapsets.length > 0 &&
      containsBeatmapFilters(filters)
    ) {
      fetchBeatmapsAsync();
    } else {
      clearBeatmaps();
    }
  }, [beatmapsets]);

  useEffect(() => {
    // console.log(filters);
    if (containsUserFilters(filters) && userScores.length === 0) {
      fetchUserScoresAsync(userId);
    }
    if (
      beatmapsets &&
      Array.isArray(beatmapsets) &&
      beatmapsets.length > 0 &&
      containsBeatmapFilters(filters) &&
      beatmaps.length === 0
    ) {
      fetchBeatmapsAsync();
    }
  }, [filters]);

  const applyFilters = (beatmapsets, userScores, filters) => {
    // console.log("filters in hook", filters);
    //TODO: if user has no scores in given year the user filters wont work (should return empty array?)
    // if (containsUserFilters(filters) && userScores.length === 0) {
    //   return beatmapsets;
    // }
    if (containsBeatmapFilters(filters) && beatmaps.length === 0) {
      return beatmapsets;
    }
    //TODO for now we assume that the userScores are present and matches beatmapsets
    const missCountFilter = filters.find(
      (x) => x.name === FILTERNAME.MISSCOUNT
    );
    const rankFilter = filters.find((x) => x.name === FILTERNAME.RANK);
    const completionFilter = filters.find(
      (x) => x.name === FILTERNAME.COMPLETION
    );
    const starRatingFilter = filters.find(
      (x) => x.name === FILTERNAME.STARRATING
    );

    //const beatmapsetsFilters
    let _beatmapsets = beatmapsets;
    if (completionFilter) {
      _beatmapsets = applyCompletionFilter(_beatmapsets, completionFilter);
    }

    //const userFilters
    let _userScores = userScores;
    if (_userScores && Array.isArray(userScores)) {
      if (rankFilter) {
        _userScores = applyUserRankFilter(rankFilter, _userScores);
      }
      if (missCountFilter) {
        _userScores = applyUserMissCountFilter(missCountFilter, _userScores);
      }
    }

    if (containsUserFilters(filters)) {
      _beatmapsets = _beatmapsets.filter((bs) =>
        _userScores.some((us) => us.beatmapset_id === bs.id)
      );
    }

    let _beatmaps = beatmaps;
    //const beatmap filters
    if (starRatingFilter) {
      _beatmaps = applyBeatmapStarRatingFilter(starRatingFilter, _beatmaps);
    }

    if (containsBeatmapFilters(filters)) {
      _beatmapsets = _beatmapsets.filter((bs) =>
        _beatmaps.some((btmap) => btmap.beatmapset_id === bs.id)
      );
    }

    return _beatmapsets;
  };

  const result = applyFilters(beatmapsets, userScores, filters);

  return result;
};
