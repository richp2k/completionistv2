import { ReactNode } from "react";

type ChangelogEntryProps = {
  date: Date;
  children: ReactNode;
};

const ChangelogEntry = (props: ChangelogEntryProps) => {
  return (
    <div style={{ color: "white", margin: 20 }}>
      <h4>{props.date.toLocaleDateString()}</h4>
      <ul>{props.children}</ul>
    </div>
  );
};

export default ChangelogEntry;
