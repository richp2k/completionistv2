import { useState } from "react";
import MonthSelect from "./_partials/MonthSelect";
import YearSelect from "./_partials/YearSelect";
import BeatmapsetsFilters from "../beatmapsetsFilters/BeatmapsetsFilters";
import ExportBeatmapsetsWithScores from "../../../../components/ExportBeatmapsetsWithScores";
import { useBeatmapsetsStore } from "../../../../store/beatmapsetsStore";
import { useUserSelectStore } from "../../../../store/store";
import { useProfileId } from "../../../../hooks/useProfileId";
import CheckOtherPlayer from "../../../../components/CheckOtherPlayer";

const UserSelection = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const userId = useProfileId();
  const _fetchBeatmapsetsAsync = useBeatmapsetsStore(
    (state) => state.fetchBeatmapsetsAsync
  );

  const fetchBeatmapsetsAsync = async () => {
    const gamemode = useUserSelectStore.getState().gamemode;
    const variant = useUserSelectStore.getState().variant;
    _fetchBeatmapsetsAsync(gamemode, variant, userId);
  };

  return (
    <div>
      <div className="d-flex justify-content-center my-2">
        <YearSelect />
        <MonthSelect />
        <button
          className="btn btn-primary my-2 mx-2"
          onClick={() => fetchBeatmapsetsAsync()}
        >
          Confirm
        </button>
      </div>
      <div className="main-page_menu-wrapper">
        <div className="d-flex justify-content-center my-2">
          <button
            className="btn btn-primary"
            onClick={() => setShowFilters((x) => !x)}
          >
            Filters
          </button>
        </div>
      </div>

      <div className={"" + (showFilters ? "" : " collapse")}>
        <BeatmapsetsFilters />
      </div>
    </div>
  );
};

export default UserSelection;
