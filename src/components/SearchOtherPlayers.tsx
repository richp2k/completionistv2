import { useEffect, useRef, useState } from "react";
import { fetchSearchUserNode } from "../service/OsuwebService";
import { getUsersScoresCountNode } from "../service/UserService";
import { useUserStore } from "../store/userStore";
import Modal from "./Modal";
import { redirect, useNavigate } from "react-router-dom";
import CircleXIcon from "./Icons/CircleXIcon";

const SearchOtherPlayers = (props: { closeModal: Function }) => {
  const navigate = useNavigate();
  //TODO this may be used in other components (should be in _common), and as such we shouldnt really use UserStore here?
  const userStore = useUserStore();
  const [username, setUsername] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const listenerRef = useRef(null);

  const searchUsers = async (username) => {
    let result = await fetchSearchUserNode(
      userStore.authToken.access_token,
      username
    );
    if (result && result[0]) {
      const usersScoreCount = await getUsersScoresCountNode(
        (result as any).map((x) => x.id)
      );
      result = (result as any).map((x) => {
        const scoreCount = usersScoreCount?.find(
          (y) => y.user_id === x.id
        )?.count;
        return { ...x, scoreCount: scoreCount ?? 0 };
      });
      setSearchResult(result);
    }
  };

  const selectUser = (userId) => {
    navigate(`/user/${userId}`);
    props.closeModal();
  };

  useEffect(() => {
    listenerRef.current = window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        props.closeModal();
      }
    });

    return () => {
      window.removeEventListener("keydown", listenerRef.current);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchUsers(username);
    }
  };

  return (
    <Modal>
      <div
        className="bg-dark"
        style={{ borderRadius: 10, padding: 20, color: "black" }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <h3>Check others:</h3>
          <button onClick={() => props.closeModal()} className="btn btn-dark">
            <CircleXIcon width={24} height={24} />
          </button>
        </div>
        <div
          style={{
            // display: "flex",
            // flex: 1,
            width: "min-content",
            marginBottom: 20,
            marginLeft: "auto",
          }}
        ></div>
        <div className="d-flex justify-content-center">
          <input
            autoFocus
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: "auto", color: "black" }}
          />
          <button
            className="btn btn-primary mx-2"
            onClick={() => searchUsers(username)}
          >
            Search
          </button>
        </div>
        <div className="flex">
          {searchResult?.map((x) => (
            <div
              className="bg-secondary card"
              style={{
                width: 500,
                margin: "auto",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={x.avatar_url}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body" style={{ height: "100%" }}>
                    <h5 className="card-title">{x.username}</h5>
                    <p className="card-text">
                      Scores in completionist database: {x.scoreCount}
                    </p>
                    <button
                      className="btn btn-primary"
                      style={{
                        display: "block",
                        marginLeft: "auto",
                        marginTop: "auto",
                      }}
                      onClick={() => selectUser(x.id)}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
export default SearchOtherPlayers;
