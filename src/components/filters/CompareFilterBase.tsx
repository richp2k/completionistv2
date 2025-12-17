import { useEffect, useState } from "react";
import CustomSelect, { CustomSelectValues } from "../_partials/CustomSelect";
import { COMPAREOPERATOR, FILTERNAME } from "../../interfaces/Enums";
import { CompareFilterValue, FilterValue } from "../../interfaces/Types";
import FilterWrapper from "./FilterWrapper";

type CompareFilterBaseProps = {
  label?: string;
  filterName: FILTERNAME;
  addFilter: (filterName: FILTERNAME, values: FilterValue[]) => void;
  removeFilter: (filterName: FILTERNAME) => void;
};

const CompareFilterBase = (props: CompareFilterBaseProps) => {
  const [filterValue, setFilterValue] = useState<COMPAREOPERATOR | "Any">(
    "Any"
  );
  const [inputOneValue, setInputOneValue] = useState(null);
  const [inputTwoValue, setInputTwoValue] = useState(null);

  const filterValues: CustomSelectValues[] = [
    { value: "Any", label: "Any" },
    { value: COMPAREOPERATOR.GREATER, label: ">" },
    { value: COMPAREOPERATOR.LESS, label: "<" },
    { value: COMPAREOPERATOR.EQUALS, label: "=" },
    { value: COMPAREOPERATOR.BETWEEN, label: "between" },
  ];

  const values: CompareFilterValue[] = [
    { name: "operator", value: filterValue },
    { name: "val1", value: Number(inputOneValue) },
    { name: "val2", value: Number(inputTwoValue) },
  ];

  useEffect(() => {
    if (filterValue === "Any") {
      props.removeFilter(props.filterName);
      return;
    }

    props.addFilter(props.filterName, values);
  }, [filterValue, inputOneValue, inputTwoValue]);

  return (
    <FilterWrapper label={props.label}>
      <CustomSelect
        values={filterValues}
        selectState={filterValue}
        setSelectState={setFilterValue}
      />
      {filterValue !== "Any" && (
        <input
          className="form-control"
          style={{ width: "60px", display: "inline-block" }}
          onChange={(e) => setInputOneValue(e.target.value)}
        />
      )}
      {filterValue === "between" && (
        <>
          <span style={{ color: "white" }}> AND </span>
          <input
            className="form-control"
            style={{ width: "60px", display: "inline-block" }}
            onChange={(e) => setInputTwoValue(e.target.value)}
          />
        </>
      )}
    </FilterWrapper>
  );
};

export default CompareFilterBase;
