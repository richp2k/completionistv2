import Collapse from "../../components/Collapse";
import Navbar from "../../components/Navbar";

const HelpPage = () => {
  return (
    <div className="container-fluid bg-dark App" style={{ color: "white" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: 20,
        }}
      >
        <h2>Quick start</h2>
        <p>1. Login using the button in top right.</p>
        <p>2. Select gamemode and variant on the side panel.</p>
        <p>3. Fetch your scores for selected gamemode and variant.</p>
        <p>4. You are good to go.</p>
        <p>
          Note: You'll need to fetch NEW scores again. Scores that has already
          been fetched will stay in database.
        </p>
        <p>Note 2: This website will only show ranked beatmaps.</p>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: 20,
        }}
      >
        <h2>Overview</h2>
        <p>
          <span>You can check you completion status using the side panel.</span>
          <br />
          <span>
            Here you can also take a screenshot (copy to clipboard or download)
          </span>
          <br />
          <br />
          <span>
            Main section lets you check detailed progress on beatmaps.
          </span>
          <br />
          <span>
            You can filter them by year/month or more advanced filters like miss
            count/star rating.
          </span>
          <br />
          <br />
          <span>Export feature are here for all of excel freaks.</span>
          <br />
          <span>
            It provides even more detailed data with things like max score with
            neat coloring and sheet grouping.
          </span>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: 20,
        }}
      >
        <h2>How does it work?</h2>
        <p>
          <span>
            This website relies on its own database thus the need to fetch
            scores manually.
          </span>
          <br />
          <span>
            Due to osu!api limitations "fetching scores" actually checks every
            single beatmap for your scores.
          </span>
          <br />
          <span>
            These scores are then stored in completionist!db for use on the
            site.
          </span>
          <br />
          <span>
            Due to the use of separate database, some of the newest beatmaps may
            be missing.
          </span>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: 20,
        }}
      >
        <h3>FAQ</h3>
        <Collapse title="The website says 'cant authorise!'!">
          Most likely the server has crashed or certs got outdated. Please
          message me on discord: bowashe.
        </Collapse>
        <Collapse title="I don't see my scores!">
          Make sure you are logged in and have fetched scores for selected
          gamemode/variant. If the problem persists, please contact me.
        </Collapse>
        <Collapse title="There is some missing beatmaps!">
          Note that this site will only show ranked beatmaps. Some of the newest
          maps may be missing due to the need of manual fetch. If you are sure
          both of these things isn't the case, please contact me.
        </Collapse>
      </div>
    </div>
  );
};

export default HelpPage;
