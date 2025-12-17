import { useBeatmapsetsStore } from "../../../../../store/beatmapsetsStore";
import { FILTERNAME } from "../../../../../interfaces/Enums";
import CompareFilterBase from "../../../../../components/filters/CompareFilterBase";

const MissCountFilter = () => {
  const filterName = FILTERNAME.MISSCOUNT;
  const addFilter = useBeatmapsetsStore((state) => state.addFilter);
  const removeFilter = useBeatmapsetsStore((state) => state.removeFilter);
  return (
    <CompareFilterBase
      filterName={filterName}
      label={"Miss count"}
      addFilter={addFilter}
      removeFilter={removeFilter}
    />
  );
};

export default MissCountFilter;
