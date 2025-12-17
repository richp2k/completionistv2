import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const LoginButton = () => {
  const userStore = useUserStore();

  const params = {
    client_id: "30207",
    response_type: "code",
    scope: "public",
    redirect_uri: process.env.REACT_APP_RETURN_URL,
  };

  const authUrl = new URL("/oauth/authorize", "https://osu.ppy.sh");
  authUrl.search = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const logout = () => {
    userStore.logoutUser();
  };

  return userStore.authToken !== undefined ? (
    <button
      onClick={logout}
      className="btn btn-primary m-2"
      data-html2canvas-ignore="true"
    >
      Logout
    </button>
  ) : (
    <a
      href={authUrl.toString()}
      className="btn btn-primary m-2"
      data-html2canvas-ignore="true"
    >
      Login
    </a>
  );
};

export default LoginButton;
