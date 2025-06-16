import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePoll from "./components/CreatePoll.jsx";
import PollPage from "./components/PollPage.jsx";
import ResultPage from "./components/ResultPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatePoll />} />
        <Route path="/poll/:id" element={<PollPage />} />
        <Route path="/results/:id" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
