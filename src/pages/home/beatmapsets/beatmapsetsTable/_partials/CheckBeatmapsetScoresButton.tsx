import { useShallow } from "zustand/react/shallow";
import { useProfileId } from "../../../../../hooks/useProfileId";
import { getFirstBeatmapsetBeatmapIdNode } from "../../../../../service/BeatmapsService";
import { useUserStore } from "../../../../../store/userStore";
import { fetchUserScoresOnBeatmapsetNode } from "../../../../../service/UserService";
import { useUserSelectStore } from "../../../../../store/store";
import { useState } from "react";

//TODO
const CheckBeatmapsetScoresButton = (props: { beatmapsetId: number }) => {
  const profileId = useProfileId();
  const isLoggedIn = useUserStore(useShallow((state) => state.isLoggedIn));
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const checkBeatmapsetScores = async (beatmapsetId: number) => {
    if (!profileId) {
      return;
    }
    setIsFetching(true);
    try {
      const result = await fetchUserScoresOnBeatmapsetNode(
        beatmapsetId,
        profileId,
        useUserStore.getState().authToken,
        useUserSelectStore.getState().gamemode
      );
      if (result.error) {
        alert("error checking scores!");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <button
      className="btn"
      disabled={!isLoggedIn || isFetching}
      onClick={() => checkBeatmapsetScores(props.beatmapsetId)}
      style={{
        color: "white",
        width: "100%",
        backgroundColor: `var(--bs-secondary)`,
      }}
    >
      {isFetching ? "Checking..." : "Check"}
    </button>
  );
};

export default CheckBeatmapsetScoresButton;
