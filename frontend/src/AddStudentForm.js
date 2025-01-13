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
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-black text-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-yellow-500 mb-6">Add New Student</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-white">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={studentData.firstName}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-black text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-white">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={studentData.lastName}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-black text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-white">Email:</label>
              <input
                type="email"
                name="email"
                value={studentData.email}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-black text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-white">Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={studentData.dateOfBirth}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-black text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-white">Personal Number:</label>
              <input
                type="text"
                name="personalNumber"
                value={studentData.personalNumber}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-black text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-white">Parent Contact:</label>
              <input
                type="text"
                name="parentContact"
                value={studentData.parentContact}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-black text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-white">Address:</label>
              <textarea
                name="address"
                value={studentData.address}
                onChange={handleChange}
                required
                className="mt-2 p-2 w-full border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-black text-white"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
      );
    };
    
    export default AddStudentForm;