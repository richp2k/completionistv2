import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUserStore } from "./store/userStore";

const RootLayout = () => {
  useEffect(() => {
    useUserStore.getState().tryLoginAsync();
  }, []);

  return <Outlet />;
};

export default RootLayout;
