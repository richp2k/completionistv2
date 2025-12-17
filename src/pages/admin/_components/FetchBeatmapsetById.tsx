import { useState } from "react";
import {
  fetchBeatmapsetById,
  fetchBeatmapsets,
} from "../../../service/BeatmapsService";
import { useUserStore } from "../../../store/userStore";
import { useShallow } from "zustand/react/shallow";

const FetchBeatmapsetById = () => {
  const authToken = useUserStore(useShallow((state) => state.authToken));
  const [beatmapsetId, setBeatmapsetId] = useState<number>(0);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isSuccessful, setIsSuccessful] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchBeatmapsetByIdFromOsuApi = async () => {
    if (authToken === undefined) {
      alert("authorize first!");
      setIsFetching(false);
      return;
    }

    if (!beatmapsetId) {
      alert("set beatmapsetID first!");
      setIsFetching(false);
      return;
    }

    setIsFetching(true);

    try {
      const resp = await fetchBeatmapsetById(authToken, beatmapsetId);
      setResponseMessage(resp.message);
      setIsSuccessful(resp.isSuccess);
    } catch {
      setResponseMessage("UnexpectedError");
      setIsSuccessful(false);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div>
      <div className="main-page_menu-element">
        <button
          className="btn btn-primary"
          disabled={authToken === undefined || isFetching === true}
          onClick={fetchBeatmapsetByIdFromOsuApi}
        >
          Fetch beatmapset by id
        </button>
      </div>
      <div>
        <input
          name="admin-beatmapsetID"
          type="number"
          onChange={(e) => {
            const newValue = Number(e.currentTarget.value);
            if (!Number.isNaN(newValue)) {
              setBeatmapsetId(newValue);
            } else {
              setBeatmapsetId(0);
            }
          }}
        />
        <label htmlFor="admin-beatmapsetID" style={{ color: "white" }}>
          Beatmapset ID
        </label>
      </div>
      <p style={{ color: "white" }}>
        response: {responseMessage}
        <br />
        isSuccessful: {isSuccessful ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default FetchBeatmapsetById;
