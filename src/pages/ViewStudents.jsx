
import React, { useState } from "react";
import { Link } from "react-router-dom";

function ViewStudents({ students, updateStudent, deleteStudent }) {

  // State for searching students
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ name: "", studentId: "" });

  const startEditing = (student) => {
    setEditingId(student.id);
    setDraft({ name: student.name, studentId: student.studentId });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setDraft({ name: "", studentId: "" });
  };

  const saveEditing = (studentId) => {
    if (!draft.name.trim() || !draft.studentId.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    updateStudent({
      id: studentId,
      name: draft.name.trim(),
      studentId: draft.studentId.trim()
    });
    cancelEditing();
  };

  const handleDelete = (student) => {
    if (window.confirm(`Delete ${student.name}?`)) {
      deleteStudent(student.id);
      if (editingId === student.id) {
        cancelEditing();
      }
    }
  };

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
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredStudents.length > 0 ? (

              filteredStudents.map((student, index) => (

                <tr key={student.id}>
                  <td>{index + 1}</td>
                  {editingId === student.id ? (
                    <>
                      <td>
                        <input
                          className="table-input"
                          value={draft.name}
                          onChange={(e) =>
                            setDraft((previous) => ({
                              ...previous,
                              name: e.target.value
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="table-input"
                          value={draft.studentId}
                          onChange={(e) =>
                            setDraft((previous) => ({
                              ...previous,
                              studentId: e.target.value
                            }))
                          }
                        />
                      </td>
                      <td className="actions">
                        <button
                          type="button"
                          className="action-button save-button"
                          onClick={() => saveEditing(student.id)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="action-button cancel-button"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{student.name}</td>
                      <td>{student.studentId}</td>
                      <td className="actions">
                        <button
                          type="button"
                          className="action-button edit-button"
                          onClick={() => startEditing(student)}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="action-button delete-button"
                          onClick={() => handleDelete(student)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="4">
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
