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

const { LOGGED_IN, NOT_LOGGED_IN } = routes;

function App() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <Banner />
      {!!user ? (
        <Routes>
          {LOGGED_IN.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
          <Route key='redirect' path='*' element={<Navigate to='/' />} />
        </Routes>
      ) : (
        <Routes>
          {NOT_LOGGED_IN.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
          <Route key='redirect' path='*' element={<Navigate to='/auth' />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
