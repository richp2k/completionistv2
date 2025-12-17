import { useState } from "react";
import SearchOtherPlayers from "./SearchOtherPlayers";
import { useBeatmapsetsStore } from "../store/beatmapsetsStore";

const CheckOtherPlayer = () => {
  const [showPlayerSearch, setShowPlayerSearch] = useState<boolean>(false);

  return (
    <>
      {showPlayerSearch && (
        <SearchOtherPlayers closeModal={() => setShowPlayerSearch(false)} />
      )}

      <button
        className="btn btn-secondary m-2"
        onClick={() => setShowPlayerSearch((x) => !x)}
      >
        Check other players
      </button>
    </>
  );
};

export default CheckOtherPlayer;
