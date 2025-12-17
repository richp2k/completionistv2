import { useState } from "react";
import { fetchMissingBeatmapsAttrsNode } from "../../../service/BeatmapsService";
import { useUserStore } from "../../../store/userStore";
import { useShallow } from "zustand/react/shallow";

const FetchMissingBeatmapsAttrs = () => {
  const authToken = useUserStore(useShallow((state) => state.authToken));
  const [beatmapsToFetchCount, setBeatmapsToFetchCount] = useState<number>(0);
  const [fetchedBeatmapsetsCount, setFetchedBeatmapsetsCount] =
    useState<number>(0);
  const [ratelimitRemaining, setRateLimitRemaining] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const fetchMissingAttrs = async () => {
    if (authToken === undefined) {
      alert("authorize first!");
      setIsFetching(false);
      return;
    }

    const beatmapsetsPerRequest = 50;
    let totalMaps = 0;
    let fetchedMaps = 0;

    setErrorMessage(undefined);
    setIsFetching(true);
    while (true) {
      const response: any = await fetchMissingBeatmapsAttrsNode(authToken);
      if (!response) {
        setErrorMessage("unknown error/server failure");
        alert("failed fetching maps!");
        return;
      } else if (response.error) {
        console.log(response.error);
        setErrorMessage(response.error.toString());
        return;
      }
      if (beatmapsToFetchCount === 0) {
        setBeatmapsToFetchCount(response.total);
        totalMaps = response.total;
      }
      fetchedMaps += response.fetched;
      setFetchedBeatmapsetsCount(fetchedMaps);
      setRateLimitRemaining(response.ratelimitRemaining);
      if (response.ratelimitRemaining < 100) {
        await new Promise((r) => setTimeout(r, 60000));
      }
    }
  };

  return (
    <div>
      <div className="main-page_menu-element">
        <button
          className="btn btn-primary"
          disabled={authToken === undefined || isFetching === true}
          onClick={fetchMissingAttrs}
        >
          Fetch new beatmapsets from osu site
        </button>
      </div>
      <p style={{ color: "white" }}>
        Fetched {fetchedBeatmapsetsCount}/
        {beatmapsToFetchCount === 0 ? "?" : beatmapsToFetchCount} beatmapsets...
        <p style={{ color: "white" }}>
          Rate limit remaining: {ratelimitRemaining}
        </p>
        {errorMessage && (
          <p style={{ color: "white" }}>error occured: {errorMessage}</p>
        )}
      </p>
    </div>
  );
};

export default FetchMissingBeatmapsAttrs;
