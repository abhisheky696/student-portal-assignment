import { useFormik } from "formik";
import * as Yup from "yup";
import db from "./firestore";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
const StudentForm = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    admissionNo: Yup.string().required("Admission No. is required"),
    name: Yup.string()
      .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
      .required("Name is required"),
    rollNo: Yup.string().required("Roll No. is required"),
    course: Yup.string().required("Course is required"),
    fatherName: Yup.string()
      .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
      .required("Father's Name is required"),
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    category: Yup.string().required("Category is required"),
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
      .required("Mobile Number is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      admissionNo: "",
      name: "",
      rollNo: "",
      course: "",
      fatherName: "",
      dob: "",
      gender: "",
      category: "",
      mobile: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const docRef = await addDoc(collection(db, "student"), {
          admissionNo: values.admissionNo,
          name: values.name,
          rollNo: values.rollNo,
          course: values.course,
          fatherName: values.fatherName,
          dob: values.dob,
          gender: values.gender,
          category: values.category,
          mobile: values.mobile,
          email: values.email,
        });
        console.log("Document written with ID: ", docRef.id);
      
        navigate("/studentTable"); 
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("Error submitting form!");
      }
    },
  });
    
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Student Details Form</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <InputField label="Admission No." name="admissionNo" formik={formik} />
        
        <InputField label="Name" name="name" formik={formik} />

        <InputField label="Roll No." name="rollNo" formik={formik} />

        <InputField label="Course" name="course" formik={formik} />

        <InputField label="Father's Name" name="fatherName" formik={formik} />

        <InputField label="Date of Birth" name="dob" formik={formik} type="date" />

        <SelectField label="Gender" name="gender" options={["Male", "Female", "Other"]} formik={formik} />

        <SelectField label="Category" name="category" options={["General", "OBC", "SC", "ST"]} formik={formik} />

        <InputField label="Mobile Number" name="mobile" formik={formik} type="tel" />

        <InputField label="Email ID" name="email" formik={formik} type="email" />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
const InputField = ({ label, name, formik, type = "text" }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <input
      type={type}
      name={name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      className="w-full p-2 border border-gray-300 rounded-lg"
    />
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-500 text-sm">{formik.errors[name]}</p>
    )}
  </div>
);

const SelectField = ({ label, name, options, formik }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <select
      name={name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      className="w-full p-2 border border-gray-300 rounded-lg"
    >
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-500 text-sm">{formik.errors[name]}</p>
    )}
  </div>
);

export default StudentForm;
