import { getFirstBeatmapsetBeatmapIdNode } from "../../../../../service/BeatmapsService";

//TODO
const OsuDirectButton = (props: { beatmapsetId: number }) => {
  const goToBeatmapsetDirect = async (beatmapsetId: number) => {
    const beatmapsetFirstBeatmapId = await getFirstBeatmapsetBeatmapIdNode(
      beatmapsetId
    );
    const directLink = `osu://b/${beatmapsetFirstBeatmapId}`;
    window.open(directLink, "_blank");
  };

  return (
    <button
      className="btn"
      onClick={() => goToBeatmapsetDirect(props.beatmapsetId)}
      style={{
        color: "white",
        width: "100%",
        backgroundColor: `var(--bs-secondary)`,
      }}
    >
      Direct
    </button>
  );
};

export default OsuDirectButton;
