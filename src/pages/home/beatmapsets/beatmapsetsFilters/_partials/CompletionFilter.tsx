import { useEffect, useState } from "react";
import CustomSelect, {
  CustomSelectValues,
} from "../../../../../components/_partials/CustomSelect";
import FilterWrapper from "../../../../../components/filters/FilterWrapper";
import { COMPLETION, FILTERNAME } from "../../../../../interfaces/Enums";
import { useBeatmapsetsStore } from "../../../../../store/beatmapsetsStore";
import SimpleFilterBase from "../../../../../components/filters/SimpleFilterBase";

const CompletionFilter = () => {
  const filterName = FILTERNAME.COMPLETION;
  const addFilter = useBeatmapsetsStore((state) => state.addFilter);
  const removeFilter = useBeatmapsetsStore((state) => state.removeFilter);

  const filterValues: CustomSelectValues[] = [
    { value: "Any", label: "Any" },
    { value: COMPLETION.UNPLAYED, label: "Unplayed" },
    { value: COMPLETION.PARTIAL, label: "Partial" },
    { value: COMPLETION.COMPLETED, label: "Completed" },
  ];

  return (
    <SimpleFilterBase
      filterName={filterName}
      label="Completion"
      filterValues={filterValues}
      addFilter={addFilter}
      removeFilter={removeFilter}
    />
  );
};

export default CompletionFilter;
