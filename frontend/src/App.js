import React from 'react';
import AddStudentForm from './AddStudentForm';

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-4xl p-6 bg-black text-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-center text-yellow-500 mb-8">Student Management</h1>
        <AddStudentForm />
      </div>
    </div>
  );
}

export default App;