import RadioGroupButton from "../../components/_partials/RadioGroupButton";
import Navbar from "../../components/Navbar";
import RadioGroupButtons from "../../components/RadioGroupButtons";
import { useCollectionGeneratorStore } from "../../store/collectionGeneratorStore";
import { useShallow } from "zustand/react/shallow";
import { GAMEMODE } from "../../interfaces/Types";
import { ScoresVariant } from "../../interfaces/Enums";
import YearSelectBase from "../../components/inputs/YearSelectBase";
import MonthSelectBase from "../../components/inputs/MonthSelectBase";
import StarRatingFilter from "./_components/StarRatingFilter";
import { useUserStore } from "../../store/userStore";
import CustomSelect, {
  CustomSelectValues,
} from "../../components/_partials/CustomSelect";
import GeneratorField from "./_components/GeneratorField";

const CollectionGeneratorPage = () => {
  const userId = useUserStore(useShallow((state) => state.userId));
  const [gamemode, setGamemode] = useCollectionGeneratorStore(
    useShallow((state) => [state.gamemode, state.setGamemode])
  );
  const [generatorVariant, setGeneratorVariant] = useCollectionGeneratorStore(
    useShallow((state) => [state.variant, state.setVariant])
  );
  const [unplayedOnly, setUnplayedOnly] = useCollectionGeneratorStore(
    useShallow((state) => [state.unplayedOnly, state.setUnplayedOnly])
  );
  const [maxAmountOfMaps, setMaxAmountOfMaps] = useCollectionGeneratorStore(
    useShallow((state) => [state.maxAmountOfMaps, state.setMaxAmountOfMaps])
  );
  const [maxAmountOfMapsCustomValue, setMaxAmountOfMapsCustomValue] =
    useCollectionGeneratorStore(
      useShallow((state) => [
        state.maxAmountOfMapsCustomValue,
        state.setMaxAmountOfMapsCustomValue,
      ])
    );
  const [groupBy, setGroupBy] = useCollectionGeneratorStore(
    useShallow((state) => [state.groupBy, state.setGroupBy])
  );
  const [sortBy, setSortBy] = useCollectionGeneratorStore(
    useShallow((state) => [state.sortBy, state.setSortBy])
  );
  const [sortByDirection, setSortByDirection] = useCollectionGeneratorStore(
    useShallow((state) => [state.sortByDirection, state.setSortByDirection])
  );

  const [year, setYear] = useCollectionGeneratorStore(
    useShallow((state) => [state.year, state.setYear])
  );
  const [month, setMonth] = useCollectionGeneratorStore(
    useShallow((state) => [state.month, state.setMonth])
  );

  const [exportFormat, setExportFormat] = useCollectionGeneratorStore(
    useShallow((state) => [state.exportFormat, state.setExportFormat])
  );

  const availableExportFormats: CustomSelectValues[] = [
    { value: ".ccgp", label: ".ccgp" },
    { value: ".db", label: ".db" },
  ];

  const generateCollection = useCollectionGeneratorStore(
    useShallow((state) => state.generateCollectionFromSelection)
  );

  const [isGenerating, generatingMessage] = useCollectionGeneratorStore(
    useShallow((state) => [state.isGenerating, state.generatingMessage])
  );

  return (
    <div className="container-fluid bg-dark App">
      <Navbar />
      <div>
        {/* <div style={{ marginLeft: "33%" }}> */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            width: "fit-content",
            margin: "auto",
          }}
        >
          <GeneratorField label="Gamemode:">
            <RadioGroupButtons name="generator-gamemode">
              <RadioGroupButton
                value={GAMEMODE.OSU}
                selectedValue={gamemode}
                setValue={(gamemode: GAMEMODE) => {
                  setGeneratorVariant(ScoresVariant.SPECIFIC);
                  setGamemode(gamemode);
                }}
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
          </GeneratorField>
          <GeneratorField
            label="Variant:"
            tooltip={`Specifics - only gamemode specific maps\nConverts - only maps that are converts\nSpecifics + Converts - both of the above`}
          >
            <RadioGroupButtons name="generator-variant">
              <RadioGroupButton
                value={ScoresVariant.SPECIFIC}
                selectedValue={generatorVariant}
                setValue={setGeneratorVariant}
              >
                Specifics
              </RadioGroupButton>
              <RadioGroupButton
                value={ScoresVariant.CONVERT}
                selectedValue={generatorVariant}
                setValue={setGeneratorVariant}
                disabled={gamemode === GAMEMODE.OSU}
              >
                Converts
              </RadioGroupButton>
              <RadioGroupButton
                value={ScoresVariant.SPECIFICCONVERT}
                selectedValue={generatorVariant}
                setValue={setGeneratorVariant}
                disabled={gamemode === GAMEMODE.OSU}
              >
                Specifics + Converts
              </RadioGroupButton>
            </RadioGroupButtons>
          </GeneratorField>
          <GeneratorField
            label="Exclude already played maps:"
            tooltip={`Whether to include already completed maps (according to completionist database)\n\nUseful when you are aiming for completionist`}
          >
            <RadioGroupButtons name="generator-unplayedOnly">
              <RadioGroupButton
                value={true}
                selectedValue={unplayedOnly}
                setValue={setUnplayedOnly}
              >
                Yes
              </RadioGroupButton>
              <RadioGroupButton
                value={false}
                selectedValue={unplayedOnly}
                setValue={setUnplayedOnly}
              >
                No
              </RadioGroupButton>
            </RadioGroupButtons>
          </GeneratorField>
          <GeneratorField
            label="Max amount of maps in collection:"
            tooltip={`Limits total amount of maps`}
            style={{ flexDirection: "column" }}
          >
            <RadioGroupButtons name="generator-maxAmountOfMaps">
              <RadioGroupButton
                value={-1}
                selectedValue={maxAmountOfMaps}
                setValue={setMaxAmountOfMaps}
              >
                Unlimited
              </RadioGroupButton>
              <RadioGroupButton
                value={1000}
                selectedValue={maxAmountOfMaps}
                setValue={setMaxAmountOfMaps}
              >
                1000
              </RadioGroupButton>
              <RadioGroupButton
                value={500}
                selectedValue={maxAmountOfMaps}
                setValue={setMaxAmountOfMaps}
              >
                500
              </RadioGroupButton>
              <RadioGroupButton
                value={200}
                selectedValue={maxAmountOfMaps}
                setValue={setMaxAmountOfMaps}
              >
                200
              </RadioGroupButton>
              <RadioGroupButton
                value={100}
                selectedValue={maxAmountOfMaps}
                setValue={setMaxAmountOfMaps}
              >
                100
              </RadioGroupButton>
              <RadioGroupButton
                value={50}
                selectedValue={maxAmountOfMaps}
                setValue={setMaxAmountOfMaps}
              >
                50
              </RadioGroupButton>
              <RadioGroupButton
                value={-2}
                selectedValue={maxAmountOfMaps}
                setValue={setMaxAmountOfMaps}
              >
                Custom
              </RadioGroupButton>
            </RadioGroupButtons>
          </GeneratorField>
          {maxAmountOfMaps === -2 && (
            <GeneratorField label="Max amount:">
              <input
                type="number"
                pattern="[0-9]+"
                value={maxAmountOfMapsCustomValue}
                onChange={(e) =>
                  setMaxAmountOfMapsCustomValue(Number(e.currentTarget.value))
                }
              ></input>
            </GeneratorField>
          )}
          {/* {maxAmountOfMaps > 0 && (
            <>
              <div className="generator-field">
                <p
                  style={{
                    color: "white",
                    display: "inline-block",
                    marginRight: 10,
                  }}
                >
                  Sort by:
                </p>
                <RadioGroupButtons name="generator-sortBy">
                  <RadioGroupButton
                    value={"Date"}
                    selectedValue={sortBy}
                    setValue={setSortBy}
                  >
                    Date
                  </RadioGroupButton>
                  <RadioGroupButton
                    value={"StarRating"}
                    selectedValue={sortBy}
                    setValue={setSortBy}
                  >
                    Star rating
                  </RadioGroupButton>
                </RadioGroupButtons>
              </div>
              <div className="generator-field">
                <p
                  style={{
                    color: "white",
                    display: "inline-block",
                    marginRight: 10,
                  }}
                >
                  Sort by direction:
                </p>
                <RadioGroupButtons name="generator-sortByDirection">
                  <RadioGroupButton
                    value={"asc"}
                    selectedValue={sortByDirection}
                    setValue={setSortByDirection}
                  >
                    Ascending
                  </RadioGroupButton>
                  <RadioGroupButton
                    value={"desc"}
                    selectedValue={sortByDirection}
                    setValue={setSortByDirection}
                  >
                    Descending
                  </RadioGroupButton>
                </RadioGroupButtons>
              </div>
            </>
          )} */}
          <GeneratorField
            label="Group by:"
            tooltip={`Grouping by date results in collections grouped by year_month (e.g. 2010_02, 2010_03...)\n\nGrouping by star rating results in collections grouped by star rating (e.g. 0*-1*, 1*-2*...)`}
          >
            <RadioGroupButtons name="generator-groupBy">
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
            </RadioGroupButtons>
          </GeneratorField>
          <GeneratorField
            label="Limit by date:"
            tooltip={`Limits resulting collection to only specified year/month`}
          >
            <div>
              <YearSelectBase year={year} setYear={setYear} className="mx-2" />
              <MonthSelectBase month={month} setMonth={setMonth} />
            </div>
          </GeneratorField>
          <GeneratorField
            label="Limit by star rating:"
            tooltip={`Limits resulting collection by specified star rating\n\nRange is inclusive in lower bound, and exclusive in higher bound.\nWhat it means is that if you select sr < 2*, itll only result in maps LOWER than, but not including 2* maps.\nHowever if you select sr > 2* itll also include exactly 2* maps and above`}
          >
            <StarRatingFilter />
          </GeneratorField>
          {/* <div className="generator-field">
            <button className="btn btn-primary">
              Check amount of beatmaps
            </button>
            <p style={{ color: "white" }}>Beatmaps in collection: 69</p>
          </div> */}
          <GeneratorField
            wrapperStyle={{ alignSelf: "flex-end", marginTop: 25 }}
            tooltip={`.ccgp is format used by Completionist Collections desktop app, while .db is osu! format (lazer is not supported right now)`}
          >
            <p style={{ color: "white", marginRight: 20 }}>
              {generatingMessage}
            </p>
            <div className="btn-group" role="group">
              <button
                disabled={isGenerating}
                className="btn btn-primary"
                onClick={() => generateCollection(userId)}
              >
                Generate
              </button>
              <CustomSelect
                values={availableExportFormats}
                selectState={exportFormat}
                setSelectState={setExportFormat}
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              />
            </div>
          </GeneratorField>
        </div>
      </div>
    </div>
  );
};

export default CollectionGeneratorPage;
