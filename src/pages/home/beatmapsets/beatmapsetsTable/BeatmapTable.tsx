import { useEffect, useState } from "react";
import { IBeatmapView } from "../../../../interfaces/IBeatmapView";
import { IUserScoreView } from "../../../../interfaces/IUserScoreView";
import { getUserScoresOnBeatmapsetNode } from "../../../../service/UserService";
import { useUserStore } from "../../../../store/userStore";
import { useBeatmapsetsStore } from "../../../../store/beatmapsetsStore";
import { useProfileId } from "../../../../hooks/useProfileId";
import { useUserSelectStore } from "../../../../store/store";

const BeatmapTable = (props: {
  beatmapsetId: number;
  beatmaps: IBeatmapView[] | undefined;
}) => {
  const [userScores, setUserScores] = useState<IUserScoreView[] | undefined>(
    undefined
  );

  const profileId = useProfileId();

  useEffect(() => {
    if (
      !props.beatmaps ||
      !props.beatmaps[0] ||
      (userScores && userScores[0])
    ) {
      return;
    }
    if (profileId) {
      fetchUserScoresForBeatmapset(profileId, props.beatmapsetId);
    }
  }, [props.beatmaps, profileId]);

  const fetchUserScoresForBeatmapset = async (
    userId: number,
    beatmapsetId: number
  ) => {
    //TODO may be inconsistent with current table results, but like uhh
    const gamemode = useUserSelectStore.getState().gamemode;
    const scores = await getUserScoresOnBeatmapsetNode(
      userId!,
      beatmapsetId,
      gamemode
    );
    setUserScores(scores!);
  };

  return (
    <table className="table-default beatmap-table-subtable">
      <thead>
        <tr>
          <td>Difficulty</td>
          <td>Rank</td>
          <td>Accuracy</td>
          <td>Miss count</td>
          <td>Mods</td>
          <td>Completion</td>
          <td>Date played</td>
        </tr>
      </thead>
      <tbody>
        {props.beatmaps?.map((y) => {
          const userScoresMap = userScores?.filter(
            (score) => score.beatmap_id === y.id
          )!;
          let userScore = null;
          if (userScoresMap && userScoresMap[0]) {
            userScore = userScoresMap?.reduce((max, score) =>
              max.score > score.score ? max : score
            );
          }
          return (
            <tr key={y.id}>
              <td>{y.version}</td>
              <td>
                {/* TODO format score in some util or smth */}
                {userScore?.rank === "S" && userScore.accuracy === 1
                  ? "SS"
                  : userScore?.rank === "SH" && userScore.accuracy === 1
                  ? "SS"
                  : userScore?.rank}
              </td>
              <td>
                {userScore?.accuracy
                  ? `${(userScore?.accuracy * 100).toFixed(2)}%`
                  : ""}
              </td>
              <td>{userScore?.statistics_count_miss}</td>
              <td>{userScore?.mods?.map((x) => `${x.mod} `)}</td>
              <td
                className={
                  userScore
                    ? "beatmap-table-complete"
                    : "beatmap-table-unplayed"
                }
              >
                {userScore ? "Completed" : "Unplayed"}
              </td>
              <td>{userScore?.created_at}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BeatmapTable;
