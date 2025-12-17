import { useEffect, useState } from "react";
import CustomSelect, { CustomSelectValues } from "../_partials/CustomSelect";
import { COMPAREOPERATOR, FILTERNAME } from "../../interfaces/Enums";
import { CompareFilterValue, FilterValue } from "../../interfaces/Types";
import FilterWrapper from "./FilterWrapper";

type SimpleFilterBaseProps = {
  label?: string;
  filterValues: CustomSelectValues[];
  filterName: FILTERNAME;
  addFilter: (filterName: FILTERNAME, values: FilterValue[]) => void;
  removeFilter: (filterName: FILTERNAME) => void;
};

const SimpleFilterBase = (props: SimpleFilterBaseProps) => {
  const [filterValue, setFilterValue] = useState<string | "Any">("Any");

  useEffect(() => {
    if (filterValue === "Any") {
      props.removeFilter(props.filterName);
      return;
    }
    props.addFilter(props.filterName, [{ name: "value", value: filterValue }]);
  }, [filterValue]);

  return (
    <FilterWrapper label={props.label}>
      <CustomSelect
        values={props.filterValues}
        selectState={filterValue}
        setSelectState={setFilterValue}
      />
    </FilterWrapper>
  );
};

export default SimpleFilterBase;
