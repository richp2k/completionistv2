import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useShallow } from "zustand/react/shallow";
import { isIntNumber } from "../misc/utils";

export const useProfileId = () => {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const { profileId } = useParams();
  const loggedUserId = useUserStore(useShallow((state) => state.userId));

  const getProfileId = () => {
    if (profileId && isIntNumber(profileId)) {
      return parseInt(profileId);
    }

    if (loggedUserId) {
      return loggedUserId;
    }
  };

  //TODO CHECK CHECK CHECK
  const _profileId = getProfileId();
  if (_profileId !== userId) {
    setUserId(_profileId);
  }

  return _profileId;
};
