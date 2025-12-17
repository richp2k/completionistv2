import Navbar from "../../components/Navbar";
import ChangelogEntry from "./_components/ChangelogEntry";
import ChangelogEntryLine from "./_components/ChangelogEntryLine";

const ChangelogPage = () => {
  return (
    <div className="container-fluid bg-dark App">
      <Navbar />
      <div style={{ margin: 20 }}>
        <h2 style={{ color: "white" }}>Changelog:</h2>
        <ChangelogEntry date={new Date("2025-12-09")}>
          <ChangelogEntryLine>
            <b>
              <u style={{ fontSize: "1.1rem" }}>Export overhaul:</u>
            </b>
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            Changed export format (.csv -&#8250; .xlsx)
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            Added export row coloring based on user score
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            Added new export columns (max_score)
          </ChangelogEntryLine>
          <ChangelogEntryLine>Added export variants</ChangelogEntryLine>
          <ChangelogEntryLine>
            Star rating now correctly applies according on variant (important
            for converts)
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            Added export grouping (Date, Star rating, Max score)
          </ChangelogEntryLine>
          <br />
          <ChangelogEntryLine>
            <b>
              <u style={{ fontSize: "1.1rem" }}>
                Introduced Completionist Collections!
              </u>
            </b>
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            Completionist Collections is a desktop app aiding in collections
            management
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            For more info check Completionist Collections page
          </ChangelogEntryLine>
          <br />
          <ChangelogEntryLine>
            <b>
              <u style={{ fontSize: "1.1rem" }}>
                Introduced Collections Generator!
              </u>
            </b>
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            Allows to generate collections based on your completionist goal!
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            For more info check Completionist Collections page
          </ChangelogEntryLine>
          <br />
          <ChangelogEntryLine>
            <b>
              <u style={{ fontSize: "1.1rem" }}>UI:</u>
            </b>
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            <b>Unified "Check other players" into profile pages</b>
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            <b>Changed active button color to avoid confusion</b>
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            Unified gamemode selection to one place
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            Added unified variant selection
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            Navbar now higlights selected nav
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            Modals now has more consistent look
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            Beatmapsets table now has more consistent look
          </ChangelogEntryLine>
          <ChangelogEntryLine>Other minor changes</ChangelogEntryLine>
          <br />
          <ChangelogEntryLine>
            <b>
              <u style={{ fontSize: "1.1rem" }}>Other:</u>
            </b>
          </ChangelogEntryLine>
          <ChangelogEntryLine>
            <b>(Hopefully) fixed score fetching inconsistencies</b>
          </ChangelogEntryLine>
          <ChangelogEntryLine>Improved code stability</ChangelogEntryLine>
          <ChangelogEntryLine>Improved site stability</ChangelogEntryLine>
          <ChangelogEntryLine>
            Fixed filters errors stability
          </ChangelogEntryLine>
          <ChangelogEntryLine>Added star rating filter</ChangelogEntryLine>
          <ChangelogEntryLine>Updated "How to use"</ChangelogEntryLine>
          <ChangelogEntryLine>
            Added Overview and FAQ to "How to use"
          </ChangelogEntryLine>
          <br />
          <ChangelogEntryLine>
            Fun fact:
            <br />
            https://osu.ppy.sh/beatmapsets/53928#taiko/191276
            <br />
            this seems to be the only beatmap across well over 100k to use
            different file encoding (UTF-16 LE BOM)
            <br />
          </ChangelogEntryLine>
        </ChangelogEntry>
        <ChangelogEntry date={new Date("2025-12-06")}>
          <ChangelogEntryLine>Start of changelog!</ChangelogEntryLine>
        </ChangelogEntry>
      </div>
    </div>
  );
};

export default ChangelogPage;
