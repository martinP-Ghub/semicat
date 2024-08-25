import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import UserList from "./appMain/Main";

// 페이지 컴포넌트 정의
const Home: React.FC = () => <h2>Home Page</h2>;
const Project: React.FC = () => <h2>About Page</h2>;
// const Contact: React.FC = () => <h2>Contact Page</h2>;

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
            <li>
              <Link to="/project">Project</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
