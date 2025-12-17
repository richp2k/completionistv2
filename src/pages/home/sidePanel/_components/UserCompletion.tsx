import { useEffect } from "react";
import SaveScreenshot from "../../../../components/SaveScreenshot";
import { useUserSelectStore } from "../../../../store/store";
import { useUserCompletionStore } from "../../../../store/userCompletionStore";
import { useUserStore } from "../../../../store/userStore";
import { useProfileId } from "../../../../hooks/useProfileId";

const UserCompletion = () => {
  const userId = useProfileId();
  const gamemode = useUserSelectStore((state) => state.gamemode);
  const variant = useUserSelectStore((state) => state.variant);
  //add loader when fetching
  const userCompletions = useUserCompletionStore(
    (state) => state.userCompletions
  );
  const getUserCompletionAsync = useUserCompletionStore(
    (state) => state.getUserCompletionAsync
  );

  const _getUserCompletionAsync = async () => {
    if (userId) {
      getUserCompletionAsync(userId, gamemode, variant);
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    _getUserCompletionAsync();
  }, [userId, gamemode, variant]);

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
      <div className="d-flex">
        <h4>Completion: </h4>
        <SaveScreenshot />
      </div>

      <div className="d-flex flex-column my-2" data-html2canvas-ignore="true">
        <button
          className="btn btn-primary my-2"
          onClick={() => _getUserCompletionAsync()}
          disabled={!userId}
        >
          Refresh
        </button>
      </div>
      <ul className="list-group bg-secondary" style={{ overflow: "hidden" }}>
        {Object.keys(userCompletions?.completions ?? {})?.map((item, i) => {
          const completed = userCompletions.completions[item].completed;
          const total = userCompletions.completions[item].total;
          const x = completed / total;
          const r = (1.0 - x) * 1.0;
          const g = x * 1.0;
          const b = 0;
          const percentageCompleted = (x * 100).toFixed(2);
          const emptyYear = percentageCompleted === "NaN";

          return (
            <>
              <li
                className="list-group-item"
                style={{ margin: 0, padding: 0, border: 0 }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 10,
                  }}
                >
                  {item}
                </span>
                <span
                  style={{
                    position: "absolute",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {completed}/{total} ({percentageCompleted}%)
                </span>
                <div
                  className="progress"
                  style={{
                    height: 24,
                    borderRadius: 0,
                    backgroundColor: `var(--bs-secondary)`,
                  }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: `${emptyYear ? 100 : percentageCompleted}%`,
                      overflow: "visible",
                      backgroundColor: emptyYear
                        ? `var(--bs-secondary)`
                        : `rgb(${r * 255}, ${g * 255}, ${b})`,
                    }}
                  ></div>
                </div>
              </li>
            </>
          );
        })}
      </ul>
      {userCompletions?.completions && (
        <>
          <h5 className="my-3">
            <center>Total:</center>
          </h5>

          <li
            className="list-group-item"
            style={{ margin: 0, padding: 0, border: 0, height: 36 }}
          >
            <span
              style={{
                position: "absolute",
                textAlign: "center",
                top: 5,
                width: "100%",
                height: "100%",
                fontSize: 18,
                fontWeight: 700,
                color: "black",
                textShadow:
                  "0 0 5px #FFF, 0 0 5px #FFF, 0 0 5px #FFF, 0 0 5px #FFF",
              }}
            >
              {userCompletions.playedTotal}/{userCompletions.mapsTotal} (
              {(
                (userCompletions.playedTotal / userCompletions.mapsTotal) *
                100
              ).toFixed(2)}
              %)
            </span>
            <div
              className="progress"
              style={{
                height: 36,
                backgroundColor: `var(--bs-secondary)`,
              }}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${
                    (userCompletions.playedTotal / userCompletions.mapsTotal) *
                    100
                  }%`,
                  overflow: "visible",
                  backgroundColor: `rgb(${
                    (1.0 -
                      userCompletions.playedTotal / userCompletions.mapsTotal) *
                    1.0 *
                    255
                  }, ${
                    (userCompletions.playedTotal / userCompletions.mapsTotal) *
                    1.0 *
                    255
                  }, 0)`,
                }}
              ></div>
            </div>
          </li>
        </>
      )}
    </div>
  );
};

export default UserCompletion;
