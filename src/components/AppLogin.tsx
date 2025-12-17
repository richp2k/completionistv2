import { useEffect, useState } from "react";
import { fetchAuth } from "../service/OsuwebService";
import { useSearchParams } from "react-router-dom";

const AppLoginLanding = () => {
  let [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    client_id: { encodeValue: true, value: "30207" },
    response_type: { encodeValue: true, value: "code" },
    scope: { encodeValue: true, value: "public" },
    //this wouldnt work
    // redirect_uri: {
    //   encodeValue: false,
    //   value: `${process.env.REACT_APP_RETURN_URL}#/apploginlanding`,
    // },
  };

  const authUrlBase = new URL("/oauth/authorize", "https://osu.ppy.sh");
  authUrlBase.search = Object.entries(params)
    .map(([key, options]) => {
      if (options.encodeValue) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          options.value
        )}`;
      } else {
        return `${encodeURIComponent(key)}=${options.value}`;
      }
    })
    .join("&");

  //this is wild sheneningas, but needed - there is a problem if redirectUri is encoded anyhow (be it just appending to search, or appending it with encodeUriComponent)
  const authUrl = `${authUrlBase.toString()}&redirect_uri=${
    process.env.REACT_APP_RETURN_URL
  }#/apploginlanding`;
  // console.log(authUrl);

  const fetchAuthToken = async (code: string) => {
    const auth = await fetchAuth(code);
    // console.log("auth", auth);
    if (auth && auth.access_token) {
      const authString = JSON.stringify(auth);
      // console.log("authstring", encodeURIComponent(authString));
      const returnUrl = `ccol://auth=${encodeURIComponent(authString)}`;
      // console.log("dupa", returnUrl);
      window.open(returnUrl, "_self");
      setLoggedIn(true);
      //send to app and close yourself
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    //would be useful if hash is in front of the url
    // const code = searchParams.get("code");
    const code = url.searchParams.get("code");
    // console.log("code", code);
    if (code) {
      fetchAuthToken(code);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const retryLogin = () => {
    window.open(authUrl, "_self");
  };

  return (
    <div className="container-fluid bg-dark App">
      <h1 style={{ color: "white", textAlign: "center" }}>
        {loggedIn === true
          ? `You can now close this site`
          : loggedIn !== null && `Failed authorize at osu api...`}
        {loggedIn === false && (
          <button
            onClick={retryLogin}
            className="btn btn-danger"
            style={{ display: "block", margin: "auto" }}
          >
            Retry
          </button>
        )}
      </h1>
    </div>
  );
};

export default AppLoginLanding;
