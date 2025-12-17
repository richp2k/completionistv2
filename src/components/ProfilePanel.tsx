import LoginButton from "./_partials/LoginButton";
import { useUserStore } from "../store/userStore";
import { useProfileId } from "../hooks/useProfileId";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { getUserProfileNode } from "../service/UserService";

const ProfilePanel = () => {
  //TODO fix username here
  const authToken = useUserStore(useShallow((state) => state.authToken));
  const username = useUserStore(useShallow((state) => state.username));
  const userId = useUserStore(useShallow((state) => state.userId));
  const profileId = useProfileId();
  const [profileUsername, setProfileUsername] = useState<string>("");

  useEffect(() => {
    if (userId && profileId && userId !== profileId) {
      try {
        getUserProfileNode(authToken, profileId).then((profile) => {
          setProfileUsername(profile.username);
        });
      } catch {
        setProfileUsername(`userId: ${profileId}`);
      }
    } else if (profileId && !userId) {
      setProfileUsername(`userId: ${profileId}`);
    } else {
      setProfileUsername(username);
    }
  }, [userId, profileId]);

  return (
    <div
      className="container border border-3 rounded-3 border-primary bg-secondary p-2 d-flex flex-column justify-content-center my-2"
      style={{ width: 200 }}
    >
      <img
        className="img-thumbnail"
        src={
          profileId
            ? `https://a.ppy.sh/${profileId}`
            : "https://osu.ppy.sh/images/layout/avatar-guest@2x.png"
        }
        alt="profile pic"
      />
      {profileUsername && (
        <h4>
          <center>{profileUsername}</center>
        </h4>
      )}
      <LoginButton />
    </div>
  );
};

export default ProfilePanel;
