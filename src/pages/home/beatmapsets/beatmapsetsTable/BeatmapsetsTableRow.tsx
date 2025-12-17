import { useState } from "react";
import { IBeatmapsetView } from "../../../../interfaces/IBeatmapsetView";
import { IBeatmapView } from "../../../../interfaces/IBeatmapView";
import BeatmapTable from "./BeatmapTable";
import { getBeatmapsForBeatmapsetNode } from "../../../../service/BeatmapsService";
import { COMPLETION } from "../../../../interfaces/Enums";
import OsuDirectButton from "./_partials/OsuDirectButton";
import DownloadBeatmapsetButton from "./_partials/DownloadBeatmapsetButton";
import { useUserSelectStore } from "../../../../store/store";
import { useShallow } from "zustand/react/shallow";
import CheckBeatmapsetScoresButton from "./_partials/CheckBeatmapsetScoresButton";

const BeatmapsetsTableRow = (props: {
  beatmapset: IBeatmapsetView | undefined;
}) => {
  const [beatmaps, setBeatmaps] = useState<IBeatmapView[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleRowClick = async (e: any, beatmapset: IBeatmapsetView) => {
    if (isExpanded) {
      setIsExpanded(false);
      return;
    }
    if (
      //TODO check if variant has changed
      !beatmapset.beatmaps &&
      !beatmaps.some((x) => x.beatmapset_id === beatmapset.id)
    ) {
      const newBeatmaps = await getBeatmapsForBeatmapsetNode(
        beatmapset.id,
        useUserSelectStore.getState().gamemode,
        useUserSelectStore.getState().variant.toString()
      );
      setBeatmaps(newBeatmaps);
    }
    setIsExpanded(true);
  };

  const completion = (
    <td
      className={
        props.beatmapset.completed === COMPLETION.COMPLETED
          ? "beatmap-table-complete"
          : props.beatmapset.completed === COMPLETION.PARTIAL
          ? "beatmap-table-partial"
          : "beatmap-table-unplayed"
      }
    >
      {props.beatmapset.completed === COMPLETION.COMPLETED
        ? "Completed"
        : props.beatmapset.completed === COMPLETION.PARTIAL
        ? "Partial"
        : "Unplayed"}
    </td>
  );

  return (
    <>
      <tr
        key={props.beatmapset.id}
        onClick={(e) => handleRowClick(e, props.beatmapset)}
      >
        <td>
          {props.beatmapset.artist} - {props.beatmapset.title}
        </td>
        {completion}
        <td>{props.beatmapset.ranked_date}</td>
        <td onClick={(e) => e.stopPropagation()}>
          <DownloadBeatmapsetButton beatmapsetId={props.beatmapset.id} />
        </td>
        <td onClick={(e) => e.stopPropagation()}>
          <OsuDirectButton beatmapsetId={props.beatmapset.id} />
        </td>
        <td onClick={(e) => e.stopPropagation()}>
          <CheckBeatmapsetScoresButton beatmapsetId={props.beatmapset.id} />
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={7} className="bg-secondary" style={{ padding: 0 }}>
            <BeatmapTable
              beatmaps={props.beatmapset.beatmaps ?? beatmaps}
              beatmapsetId={props.beatmapset.id}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default BeatmapsetsTableRow;
