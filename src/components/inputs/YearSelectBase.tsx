import RangeSelect from "../_partials/RangeSelect";

type YearSelectBaseProps = {
  year: number | undefined;
  setYear: (value: number | undefined) => void;
  start?: number;
  end?: number;
  required?: boolean;
  className?: string;
};

const YearSelectBase = (props: YearSelectBaseProps) => {
  const start = props.start ?? 2007;
  const end = props.end ?? new Date().getFullYear();
  const optionalText = props.required ? "" : " (optional)";

  return (
    <RangeSelect
      start={start}
      end={end}
      currentValue={props.year}
      setValue={props.setYear}
      default={`Year${optionalText}`}
      className={props.className}
    />
  );
};

export default YearSelectBase;
