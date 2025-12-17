const FilterWrapper = (props: { label?: string; children }) => {
  return (
    <div>
      {props.label && (
        <p
          className="me-2"
          style={{ width: "auto", display: "inline-block", color: "white" }}
        >
          {props.label}
        </p>
      )}
      {props.children}
    </div>
  );
};

export default FilterWrapper;
