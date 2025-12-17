import { COMPAREOPERATOR } from "../interfaces/Enums";
import { IBeatmapExtended } from "../interfaces/IBeatmapExtended";
import { IBeatmapsetView } from "../interfaces/IBeatmapsetView";
import { IBeatmapView } from "../interfaces/IBeatmapView";
import { IUserScoreView } from "../interfaces/IUserScoreView";
import { Filter, MissCountFilterValue } from "../interfaces/Types";

type ApplyFilterFunction = (
  beatmapsets: IBeatmapsetView[],
  filter: Filter,
  userScores?: IUserScoreView[]
) => IBeatmapsetView[];

type ApplyUserFilterFunction = (
  filter: Filter,
  userScores?: IUserScoreView[]
) => IUserScoreView[];

type ApplyBeatmapFilterFunction = (
  filter: Filter,
  beatmaps?: IBeatmapExtended[]
) => IBeatmapExtended[];

export const applyUserMissCountFilter: ApplyUserFilterFunction = (
  filter: Filter,
  userScores: IUserScoreView[]
) => {
  const filterValues = filter.values as MissCountFilterValue[];
  const operator = filterValues.find((x) => x.name === "operator")?.value;
  const val1 = filterValues.find((x) => x.name === "val1")?.value;
  const val2 = filterValues.find((x) => x.name === "val2")?.value;
  switch (operator) {
    case COMPAREOPERATOR.BETWEEN:
      return userScores?.filter(
        (x) => x.statistics_count_miss > val1 && x.statistics_count_miss < val2
      );

    case COMPAREOPERATOR.EQUALS:
      return userScores?.filter((x) => x.statistics_count_miss === val1);

    case COMPAREOPERATOR.GREATER:
      return userScores?.filter((x) => x.statistics_count_miss > val1);

    case COMPAREOPERATOR.LESS:
      return userScores?.filter((x) => x.statistics_count_miss < val1);
  }
};

export const applyUserRankFilter: ApplyUserFilterFunction = (
  filter: Filter,
  userScores: IUserScoreView[]
) => {
  const filterValues = filter.values;
  const filterValue = filterValues.find((x) => x.name === "value")?.value;
  return userScores?.filter((x) => x.rank === filterValue);
};

export const applyCompletionFilter: ApplyFilterFunction = (
  beatmapsets: IBeatmapsetView[],
  filter: Filter
) => {
  const filterValues = filter.values;
  const filterValue = Number(
    filterValues.find((x) => x.name === "value")?.value
  );
  return beatmapsets.filter((x) => x.completed === filterValue);
};

export const applyBeatmapStarRatingFilter: ApplyBeatmapFilterFunction = (
  filter: Filter,
  beatmaps: IBeatmapExtended[]
) => {
  const filterValues = filter.values as MissCountFilterValue[];
  const operator = filterValues.find((x) => x.name === "operator")?.value;
  const val1 = filterValues.find((x) => x.name === "val1")?.value;
  const val2 = filterValues.find((x) => x.name === "val2")?.value;
  switch (operator) {
    case COMPAREOPERATOR.BETWEEN:
      return beatmaps?.filter(
        (x) => x.difficulty_rating > val1 && x.difficulty_rating < val2
      );

    case COMPAREOPERATOR.EQUALS:
      return beatmaps?.filter((x) => x.difficulty_rating === val1);

    case COMPAREOPERATOR.GREATER:
      return beatmaps?.filter((x) => x.difficulty_rating > val1);

    case COMPAREOPERATOR.LESS:
      return beatmaps?.filter((x) => x.difficulty_rating < val1);
  }
};
