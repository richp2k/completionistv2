import { useState } from "react";
import GamemodeSelect from "../home/sidePanel/_components/_partials/GamemodeSelect";
import { getUserScoresByRankNode } from "../../service/BeatmapsService";
import ScoreVariantSelect from "../../components/ScoreVariantSelect";
import { ScoresVariant } from "../../interfaces/Enums";
import { useUserSelectStore } from "../../store/store";
import { useUserStore } from "../../store/userStore";

const ByRankAchieved = () => {
  const userStore = useUserStore();
  const selectedGamemode = useUserSelectStore((state) => state.gamemode);
  const [variant, setVariant] = useState<ScoresVariant>(ScoresVariant.ALL);
  const [userScoresByRank, setUserScoresByRank] = useState(undefined);

  const getUserScoresByRank = async () => {
    if (!userStore.userId) {
      alert("login first!");
      return;
    }
    const result = await getUserScoresByRankNode(
      userStore.userId,
      selectedGamemode,
      variant
    );
    if (!result) {
      alert("couldnt fetch scores TwT");
      return;
    }
    setUserScoresByRank(result);
  };

  const countTotal = (rank: string) => {
    return userScoresByRank.reduce(
      (acc, curr) => acc + (curr.scores[rank] ?? 0),
      0
    );
  };

  return (
    <div
      className="card card-body"
      style={{
        backgroundColor: `rgba(128, 128, 128, 0.2)`,
        width: "fit-content",
      }}
    >
      <GamemodeSelect disabled={variant === ScoresVariant.ALL} />
      <ScoreVariantSelect variant={variant} setVariant={setVariant} />
      <button
        className="btn btn-primary my-3"
        style={{ margin: "auto" }}
        onClick={getUserScoresByRank}
      >
        List all scores by rank
      </button>
      {userScoresByRank && (
        <table
          className="dark-table table-default"
          style={{ margin: "auto", border: "1px solid black" }}
        >
          <thead>
            <tr>
              <td className="year">Year</td>
              <td className="ss">SS</td>
              <td className="s">S</td>
              <td className="a">A</td>
              <td className="b">B</td>
              <td className="c">C</td>
              <td className="d">D</td>
            </tr>
          </thead>
          <tbody>
            {userScoresByRank.map((x) => (
              <tr>
                <td>{x.year}</td>
                <td className="ss">{x.scores.SS ?? 0}</td>
                <td className="s">{x.scores.S ?? 0}</td>
                <td className="a">{x.scores.A ?? 0}</td>
                <td className="b">{x.scores.B ?? 0}</td>
                <td className="c">{x.scores.C ?? 0}</td>
                <td className="d">{x.scores.D ?? 0}</td>
              </tr>
            ))}
            <tr style={{ borderTop: "1px solid black" }}>
              <td>Total</td>
              <td>{countTotal("SS")}</td>
              <td>{countTotal("S")}</td>
              <td>{countTotal("A")}</td>
              <td>{countTotal("B")}</td>
              <td>{countTotal("C")}</td>
              <td>{countTotal("D")}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ByRankAchieved;
