import RangeSelect from "../../../../../components/_partials/RangeSelect";
import YearSelectBase from "../../../../../components/inputs/YearSelectBase";
import { useBeatmapsetsStore } from "../../../../../store/beatmapsetsStore";
import { useShallow } from "zustand/react/shallow";

const YearSelect = () => {
  const { beatmapsetsYear, setBeatmapsetsYear } = useBeatmapsetsStore(
    useShallow((state) => ({
      beatmapsetsYear: state.year,
      setBeatmapsetsYear: state.setYear,
    }))
  );
  return (
    <YearSelectBase
      className="mx-2 my-2"
      year={beatmapsetsYear}
      setYear={setBeatmapsetsYear}
      required={true}
    />
  );
};

export default YearSelect;
