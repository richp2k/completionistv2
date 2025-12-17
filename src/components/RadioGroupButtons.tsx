import { Children, cloneElement, ReactElement } from "react";

type RadioGroupButtonsProps = {
  children: any;
  name?: string;
};

const RadioGroupButtons = (props: RadioGroupButtonsProps) => {
  return (
    <div className="btn-group" role="group">
      {Children.map(props.children, (child, idx) => {
        return cloneElement(child as ReactElement<any>, {
          id: idx,
          name: props.name,
        });
      })}
    </div>
  );
};

export default RadioGroupButtons;
