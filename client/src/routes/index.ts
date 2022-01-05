import { FC } from "react";

import { LandingPage, RoomPage, AuthPage } from "./pages";

export type RouteType = {
  path: string;
  Component: FC<any>;
};

const loggedInRoutes: RouteType[] = [
  {
    path: "/",
    Component: LandingPage,
  },
  { path: "/room/:roomId", Component: RoomPage },
];
const notLoggedInRoutes: RouteType[] = [{ path: "/auth", Component: AuthPage }];

const routes = {
  LOGGED_IN: loggedInRoutes,
  NOT_LOGGED_IN: notLoggedInRoutes,
};
export default routes;
