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

export const generateCollectionNode = async (
  userId: number | undefined,
  gamemode: GAMEMODE,
  variant: ScoresVariant,
  unplayedOnly: boolean,
  maxAmountOfMaps: number,
  groupBy: string,
  filters: Filter[],
  year: number | undefined = undefined,
  month: number | undefined = undefined,
  exportFormat: string
) => {
  try {
    let url = new URL(
      "/generateCollection",
      process.env.REACT_APP_BASE_API_URL
    );
    url.searchParams.append("gamemode", gamemode);
    url.searchParams.append("variant", variant.toString());
    url.searchParams.append("unplayedOnly", unplayedOnly ? "1" : "0");
    //TODO: check if integer pls
    if (Number.isInteger(maxAmountOfMaps)) {
      url.searchParams.append("maxAmountOfMaps", maxAmountOfMaps.toString());
    }
    url.searchParams.append("groupBy", groupBy);

    //filters
    url.searchParams.append("filters", JSON.stringify(filters));

    //TODO: add only if selected
    if (Number.isInteger(year)) {
      url.searchParams.append("year", year.toString());
    }
    if (Number.isInteger(month)) {
      url.searchParams.append("month", month.toString());
    }
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
      // console.log(resp);
      const blob = await resp.blob();
      // console.log("collection", blob);
      triggerDownload(blob, `collection${exportFormat ?? ".db"}`);
    }
  } catch (err) {
    throw err;
  }
};
