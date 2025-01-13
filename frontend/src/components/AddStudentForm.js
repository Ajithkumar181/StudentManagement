import React, { useState } from 'react';
import axios from 'axios';

const AddStudentForm = () => {
    const [studentData, setStudentData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        personalNumber: '',
        parentContact: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData({
            ...studentData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/add-student', studentData);
            alert(response.data.message);
            setStudentData({
                firstName: '',
                lastName: '',
                email: '',
                dateOfBirth: '',
                personalNumber: '',
                parentContact: '',
                address: ''
            });
        } catch (error) {
            alert('Error adding student');
            console.error(error);
        }
    };

    return (
      <div className="max-w-lg mx-auto mt-4 p-6 bg-white text-gray-800 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Add New Student</h2>
  <form 
  onSubmit={handleSubmit} 
  className="space-y-4"
  onKeyDown={(e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault(); // Prevent form submission on Enter
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus(); // Move to the next input
    }
  }}
  >
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">First Name:</label>
      <input
        type="text"
        name="firstName"
        value={studentData.firstName}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name:</label>
      <input
        type="text"
        name="lastName"
        value={studentData.lastName}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
      <input
        type="email"
        name="email"
        value={studentData.email}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth:</label>
      <input
        type="date"
        name="dateOfBirth"
        value={studentData.dateOfBirth}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Personal Number:</label>
      <input
        type="text"
        name="personalNumber"
        value={studentData.personalNumber}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Parent Contact:</label>
      <input
        type="text"
        name="parentContact"
        value={studentData.parentContact}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
      <textarea
        name="address"
        value={studentData.address}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="text-center">
      <button
        type="submit"
        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Add Student
      </button>
    </div>
  </form>
</div>

      );
    };
    
    export default AddStudentForm;