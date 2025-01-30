import React, { useState, useEffect } from "react";
import db from "./firestore";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

export const StudentTable = () => {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "student"));
        const students = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudentData(students);
        console.log(students)
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const deleteStudent = async (studentId) => {
    try {
      const studentDoc = doc(db, "student", studentId);
      await deleteDoc(studentDoc);
      setStudentData((prevData) => prevData.filter((student) => student.id !== studentId));
      alert("Student deleted successfully.");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Error deleting student.");
    }
  };

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Student List</h2>
      <table className="min-w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Admission No.</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Roll No.</th>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Father's Name</th>
            <th className="border px-4 py-2">DOB</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Mobile Number</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.admissionNo || "N/A"}</td>
              <td className="border px-4 py-2">{student.name || "N/A"}</td>
              <td className="border px-4 py-2">{student.rollNo || "N/A"}</td>
              <td className="border px-4 py-2">{student.course || "N/A"}</td>
              <td className="border px-4 py-2">{student.fatherName || "N/A"}</td>
              <td className="border px-4 py-2">{student.dob || "N/A"}</td>
              <td className="border px-4 py-2">{student.gender || "N/A"}</td>
              <td className="border px-4 py-2">{student.category || "N/A"}</td>
              <td className="border px-4 py-2">{student.mobile || "N/A"}</td>
              <td className="border px-4 py-2">{student.email || "N/A"}</td>
              <td className="border px-4 py-2">
                <Link to={`/updateStudent/${student.id}`}>
                  <CiEdit className="inline cursor-pointer" />
                </Link>
                <MdDelete
                  className="inline ml-4 cursor-pointer"
                  onClick={() => deleteStudent(student.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
