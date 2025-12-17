import { arrayRange } from "../../misc/utils";

type RangeSelectProps =
  | {
      start: number;
      end: number;
      selectRef: React.MutableRefObject<any>;
      default: string;
      className?: string;
    }
  | {
      start: number;
      end: number;
      currentValue: any;
      setValue: React.SetStateAction<any>;
      default: string;
      className?: string;
    };

const RangeSelect = (props: RangeSelectProps) => {
  const options = (
    <>
      <option value={undefined}>{props.default}</option>
      {arrayRange(props.start, props.end, 1).map((opt) => (
        <option value={opt} key={opt}>
          {opt}
        </option>
      ))}
    </>
  );
  if ("selectRef" in props) {
    return (
      <select
        className={`form-select ${props.className}`}
        ref={props.selectRef}
        style={{ width: "auto", display: "inline-block" }}
      >
        {options}
      </select>
    );
  } else {
    return (
      <select
        className={`form-select ${props.className}`}
        value={props.currentValue}
        onChange={(e) => props.setValue(e.currentTarget.value)}
        style={{ width: "auto", display: "inline-block" }}
      >
        {options}
      </select>
    );
  }
};

export default RangeSelect;
