const DownloadBeatmapsetButton = (props: { beatmapsetId: number }) => {
  return (
    <a
      className="btn"
      style={{
        color: "white",
        width: "100%",
        backgroundColor: `var(--bs-secondary)`,
      }}
      href={`https://osu.ppy.sh/beatmapsets/${props.beatmapsetId}`}
      target="_blank"
    >
      Website
    </a>
  );
};

export default DownloadBeatmapsetButton;
