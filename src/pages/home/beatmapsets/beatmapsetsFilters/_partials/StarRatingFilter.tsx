import { useBeatmapsetsStore } from "../../../../../store/beatmapsetsStore";
import { FILTERNAME } from "../../../../../interfaces/Enums";
import CompareFilterBase from "../../../../../components/filters/CompareFilterBase";

const StarRatingFilter = () => {
  const filterName = FILTERNAME.STARRATING;

  const addFilter = useBeatmapsetsStore((state) => state.addFilter);
  const removeFilter = useBeatmapsetsStore((state) => state.removeFilter);

  return (
    <CompareFilterBase
      filterName={filterName}
      label={"Star rating"}
      addFilter={addFilter}
      removeFilter={removeFilter}
    />
  );
};

export default StarRatingFilter;
