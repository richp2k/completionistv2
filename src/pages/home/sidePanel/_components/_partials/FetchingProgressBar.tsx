import { useEffect, useState } from "react";
import { useScoreFetchingStore } from "../../../../../store/scoreFetchingStore";

const FetchingProgressBar = () => {
  const checkedBeatmapsCount = useScoreFetchingStore(
    (state) => state.checkedBeatmapCount
  );
  const beatmapCountToCheck = useScoreFetchingStore(
    (state) => state.beatmapCountToCheck
  );
  const [finished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (checkedBeatmapsCount >= beatmapCountToCheck) {
      setIsFinished(true);
    } else if (finished === true) {
      setIsFinished(false);
    }
  }, [checkedBeatmapsCount]);

  const estimatedRemaining =
    (beatmapCountToCheck - checkedBeatmapsCount) / 1000;

  return (
    <div className="mx-3" data-html2canvas-ignore="true">
      <div className="progress" style={{ height: 24 }}>
        <div
          className={
            "progress-bar" +
            (finished
              ? " bg-success"
              : " progress-bar-striped progress-bar-animated")
          }
          style={{
            width: `${(
              (checkedBeatmapsCount / beatmapCountToCheck) *
              100
            ).toFixed(0)}%`,
            height: 24,
            overflow: "visible",
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            padding: 5,
          }}
        >
          {checkedBeatmapsCount}/{beatmapCountToCheck} (
          {((checkedBeatmapsCount / beatmapCountToCheck) * 100).toFixed(2)}% )
        </div>
      </div>
      <p style={{ color: "white" }}>
        {estimatedRemaining <= 0
          ? "Completed!"
          : `Estimated time remaining: 
        ${estimatedRemaining} minutes.`}
      </p>
    </div>
  );
};

export default FetchingProgressBar;
