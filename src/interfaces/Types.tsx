import { FILTERNAME } from "./Enums";

export enum GAMEMODE {
  OSU = "osu",
  CATCH = "fruits",
  MANIA = "mania",
  TAIKO = "taiko",
}

export type FilterValue = {
  name?: string;
  value: any;
};

export type Filter = {
  name: FILTERNAME;
  values: FilterValue[];
};

export type CompareFilterValue = {
  name: "operator" | "val1" | "val2";
  value: any;
};

export type MissCountFilterValue = {
  name: "operator" | "val1" | "val2";
  value: any;
};
