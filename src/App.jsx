
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

  const updateStudent = (updatedStudent) => {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  const deleteStudent = (studentId) => {
    setStudents((previousStudents) =>
      previousStudents.filter((student) => student.id !== studentId)
    );
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
          element={
            <ViewStudents
              students={students}
              updateStudent={updateStudent}
              deleteStudent={deleteStudent}
            />
          }
        />

      </Routes>
    </HashRouter>
  );
}

export default App;
