
import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import ViewStudents from "./pages/ViewStudents";

function App() {
  // Store all registered students
  const [students, setStudents] = useState([]);

  // Add a new student
  const addStudent = (student) => {
    setStudents((previousStudents) => [
      ...previousStudents,
      student
    ]);
  };

  return (
    <HashRouter>
      <Routes>

        <Route
          path="/"
          element={<Register addStudent={addStudent} />}
        />

        <Route
          path="/students"
          element={<ViewStudents students={students} />}
        />

      </Routes>
    </HashRouter>
  );
}

export default App;
