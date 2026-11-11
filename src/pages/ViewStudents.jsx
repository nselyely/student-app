
import React, { useState } from "react";
import { Link } from "react-router-dom";

function ViewStudents({ students }) {

  // State for searching students
  const [search, setSearch] = useState("");

  // Filter registered students
  const filteredStudents = students.filter((student) => {

    return (
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.studentId.toLowerCase().includes(search.toLowerCase())
    );

  });

  return (
    <div className="dashboard">

      <h1>Registered Students</h1>

      <p>View and search student information</p>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name or student ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <h3>Total Students: {students.length}</h3>

      {/* Students table */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>No.</th>
              <th>Full Name</th>
              <th>Student ID</th>
            </tr>
          </thead>

          <tbody>

            {filteredStudents.length > 0 ? (

              filteredStudents.map((student, index) => (

                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.studentId}</td>
                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="3">
                  No students found!
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      <Link to="/" className="back-link">
        Register Another Student
      </Link>

    </div>
  );
}

export default ViewStudents;
