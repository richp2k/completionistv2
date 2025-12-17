export interface IBeatmapExtended {
  id: number; //int
  beatmapset_id: number; //int
  version: string;
  convert: boolean;
  mode_int: number; //int
  difficulty_rating: number; //float
  total_length: number; //int - song time or something
  hit_length: number; //int - drain TIME
  accuracy: number; //float - actually OD
  ar: number; //float
  cs: number; //float
  drain: number; //float - actually HP
  max_combo: number; //int
  bpm?: number; //float
  completed?: boolean | undefined;
}
