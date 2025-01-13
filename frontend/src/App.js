import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddStudentForm from "./components/AddStudentForm";
import DisplayStudents from "./components/DisplayStudents"; // Corrected component name

// Import the images as icons
import addIcon from "./students.png";  // Change path based on where you store your images

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between">
            {/* Logo or Home Link */}
            <div className="flex items-center">
              {/* Add Student Link with Icon */}
              <Link
                to="/"
                className="mx-2 hover:text-gray-200 flex items-center"
              >
                <img src={addIcon} alt="Add Student" className="w-10 h-10 mr-2" /> {/* Display add icon */}
                Add Student
              </Link>
              <Link
                to="display-st"
                className="mx-2 hover:text-gray-200 flex items-center"
              >
                <img src={addIcon} alt="Display Student" className="w-10 h-10 mr-2" /> {/* Display add icon */}
                Display Students
              </Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto py-10">
          <Routes>
            <Route path="/" element={<AddStudentForm />} />
            <Route path="display-st" element={<DisplayStudents />} /> {/* Corrected component name */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
