const RadioGroupButton = (props: {
  value: any;
  selectedValue: any;
  setValue: Function;
  name?: string;
  id?: number;
  disabled?: boolean;
  children: string;
}) => {
  const checked = props.selectedValue === props.value;
  return (
    <>
      <input
        disabled={props.disabled ?? false}
        type="radio"
        className="btn-check"
        name={`${props.name ?? "btnradio"}`}
        checked={checked}
        id={`${props.name ?? "btnradio"}${props.id ?? 1}`}
        value={props.value}
        onChange={() => props.setValue(props.value)}
      />
      <label
        className={`btn btn-outline-primary ${
          checked ? "bg-primary" : "bg-secondary"
        }`}
        htmlFor={`${props.name ?? "btnradio"}${props.id}`}
        style={{ borderColor: "black", color: "white" }}
      >
        {props.children}
      </label>
    </>
  );
};

export default RadioGroupButton;
