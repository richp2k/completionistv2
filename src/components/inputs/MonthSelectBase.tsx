import RangeSelect from "../_partials/RangeSelect";

type MonthSelectBaseProps = {
  month: number | undefined;
  setMonth: (value: number | undefined) => void;
  required?: boolean;
  className?: string;
};

const MonthSelectBase = (props: MonthSelectBaseProps) => {
  const optionalText = props.required ? "" : " (optional)";

  return (
    <RangeSelect
      start={1}
      end={12}
      currentValue={props.month}
      setValue={props.setMonth}
      default={`Month${optionalText}`}
      className={props.className}
    />
  );
};

export default MonthSelectBase;
