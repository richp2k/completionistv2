import React, { useState } from "react";

type CollapseProps = {
  title?: string;
  children?: React.ReactNode | string;
};

const Collapse = (props: CollapseProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="bg-secondary"
        style={{
          textAlign: "start",
          border: "none",
          color: "white",
          fontSize: "1.2rem",
          padding: 20,
          //   borderTopLeftRadius: 10,
          //   borderTopRightRadius: 10,
          fontWeight: 600,
        }}
      >
        {props.title}
      </button>
      {!isCollapsed && (
        <div>
          <div
            className="card card-body bg-dark"
            style={{
              //   borderTopLeftRadius: 0,
              //   borderTopRightRadius: 0,
              borderRadius: 0,
              border: "1px solid gray",
            }}
          >
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Collapse;
