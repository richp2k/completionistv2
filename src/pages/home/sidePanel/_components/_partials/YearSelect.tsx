import { useShallow } from "zustand/react/shallow";
import RangeSelect from "../../../../../components/_partials/RangeSelect";
import { useScoreFetchingStore } from "../../../../../store/scoreFetchingStore";
import YearSelectBase from "../../../../../components/inputs/YearSelectBase";

const YearSelect = () => {
  const [year, setYear] = useScoreFetchingStore(
    useShallow((state) => [state.year, state.setYear])
  );

  return (
    <YearSelectBase
      className="my-2 mx-2"
      year={year}
      setYear={setYear}
      required={false}
    />
  );
};

export default YearSelect;
