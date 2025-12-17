import { ReactNode } from "react";

type ChangelogEntryLineProps = {
  children: ReactNode | string;
};

const ChangelogEntryLine = (props: ChangelogEntryLineProps) => {
  return <li>{props.children}</li>;
};

export default ChangelogEntryLine;
