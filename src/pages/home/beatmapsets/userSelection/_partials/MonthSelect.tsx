import MonthSelectBase from "../../../../../components/inputs/MonthSelectBase";
import { useBeatmapsetsStore } from "../../../../../store/beatmapsetsStore";
import { useShallow } from "zustand/react/shallow";

const MonthSelect = () => {
  const { beatmapsetsMonth, setBeatmapsetsMonth } = useBeatmapsetsStore(
    useShallow((state) => ({
      beatmapsetsMonth: state.month,
      setBeatmapsetsMonth: state.setMonth,
    }))
  );
  return (
    <MonthSelectBase
      className="mx-2 my-2"
      month={beatmapsetsMonth}
      setMonth={setBeatmapsetsMonth}
    />
  );
};

export default MonthSelect;
