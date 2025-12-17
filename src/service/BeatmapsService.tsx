import { IBeatmapsetDbModel } from "../interfaces/db/IBeatmapsetDbModel";
import { ScoresVariant } from "../interfaces/Enums";
import { IAuthToken } from "../interfaces/IAuthToken";
import { IBeatmapExtended } from "../interfaces/IBeatmapExtended";
import { IBeatmapsetView } from "../interfaces/IBeatmapsetView";
import { IBeatmapView } from "../interfaces/IBeatmapView";
import { GAMEMODE } from "../interfaces/Types";

//TODO just one endpoint and determine server side if userId is present duh
export const getBeatmapsetsForYearNode = async (
  gamemode: GAMEMODE | null = null,
  variant: ScoresVariant,
  year: number,
  month: number | null = null,
  userId: number | null = null
) => {
  try {
    let resp = await fetch(
      `${
        process.env.REACT_APP_BASE_API_URL
      }/getBeatmapsetsForYear?year=${year}${month ? `&month=${month}` : ""}${
        gamemode ? `&gamemode=${gamemode}` : ""
      }${userId ? `&userId=${userId}` : ""}${`&variant=${variant}`}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (resp.ok) {
      resp = await resp.json();
      return resp as unknown as IBeatmapsetView[];
    }
  } catch (err) {
    console.log("CANT FETCH BEATMAPS FROM NODE SERVER");
  }
};

export const getBeatmapsNode = async (
  gamemode: GAMEMODE | null = null,
  variant: ScoresVariant,
  year: number
) => {
  try {
    let resp = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/getBeatmaps?year=${year}${
        gamemode ? `&gamemode=${gamemode}` : ""
      }${`&variant=${variant}`}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (resp.ok) {
      resp = await resp.json();
      return resp as unknown as IBeatmapExtended[];
    }
  } catch (err) {
    console.log("CANT FETCH BEATMAPS FROM NODE SERVER");
  }
};

//used for score fetching
export const getBeatmapsIdsNode = async (
  gamemode: string,
  variant: ScoresVariant,
  year?: number
) => {
  try {
    // console.log("year", year, undefined);
    let resp = await fetch(
      `${
        process.env.REACT_APP_BASE_API_URL
      }/getBeatmapsIds?gamemode=${gamemode}&variant=${variant}${
        year ? `&year=${year}` : ""
      }`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (resp.ok) {
      resp = await resp.json();
      return resp as unknown as number[];
    }
  } catch (err) {
    console.log("CANT FETCH BEATMAPS FROM NODE SERVER");
  }
};

export const getBeatmapsForBeatmapsetNode = async (
  beatmapsetId: number,
  gamemode: string,
  variant: string
) => {
  try {
    let resp = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/getBeatmapsForBeatmapset?beatmapsetId=${beatmapsetId}&gamemode=${gamemode}&variant=${variant}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (resp.ok) {
      resp = await resp.json();
      return resp as unknown as IBeatmapView[];
    }
  } catch (err) {
    console.log("CANT FETCH BEATMAPS FROM NODE SERVER");
  }
};

//used for osu!direct download
export const getFirstBeatmapsetBeatmapIdNode = async (beatmapsetId: number) => {
  try {
    let resp = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/getFirstBeatmapsetBeatmapId?beatmapsetId=${beatmapsetId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (resp.ok) {
      const response = await resp.json();
      return response.id as number;
    }
  } catch (err) {
    console.log("CANT FETCH BEATMAPS FROM NODE SERVER");
  }
};

//TODO obsolote (fix it or remove)
export const getUserScoresByRankNode = async (
  userId: number,
  gamemode: string,
  variant: ScoresVariant
) => {
  try {
    let resp = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/getUserScoresByRank?userId=${userId}&gamemode=${gamemode}&variant=${variant}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (resp.ok) {
      const response = await resp.json();
      return response;
    }
  } catch (err) {
    console.log("CANT FETCH BEATMAPS FROM NODE SERVER");
  }
};

//used in export thingy
export const getBeatmapsetsForYearFullNode = async (
  year: number,
  month: number | null = null,
  selectedGamemode: string | null = null,
  userId: number,
  convertsOnly: boolean | null = null
) => {
  try {
    let resp = await fetch(
      `${
        process.env.REACT_APP_BASE_API_URL
      }/getBeatmapsetsForYearFull?year=${year}${
        month ? `&month=${month}` : ""
      }${selectedGamemode ? `&gamemode=${selectedGamemode}` : ""}${
        userId ? `&userId=${userId}` : ""
      }${convertsOnly === true ? `&convertsOnly=${convertsOnly}` : ""}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (resp.ok) {
      resp = await resp.json();
      return resp as unknown as IBeatmapsetView[];
    }
  } catch (err) {
    console.log("CANT FETCH BEATMAPS FROM NODE SERVER");
  }
};

// export const getAllBeatmapsNode = async (
//   selectedGamemode: string | null = null
// ) => {
//   try {
//     let resp = await fetch(
//       selectedGamemode
//         ? `${process.env.REACT_APP_BASE_API_URL}/getBeatmapsetsForYear?gamemode=${selectedGamemode}`
//         : `${process.env.REACT_APP_BASE_API_URL}/getBeatmapsetsForYear?`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (resp.ok) {
//       resp = await resp.json();
//       return resp as unknown as IBeatmapsetView[];
//     }
//   } catch (err) {
//     console.log("CANT FETCH BEATMAPS FROM NODE SERVER");
//   }
// };

export const fetchBeatmapsets = async (
  authToken: IAuthToken,
  cursor_string: string | null
) => {
  try {
    let resp = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/fetchBeatmapsets?authTokenString=${authToken.access_token}&cursorString=${cursor_string}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.access_token}`,
        },
      }
    );
    if (resp.ok) {
      const respJson = await resp.json();
      return {
        cursor_string: respJson.cursor_string,
        ratelimitRemaining: respJson.ratelimitRemaining,
        overlapCount: respJson.overlapCount,
        total: respJson.total,
        fetched: respJson.fetched,
      };
    }
  } catch (err) {
    console.log("CANT FETCH BEATMAPS FROM OSU WEBSITE");
  }
};

export const getAllBeatmapsetsIdsNode = async () => {
  try {
    let resp = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/getAllBeatmapsetsIdsFromDb`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (resp.ok) {
      resp = await resp.json();
      return resp as unknown as number[];
    }
  } catch (err) {
    console.log("CANT FETCH BEATMAPS FROM NODE SERVER");
  }
};

export const fetchBeatmapsetById = async (
  authToken: IAuthToken,
  beatmapsetId: number
) => {
  try {
    let resp = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/fetchBeatmapsetById?authTokenString=${authToken.access_token}&beatmapsetId=${beatmapsetId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.access_token}`,
        },
      }
    );
    if (resp.ok) {
      const respJson = await resp.json();
      return respJson;
    }
  } catch (err) {
    console.log("CANT FETCH BEATMAPS FROM OSU WEBSITE");
  }
};

export const fetchMissingBeatmapsAttrsNode = async (authToken: IAuthToken) => {
  try {
    //TODO: shouldnt be passed in url
    let resp = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/fetchMissingBeatmapsetsAttrs?authTokenString=${authToken.access_token}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.access_token}`,
        },
      }
    );
    if (resp.ok) {
      const respJson = await resp.json();
      return respJson;
    } else {
      return { error: "response not ok" };
    }
  } catch (err) {
    console.log("CANT FETCH BEATMAPS FROM OSU WEBSITE");
  }
};
