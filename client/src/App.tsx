import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

import routes from "./routes";
import { UserContext } from "./context/User";
import { Banner } from "./components";
import { RoomContext } from "./context";

const { LOGGED_IN, NOT_LOGGED_IN, COMMON } = routes;

function App() {
  const { user } = useContext(UserContext);
  const { roomCredentials } = useContext(RoomContext);
  return (
    <Router>
      <Banner />
      {!!user ? (
        <Routes>
          {[...LOGGED_IN, ...COMMON].map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
          <Route
            key='redirect'
            path='*'
            element={
              <Navigate
                to={
                  !!roomCredentials?.roomId
                    ? `/room/${roomCredentials.roomId}`
                    : "/"
                }
              />
            }
          />
        </Routes>
      ) : (
        <Routes>
          {[...NOT_LOGGED_IN, ...COMMON].map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
          <Route key='redirect' path='*' element={<Navigate to='/auth' />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
