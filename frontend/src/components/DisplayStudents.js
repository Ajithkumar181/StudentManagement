import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; // Importing xlsx library

function StudentList() {
  const tableRef = useRef();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students data from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/students");
        setStudents(response.data);  // Set students to the response data
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Function to handle printing the table
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write('<html><head><title>Students List</title>');
    
    // Add some CSS styling for the printed page
    printWindow.document.write(`
      <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
        th { background-color: #4CAF50; color: white; }
        td { background-color: #f9f9f9; }
        h1 { text-align: center; }
      </style>
    `);
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Students List</h1>');
    printWindow.document.write('<div>' + tableRef.current.outerHTML + '</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  // Function to export the students data to Excel
  const handleExportExcel = () => {
    // Create the data structure for the Excel file
    const data = students.map((student) => ({
      "StudentID": student.StudentID,
      "First Name": student.FirstName,
      "Last Name": student.LastName,
      "Email": student.Email,
      "Date of Birth": new Date(student.DateOfBirth).toLocaleDateString(),
      "Personal Number": student.PersonalNumber,
      "Parent Contact": student.ParentContact,
      "Address": student.Address // Ensure the full address is stored as one string
    }));

    // Create a worksheet from the data
    const ws = XLSX.utils.json_to_sheet(data); // Convert JSON data to worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Students"); // Append the worksheet to the workbook

    // Trigger file download
    XLSX.writeFile(wb, "students_list.xlsx");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12 bg-gradient-to-r">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">Students List</h1>

      <div className="text-right mb-4">
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-6 py-2 rounded mr-4"
        >
          Print Table
        </button>
        <button
          onClick={handleExportExcel}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-2xl">
        <table ref={tableRef} className="min-w-full table-auto">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-8 py-4 text-left text-lg font-semibold tracking-wider">StudentID</th>
              <th className="px-8 py-4 text-left text-lg font-semibold tracking-wider">First Name</th>
              <th className="px-8 py-4 text-left text-lg font-semibold tracking-wider">Last Name</th>
              <th className="px-8 py-4 text-left text-lg font-semibold tracking-wider">Email</th>
              <th className="px-8 py-4 text-left text-lg font-semibold tracking-wider">Date of Birth</th>
              <th className="px-8 py-4 text-left text-lg font-semibold tracking-wider">Personal Number</th>
              <th className="px-8 py-4 text-left text-lg font-semibold tracking-wider">Parent Contact</th>
              <th className="px-8 py-4 text-left text-lg font-semibold tracking-wider">Address</th>
            </tr>
          </thead>
          <tbody className="text-lg text-gray-700">
            {students.map((student) => (
              <tr key={student.StudentID}>
                <td className="border-t px-8 py-4 text-center">{student.StudentID}</td>
                <td className="border-t px-8 py-4 text-center">{student.FirstName}</td>
                <td className="border-t px-8 py-4 text-center">{student.LastName}</td>
                <td className="border-t px-8 py-4 text-center">{student.Email}</td>
                <td className="border-t px-8 py-4 text-center">
                  {new Date(student.DateOfBirth).getDate()}-
                  {new Date(student.DateOfBirth).getMonth() + 1}-
                  {new Date(student.DateOfBirth).getFullYear()}
                </td>
                <td className="border-t px-8 py-4 text-center">{student.PersonalNumber}</td>
                <td className="border-t px-8 py-4 text-center">{student.ParentContact}</td>
                <td className="border-t px-8 py-4 text-center">{student.Address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
