import { ScoresVariant } from "../interfaces/Enums";
import { Filter, GAMEMODE } from "../interfaces/Types";

const triggerDownload = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const exportBeatmapsetsWithScoresDataNode = async (
  userId: number | undefined,
  gamemode: GAMEMODE,
  variant: ScoresVariant,
  groupBy: string
) => {
  try {
    let url = new URL(
      "/exportBeatmapsetsWithScores",
      process.env.REACT_APP_BASE_API_URL
    );
    url.searchParams.append("gamemode", gamemode);
    url.searchParams.append("variant", variant.toString());
    url.searchParams.append("groupBy", groupBy);
    if (userId !== undefined) {
      url.searchParams.append("userId", userId.toString());
    }

    let resp = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/octet-stream",
      },
    });
    if (resp.ok) {
      const blob = await resp.blob();
      triggerDownload(blob, `completionist_data.xlsx`);
    }
  } catch (err) {
    throw err;
  }
};
