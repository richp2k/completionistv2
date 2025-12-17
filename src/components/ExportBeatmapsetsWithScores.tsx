import { useState } from "react";
import RadioGroupButton from "./_partials/RadioGroupButton";
import Modal from "./Modal";
import RadioGroupButtons from "./RadioGroupButtons";
import { GAMEMODE } from "../interfaces/Types";
import { ScoresVariant } from "../interfaces/Enums";
import CircleXIcon from "./Icons/CircleXIcon";
import { exportBeatmapsetsWithScoresDataNode } from "../service/ExportService";
import { useUserStore } from "../store/userStore";
import { useShallow } from "zustand/react/shallow";
import { useProfileId } from "../hooks/useProfileId";

const ExportBeatmapsetsWithScores = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const userId = useProfileId();
  const [groupBy, setGroupBy] = useState<string>("Date");
  const [gamemode, setGamemode] = useState<GAMEMODE>(GAMEMODE.OSU);
  const [variant, setVariant] = useState<ScoresVariant>(ScoresVariant.SPECIFIC);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchingMessage, setFetchingMessage] = useState<string>("");

  const exportData = async () => {
    setIsFetching(true);
    setFetchingMessage("Waiting for Server...");
    try {
      await exportBeatmapsetsWithScoresDataNode(
        userId,
        gamemode,
        variant,
        groupBy
      );
    } catch {
      setFetchingMessage("Server Error");
      setIsFetching(false);
    }
    setFetchingMessage("");
    setIsFetching(false);
  };

  const toggleIsModalVisible = () => {
    if (isFetching) {
      return;
    }
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div>
      <button
        className="btn btn-info"
        style={{}}
        onClick={() => setIsModalVisible(true)}
        //   disabled={beatmapsetsStore.beatmapsetsView.length > 0}
      >
        Export
      </button>
      {isModalVisible && (
        <Modal>
          <div
            className="bg-dark"
            style={{
              borderRadius: 10,
              padding: 20,
              color: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <h3>Export</h3>
              <button onClick={toggleIsModalVisible} className="btn btn-dark">
                <CircleXIcon width={24} height={24} />
              </button>
            </div>
            <div>
              <p
                style={{
                  fontSize: "1.1rem",
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                Select export sheet grouping
              </p>
              <RadioGroupButtons name="export-groupBy">
                <RadioGroupButton
                  value={"Date"}
                  selectedValue={groupBy}
                  setValue={setGroupBy}
                >
                  Date
                </RadioGroupButton>
                <RadioGroupButton
                  value={"StarRating"}
                  selectedValue={groupBy}
                  setValue={setGroupBy}
                >
                  Star rating
                </RadioGroupButton>
                <RadioGroupButton
                  value={"MaxScore"}
                  selectedValue={groupBy}
                  setValue={setGroupBy}
                >
                  Max Score
                </RadioGroupButton>
              </RadioGroupButtons>
            </div>
            <div>
              <p
                style={{
                  fontSize: "1.1rem",
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                Gamemode
              </p>
              <RadioGroupButtons name="export-gamemode">
                <RadioGroupButton
                  value={GAMEMODE.OSU}
                  selectedValue={gamemode}
                  setValue={setGamemode}
                >
                  osu!
                </RadioGroupButton>
                <RadioGroupButton
                  value={GAMEMODE.TAIKO}
                  selectedValue={gamemode}
                  setValue={setGamemode}
                >
                  osu!taiko
                </RadioGroupButton>
                <RadioGroupButton
                  value={GAMEMODE.MANIA}
                  selectedValue={gamemode}
                  setValue={setGamemode}
                >
                  osu!mania
                </RadioGroupButton>
                <RadioGroupButton
                  value={GAMEMODE.CATCH}
                  selectedValue={gamemode}
                  setValue={setGamemode}
                >
                  osu!catch
                </RadioGroupButton>
              </RadioGroupButtons>
            </div>
            <div>
              <p
                style={{
                  fontSize: "1.1rem",
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                Variant
              </p>
              <RadioGroupButtons name="export-variant">
                <RadioGroupButton
                  value={ScoresVariant.SPECIFIC}
                  selectedValue={variant}
                  setValue={setVariant}
                >
                  Specifics
                </RadioGroupButton>
                <RadioGroupButton
                  value={ScoresVariant.CONVERT}
                  selectedValue={variant}
                  setValue={setVariant}
                >
                  Converts
                </RadioGroupButton>
                <RadioGroupButton
                  value={ScoresVariant.SPECIFICCONVERT}
                  selectedValue={variant}
                  setValue={setVariant}
                >
                  Specifics + Converts
                </RadioGroupButton>
              </RadioGroupButtons>
            </div>
            <p>
              Note: Output file for osu! gamemode <br />
              or converts will have a size of 100mb+
            </p>
            <div style={{ display: "flex", flex: 1, marginTop: 20 }}>
              <button onClick={toggleIsModalVisible} className="btn btn-danger">
                Cancel
              </button>
              <span style={{ marginLeft: "auto" }}>{fetchingMessage}</span>
              <button
                className="btn btn-primary"
                style={{ alignSelf: "flex-end", marginLeft: "auto" }}
                onClick={() => exportData()}
                disabled={isFetching}
              >
                Export
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ExportBeatmapsetsWithScores;
