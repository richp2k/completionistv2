import { create } from "zustand";
import { IAuthToken } from "../interfaces/IAuthToken";
import { fetchAuth } from "../service/OsuwebService";
import { fetchUserMe } from "../service/UserService";
import { IUserInfo } from "../interfaces/IUserInfo";

type UserStore = {
  authToken: IAuthToken | undefined;
  isLoggedIn: boolean;
  userId: number | undefined;
  //TODO do not connect it to the store. instead create a hook called useProfileId() or something like that
  // profileId: number | undefined;
  username: string | undefined;
  playmode: string | undefined;
  tryLoginAsync: () => void;
  fetchUser: (authToken: IAuthToken) => void;
  logoutUser: () => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  authToken: undefined,
  isLoggedIn: false,
  userId: undefined,
  username: undefined,
  playmode: undefined,
  tryLoginAsync: async () => {
    const loginResult = await tryLoginAsync();
    if (loginResult) {
      const [authToken, userInfo] = loginResult;
      set((state) => ({
        authToken: authToken,
        isLoggedIn: true,
        userId: userInfo.userId,
        username: userInfo.username,
        playmode: userInfo.playmode,
      }));
    } else {
      // alert("cant authorise!");
      get().logoutUser();
    }
  },
  fetchUser: () => {},
  logoutUser: () => {
    localStorage.removeItem("authToken");
    set((state) => ({
      authToken: undefined,
      isLoggedIn: false,
      userId: undefined,
      username: undefined,
      playmode: undefined,
    }));
  },
}));

const tryGetUserInfo = async (
  authToken: IAuthToken
): Promise<IUserInfo | undefined> => {
  try {
    const userMe = await fetchUserMe(authToken);
    return userMe;
  } catch {}

  //   if (userMe) {
  //     localStorage.setItem("authToken", JSON.stringify(authToken));
  //     return userMe;
  //     // _setContextValue({
  //     //   authToken: _authToken,
  //     //   userId: userMe.userId,
  //     //   username: userMe.username,
  //     //   playmode: userMe.playmode,
  //     //   setContextValue: setContextValue,
  //     // });
  //   }
};

const fetchAuthToken = async (
  code: string
): Promise<IAuthToken | undefined> => {
  const authToken = await fetchAuth(code);
  if (authToken) {
    return authToken;
  }
};

const getAuthTokenFromUrl = async (): Promise<IAuthToken | undefined> => {
  const currentHref = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentHref.search);
  if (searchParams.has("code")) {
    const authCode = searchParams.get("code") as string;
    const authToken = await fetchAuthToken(authCode);

    searchParams.delete("code");
    currentHref.search = searchParams.toString();
    window.history.replaceState(null, "", currentHref);
    return authToken;
  }
};

const tryLoginAsync = async (): Promise<
  [IAuthToken, IUserInfo] | undefined
> => {
  //TODO: this method of checking is kinda cringe as its literally copy-paste from getAuthTokenFromUrl...
  const currentHref = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentHref.search);
  let isAuthCodePresent = searchParams.has("code");
  const urlAuthToken = await getAuthTokenFromUrl();
  // console.log("urlAuthToken", urlAuthToken);
  if (urlAuthToken) {
    const userInfo = await tryGetUserInfo(urlAuthToken);
    if (userInfo) {
      localStorage.setItem("authToken", JSON.stringify(urlAuthToken));
      return [urlAuthToken, userInfo];
    }
  }

  const localStorageAuthToken = localStorage.getItem("authToken");
  if (localStorageAuthToken) {
    const localAuthToken = JSON.parse(localStorageAuthToken);
    if (localAuthToken && localAuthToken.access_token) {
      const userInfo = await tryGetUserInfo(localAuthToken);
      if (userInfo) {
        return [localAuthToken, userInfo];
      }
    }
  }

  if (isAuthCodePresent) {
    alert("cant authorize!");
  }
  return undefined;
};
