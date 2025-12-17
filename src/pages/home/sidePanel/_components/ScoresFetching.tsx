import { useShallow } from "zustand/react/shallow";
import { useScoreFetchingStore } from "../../../../store/scoreFetchingStore";
import { useUserStore } from "../../../../store/userStore";
import FetchingProgressBar from "./_partials/FetchingProgressBar";
import { useProfileId } from "../../../../hooks/useProfileId";
import { useUserSelectStore } from "../../../../store/store";
import OutlineQuestionMarkIcon from "../../../../components/Icons/OutlineQuestionMarkIcon";
import YearSelect from "./_partials/YearSelect";

const ScoresFetching = () => {
  const isLoggedIn = useUserStore(useShallow((state) => state.isLoggedIn));
  const isFetchingScores = useScoreFetchingStore(
    useShallow((state) => state.isFetchingScores)
  );
  const userId = useProfileId();

  const _fetchUserScores = useScoreFetchingStore(
    (state) => state.fetchUserScores
  );

  const fetchUserScores = () => {
    const gamemode = useUserSelectStore.getState().gamemode;
    const variant = useUserSelectStore.getState().variant;
    _fetchUserScores(userId, gamemode, variant);
  };

  return (
    // TODO: marginBottom is temporary solution so the fetching scores wouldnt just stick to the bottom of the page
    //decide what do later
    <div data-html2canvas-ignore="true" style={{ marginBottom: 200 }}>
      <h4 className="mx-3 text-white">
        Fetch scores:{" "}
        <span
          data-toggle="tooltip"
          data-placement="right"
          title={`Due to osu!api limitations you need to manually fetch scores for each beatmap.\n\nThese scores are then saved in completionist!db for usage on site.`}
        >
          <OutlineQuestionMarkIcon height={20} width={20} />
        </span>
      </h4>
      <div
        className="d-flex justify-content-center my-2"
        data-html2canvas-ignore="true"
      >
        {isFetchingScores && <FetchingProgressBar />}
      </div>
      <div
        className="d-flex justify-content-center"
        data-html2canvas-ignore="true"
      >
        <button
          className="btn btn-primary my-2"
          disabled={!isLoggedIn}
          onClick={() => fetchUserScores()}
        >
          Fetch user scores
        </button>
        <YearSelect />
      </div>
    </div>
  );
};

export default ScoresFetching;
