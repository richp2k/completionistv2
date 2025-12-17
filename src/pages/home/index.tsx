import Navbar from "../../components/Navbar";
import HomeBeatmapsets from "./beatmapsets";
import HomeSidePanel from "./sidePanel";

function HomePage() {
  return (
    <div
      className="container-fluid bg-dark App"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <div
        className="row no-gutters"
        style={{ display: "flex", flex: 1, margin: 0 }}
      >
        <HomeSidePanel />
        <HomeBeatmapsets />
      </div>
    </div>
  );
}

export default HomePage;
