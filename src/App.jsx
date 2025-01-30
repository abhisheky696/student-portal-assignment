import React from "react";
import Signup from "./components/Signup";
import Header from "./components/Header";
import  {StudentTable}  from "./components/StudentTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import StudentForm from "./components/StudentForm";
import EditStudentForm from "./components/EditForm";
import { useParams } from "react-router-dom";

export const App = () => {
    const {id}=useParams();
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signUp" element={<Signup />} />
                <Route path="/updateStudent/:id" element={<EditStudentForm/>} />
                <Route path="/deleteStudent/:id" element={<EditStudentForm/>} />
                <Route path="/addStudent" element={<StudentForm/>} />
                <Route path="/studentTable" element={<StudentTable />} />
            </Routes>
        </Router>
    );
};

export default App;
