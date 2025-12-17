import OutlineQuestionMarkIcon from "../../../../components/Icons/OutlineQuestionMarkIcon";
import { useBeatmapsetsView } from "../../../../hooks/useBeatmapsetsView";
import BeatmapsetsTableRow from "./BeatmapsetsTableRow";

const BeatmapsetsTable = () => {
  const beatmapsetsView = useBeatmapsetsView();

  return (
    <div className="d-flex justify-content-center my-2">
      <table className="beatmap-table table-default" style={{ width: "100%" }}>
        <thead>
          <tr>
            <td>Beatmap name</td>
            <td>Completion</td>
            <td>Ranked date</td>
            <td>Website</td>
            <td>Direct</td>
            <td>
              Check
              <span
                style={{
                  marginLeft: 10,
                  padding: "auto",
                }}
                data-toggle="tooltip"
                title={
                  "Fetch scores directly on beatmapset!\nYou'll need to collapse and expand row again to see changes."
                }
              >
                <OutlineQuestionMarkIcon
                  //TODO:
                  style={{ marginBottom: 3 }}
                  width={20}
                  height={20}
                />
              </span>
            </td>
          </tr>
        </thead>
        <tbody>
          {beatmapsetsView.map((x) => (
            <BeatmapsetsTableRow
              beatmapset={x}
              key={x.id ?? `btmapset_${Math.random()}`}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BeatmapsetsTable;
