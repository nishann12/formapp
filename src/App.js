import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css"; 

const App = () => {
  const [students, setStudents] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    setStudents ([...students,data]);
    reset();
    handleCloseModal();
  };
  const [isModalOpen, setIsModalOpen] = useState (false);
  const handleOpenModal = () => setIsModalOpen (true);
  const handleCloseModal = () => setIsModalOpen (false);
  return (
    <div className="app">
      <div className="student-list-card">
        <h2>Student-list</h2>
        <button className="btn btn-success" onClick={handleOpenModal}>Add Student</button>
        <h3>List of Students</h3>
        {students.length === 0 ?(
        <p>No Students added yet.</p>
        ):
        <ul className="list-group mt-3">
          {students.map((student,index)=>(
            <li key={index} className="list-group-item">
              {student.name} - Age : {student.age} class: {student.class}
           </li> 
          ))}
        </ul>
        }
      </div>
      {isModalOpen && (
       <div className="modal show d-block" >
       <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Student</h5>
            <button
                type="button"className="btn-close"
                aria-label="Close"
                onClick={handleCloseModal}
          ></button>
            </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
  <label className="form-label">Name</label>
  <input
    {...register("name", {
      required: "Name is required",
      pattern: {
        value: /^[A-Za-z]+$/,
        message: "Name must contain only letters",
      },
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters long",
      },
      maxLength: {
        value: 20,
        message: "Name must not exceed 20 characters",
      },
    })}
    type="text"
    className="form-control"
  />
  {errors.name && (
    <div className="text-danger">{errors.name.message}</div>
  )}
</div>


<div className="mb-3">
  <label className="form-label">Age</label>
  <input
    {...register("age", {
      required: "Age is required",
      pattern: {
        value: /^\d{1,3}$/, 
        message: "Age must be a valid number with up to 3 digits",
      },
      validate: (value) =>
        value >= 0 && value <= 999 || "Age must be between 0 and 999",
    })}
    type="number"
    className="form-control"
  />
  {errors.age && (
    <div className="text-danger">{errors.age.message}</div>
  )}
</div>


                  <div className="mb-3">
                   < label className="form-label">Class</label>
                  <input
                     {...register("class", { required: "Class is required" })}
                     type="text"
                     className="form-control"
                    />
                    {errors.class && (
                   <div className="text-danger">{errors.class.message}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Student
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


  export default App;