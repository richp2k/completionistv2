import Navbar from "../../components/Navbar";
import CollectionGenerator from "../collectionsGenerator";
import completionistCollectionsPreview from "../../assets/completionist-collections-preview.png";
import { Link } from "react-router-dom";

const CollectionsPage = () => {
  return (
    <div className="container-fluid bg-dark App">
      <Navbar />
      <div
        style={{
          display: "flex",
          flex: 1,
          background: "orange",
        }}
      >
        <p
          style={{
            textAlign: "center",
            width: "auto",
            margin: 5,
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: 600,
          }}
        >
          This feature is still in alpha. Please make sure to backup your
          collection.db
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          margin: "auto",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            fontSize: "1rem",
          }}
        >
          <div
            className="mx-5"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h4>Completionist Collections</h4>
            <p>
              Completionist Collections is a desktop app that helps you manage
              your ingame collections effortlessly. It lets you swap collections
              in and out of ingame database and store them locally.
              <br />
              <br />
              With support of a custom file format, you can easily import new
              collections (just like you do with beatmapsets) or export them to
              share with others.
              <br />
              <br />
              You can download missing beatmaps automatically using mirror
              providers like <a href="https://catboy.best/">Mino</a>,{" "}
              <a href="https://nerinyan.moe/main">NeriNyan</a> or{" "}
              <a href="https://beatconnect.io/">Beatconnect</a>.
              <br />
              <br />
              There is also other features like difficulty preview graph,
              browsing local and online scores (requires login).
              <br />
              <br />
              Check it out for yourself using the button below or by clicking{" "}
              <a href="https://github.com/lZiobro/CompletionistCollections">
                here
              </a>
              .
              <br />
              <br />
              <a
                href="https://github.com/lZiobro/CompletionistCollections"
                className="btn btn-primary"
              >
                Completionist Collections on github
              </a>
            </p>
          </div>
          <div className="mx-2" style={{ display: "flex" }}>
            <img
              className={"img-fluid px-2"}
              src={completionistCollectionsPreview}
              alt="completionist-collections-preview"
            />
          </div>
        </div>
        <div style={{ height: 24 }}></div>
        <div style={{ height: 2, background: "gray" }}></div>
        <div style={{ height: 24 }}></div>
        <div
          style={{ display: "flex", flex: 1, justifyContent: "space-between" }}
        >
          <div
            className="mx-5"
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h4>Collections generator</h4>
            <p>
              Collections generator ease organizing your collections while
              aiming for osu!completionist.
              <br />
              <br />
              Here you can automatically generate collections with maps you have
              yet to play.
              <br />
              With Completionist Collections you can get all the missing
              beatmaps without the need to manually look 'em up on osu!website
              or download huge mappacks that would clatter your disk space.
              <br />
              <br />
              For all of you who wants to complete star rating ranges (like
              completing all of 0-1* or 1-2* maps in the game) there is also
              possibility of generating collections based on star rating.
              <br />
              <br />
              Additional options may be added based on user feedback, so don't
              be shy and if you need anything just message me directly on
              discord: bowashe
            </p>
          </div>
          <div
            className="mx-2"
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button className="btn btn-primary">
              <Link to="/collections/generator" className="nav-link">
                {`Go to Collections Generator ->`}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
