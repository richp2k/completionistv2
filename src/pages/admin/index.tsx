import Navbar from "../../components/Navbar";
import FetchBeatmaps from "./_components/FetchBeatmaps";
import FetchBeatmapsetById from "./_components/FetchBeatmapsetById";
import FetchMissingBeatmapsAttrs from "./_components/FetchMissingBeatmapsAttrs";

const AdminPage = () => {
  return (
    <div className="container-fluid bg-dark App">
      <Navbar />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          width: "fit-content",
          padding: 20,
          border: "1px solid white",
        }}
      >
        <h2 style={{ color: "white" }}>Fetch new beatmaps:</h2>
        <p style={{ color: "white" }}>
          Fetches new beatmaps by ranked date descending.
          <br />
          Will automatically stop after detecting 10 consecutive overlaps.
          <br />
          If rate limit remaining (amount of request you can send in 1 minute
          timespan) falls below 100, there'll be 1 minute timeout.
          <br />
          <b>
            <u>
              Note: due to need to fetch additional attrs fetching may take a
              lot of time
            </u>
          </b>
        </p>
        <FetchBeatmaps />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          width: "fit-content",
          padding: 20,
          border: "1px solid white",
        }}
      >
        <h2 style={{ color: "white" }}>Fetch beatmapset by id:</h2>
        <p style={{ color: "white" }}>
          Fetches beatmapset by id.
          <br />
          Use if you see a DMCA map missing.
          <br />
        </p>
        <FetchBeatmapsetById />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          width: "fit-content",
          padding: 20,
          border: "1px solid white",
        }}
      >
        <h2 style={{ color: "white" }}>Fetch missing beatmaps attrs:</h2>
        <p style={{ color: "white" }}>
          Fetches additional beatmaps information like max_score/convert star
          rating.
          <br />
          Used to fix incorrectly fetched maps.
          <br />
          Current beatmaps fetch does it automatically.
          <br />
          <br />
          <b>Do not use if you dont know what you are doing.</b>
          <br />
          <br />
          If rate limit remaining (amount of request you can send in 1 minute
          timespan) falls below 100, there'll be 1 minute timeout.
        </p>
        <FetchMissingBeatmapsAttrs />
      </div>
    </div>
  );
};

export default AdminPage;
