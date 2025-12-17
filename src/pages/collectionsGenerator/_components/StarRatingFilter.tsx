import { FILTERNAME } from "../../../interfaces/Enums";
import { useCollectionGeneratorStore } from "../../../store/collectionGeneratorStore";
import CompareFilterBase from "../../../components/filters/CompareFilterBase";

const StarRatingFilter = () => {
  const filterName = FILTERNAME.STARRATING;

  const addFilter = useCollectionGeneratorStore((state) => state.addFilter);
  const removeFilter = useCollectionGeneratorStore(
    (state) => state.removeFilter
  );

  return (
    <CompareFilterBase
      filterName={filterName}
      label={""}
      addFilter={addFilter}
      removeFilter={removeFilter}
    />
  );
};

export default StarRatingFilter;
