
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ addStudent }) {

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name.trim() || !studentId.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      studentId: studentId.trim()
    };

    // Save student in App state
    addStudent(newStudent);

    // Clear input fields
    setName("");
    setStudentId("");

    // Navigate to second page
    navigate("/students");
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h1>Student Registration</h1>
        <p>Enter your student information</p>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Student ID</label>

          <input
            type="text"
            placeholder="Enter your student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <button type="submit">
            Register Student
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;
