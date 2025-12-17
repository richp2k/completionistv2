import BeatmapsetsTable from "./beatmapsetsTable/BeatmapsetsTable";
import ExportBeatmapsetsWithScores from "../../../components/ExportBeatmapsetsWithScores";
import UserSelection from "./userSelection/UserSelection";

const HomeBeatmapsets = () => {
  return (
    <div className="col-9 no-gutters" style={{ borderLeft: "5px solid gray" }}>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark mainpage-padding"
        style={{ margin: "auto" }}
      >
        <ExportBeatmapsetsWithScores />
        <UserSelection />
        <BeatmapsetsTable />
      </div>
    </div>
  );
};

export default HomeBeatmapsets;
