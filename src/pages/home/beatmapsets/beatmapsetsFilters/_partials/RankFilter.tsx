import { CustomSelectValues } from "../../../../../components/_partials/CustomSelect";
import { useBeatmapsetsStore } from "../../../../../store/beatmapsetsStore";
import { FILTERNAME } from "../../../../../interfaces/Enums";
import SimpleFilterBase from "../../../../../components/filters/SimpleFilterBase";

const RankFilter = () => {
  const filterName = FILTERNAME.RANK;
  const addFilter = useBeatmapsetsStore((state) => state.addFilter);
  const removeFilter = useBeatmapsetsStore((state) => state.removeFilter);

  const filterValues: CustomSelectValues[] = [
    { value: "Any", label: "Any" },
    { value: "SS", label: "SS" },
    { value: "S", label: "S" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ];

  return (
    <SimpleFilterBase
      filterName={filterName}
      label="Rank"
      filterValues={filterValues}
      addFilter={addFilter}
      removeFilter={removeFilter}
    />
  );
};

export default RankFilter;
