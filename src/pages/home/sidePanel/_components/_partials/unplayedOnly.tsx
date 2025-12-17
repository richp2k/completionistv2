import { useShallow } from "zustand/react/shallow";
import YesNoButton from "../../../../../components/_partials/YesNoButton";
import { useScoreFetchingStore } from "../../../../../store/scoreFetchingStore";

const unplayedOnly = () => {
  const [unplayedOnly, setUnplayedOnly] = useScoreFetchingStore(
    useShallow((state) => [state.unplayedOnly, () => {}])
  );

  return (
    <YesNoButton value={unplayedOnly} setValue={setUnplayedOnly}>
      Unplayed only
    </YesNoButton>
  );
};

export default unplayedOnly;
