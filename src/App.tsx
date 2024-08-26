import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import UserList from "./appmain/User";
import ProjectList from "./appmain/Project";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <div className="nav">
          <img
            src="https://test.semicat.com/wp-content/uploads/2021/08/logo-dk-2.png"
            alt=""
            width={150}
          />
          <nav>
            <ul>
              <li>
                <Link to="/user">User</Link>
              </li>
              <li>
                <Link to="/project">Project</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/user" element={<UserList />} />
          <Route path="/project" element={<ProjectList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
