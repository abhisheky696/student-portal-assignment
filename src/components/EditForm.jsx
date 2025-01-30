import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import db from "./firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        console.log("Fetching student details...");
        const studentRef = doc(db, "student", id);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
          setStudentData(studentSnap.data());
        } else {
          console.log("No such student found!");
          setStudentData(null);
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

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
    enableReinitialize: true,
    initialValues: {
      admissionNo: studentData?.admissionNo || "",
      name: studentData?.name || "",
      rollNo: studentData?.rollNo || "",
      course: studentData?.course || "",
      fatherName: studentData?.fatherName || "",
      dob: studentData?.dob || "",
      gender: studentData?.gender || "",
      category: studentData?.category || "",
      mobile: studentData?.mobile || "",
      email: studentData?.email || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values); // Debugging form values
      try {
        console.log("Updating student details...");
        const studentRef = doc(db, "student", id);
        await updateDoc(studentRef, values);
        console.log("Student details updated in Firestore");

        // Navigate to the student table after update
        navigate("/studentTable");

        // Optional: Show a success message after redirecting (for feedback)
        alert("Student details updated successfully!");
      } catch (error) {
        console.error("Error updating student:", error);
      }
    },
  });

  if (loading) return <p>Loading student details...</p>;
  if (!studentData) return <p>No student found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Student Details</h2>
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
          className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
        >
          Update Details
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

export default EditStudentForm;
