import React from "react";
import OutlineQuestionMarkIcon from "../../../components/Icons/OutlineQuestionMarkIcon";

type GeneratorFieldProps = {
  label?: string;
  children: any;
  tooltip?: string;
  wrapperStyle?: React.CSSProperties;
  style?: React.CSSProperties;
};

const GeneratorField = (props: GeneratorFieldProps) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        ...props.wrapperStyle,
      }}
    >
      <div className="generator-field" style={{ ...props.style }}>
        {props.label && (
          <p
            style={{
              color: "white",
              display: "inline-block",
              marginRight: 50,
            }}
          >
            {props.label}
          </p>
        )}
        {props.children}
      </div>
      <span
        style={{
          visibility: props.tooltip !== undefined ? "visible" : "hidden",
          alignSelf: "center",
          marginLeft: 10,
        }}
        data-toggle="tooltip"
        title={props.tooltip ? props.tooltip : "Tooltip info goes here"}
      >
        <OutlineQuestionMarkIcon width={28} height={28} />
      </span>
    </div>
  );
};

export default GeneratorField;
