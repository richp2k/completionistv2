export enum ScoresVariant {
  ALL = 0,
  SPECIFIC = 1,
  CONVERT = 2,
  SPECIFICCONVERT = 3,
}

export enum COMPLETION {
  UNPLAYED = 0,
  PARTIAL = 1,
  COMPLETED = 2,
}

export enum COMPAREOPERATOR {
  GREATER = "gt",
  LESS = "lt",
  EQUALS = "eq",
  BETWEEN = "between",
}

export enum FILTERNAME {
  MISSCOUNT = "misscount",
  RANK = "rank",
  COMPLETION = "completion",
  STARRATING = "starrating",
}
